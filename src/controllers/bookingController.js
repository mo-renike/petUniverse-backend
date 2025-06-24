import { prisma } from "../utils/prisma.js";

export const createAppointment = async (req, res) => {
  const { vetId, details, scheduledAt } = req.body;
  const userId = req.user.id;

  if (!scheduledAt || !details || !vetId) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const scheduledDate = new Date(scheduledAt);
  scheduledDate.setUTCHours(0, 0, 0, 0);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (scheduledDate < today) {
    return res
      .status(400)
      .json({ message: "Cannot book an appointment in the past" });
  }

  try {
    // Only allow pet owners or vets to create bookings for themselves
    if (
      req.user.role !== "ADMIN" &&
      req.user.role !== "PET_OWNER" &&
      req.user.role !== "VET"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const existingActiveAppointment = await prisma.appointment.findFirst({
      where: {
        userId,
        vetId,
        status: {
          notIn: ["COMPLETED", "CANCELLED"],
        },
      },
    });

    if (existingActiveAppointment) {
      return res.status(400).json({
        message: "You already have an active appointment with this vet",
        existingAppointment: existingActiveAppointment,
      });
    }

    const vet = await prisma.user.findUnique({
      where: {
        id: vetId,
        role: "VET",
      },
      select: {
        maxDailyAppointments: true,
      },
    });

    if (!vet) {
      return res.status(404).json({ message: "Vet not found" });
    }

    const appointmentCount = await prisma.appointment.count({
      where: {
        vetId,
        scheduledAt: {
          gte: scheduledDate,
          lt: new Date(scheduledDate.getTime() + 24 * 60 * 60 * 1000),
        },
        status: {
          not: "CANCELLED",
        },
      },
    });

    const maxAppointments = vet.maxDailyAppointments ?? 5;
    if (appointmentCount >= maxAppointments) {
      return res.status(400).json({
        message:
          "This vet has reached their maximum appointments for the selected date",
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        vetId,
        userId,
        details,
        status: "PENDING",
        scheduledAt: scheduledDate,
      },
      include: {
        vet: { select: { firstName: true, lastName: true } },
        user: { select: { firstName: true, lastName: true } },
      },
    });

    return res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateVetMaxAppointments = async (req, res) => {
  const vetId = req.user.id;
  const { maxDailyAppointments } = req.body;

  try {
    if (req.user.role !== "ADMIN" && req.user.id !== vetId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedVet = await prisma.user.update({
      where: {
        id: vetId,
        role: "VET",
      },
      data: {
        maxDailyAppointments,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        maxDailyAppointments: true,
      },
    });

    return res.json({
      message: "Max appointments updated successfully",
      vet: updatedVet,
    });
  } catch (error) {
    console.error("Error updating max appointments:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getVetMaxAppointments = async (req, res) => {
  const vetId = req.user.id;
  const { maxDailyAppointments } = req.body;

  try {
    if (req.user.role !== "ADMIN" && req.user.id !== vetId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const vetAppointment = await prisma.user.findFirst({
      where: {
        id: vetId,
        role: "VET",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        maxDailyAppointments: true,
      },
    });

    return res.json({
      message: `Max appointments for VET ${vetAppointment.firstName} ${vetAppointment.lastName}`,

      vet: vetAppointment,
    });
  } catch (error) {
    console.error("Error updating max appointments:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { id: appointmentId } = req.params;

  const { status } = req.body;
  const vetId = req.user.id;

  if (!appointmentId) {
    return res.status(400).json({ message: "Appointment ID is required" });
  }

  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      select: { vetId: true },
    });

    if (!appointment || appointment.vetId !== vetId) {
      return res
        .status(404)
        .json({ message: "Appointment not found or unauthorized" });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return res.json({
      message: "Appointment status updated",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getVetAppointments = async (req, res) => {
  const vetId = req.user.id;
  const { status } = req.query;

  try {
    const appointments = await prisma.appointment.findMany({
      where: { vetId, status },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json({ appointments });
  } catch (error) {
    console.error("Error fetching vet appointments:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all bookings (admin: all, user: own, vet: own)
export const getAllBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.role === "ADMIN") {
      bookings = await prisma.appointment.findMany();
    } else if (req.user.role === "VET") {
      bookings = await prisma.appointment.findMany({ where: { vetId: req.user.id } });
    } else {
      bookings = await prisma.appointment.findMany({ where: { userId: req.user.id } });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

// Get booking by ID (admin: any, vet: own, user: own)
export const getBookingById = async (req, res) => {
  try {
    const booking = await prisma.appointment.findUnique({ where: { id: req.params.id } });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (
      req.user.role !== "ADMIN" &&
      booking.userId !== req.user.id &&
      booking.vetId !== req.user.id
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch booking" });
  }
};

// Update booking (admin: any, vet: own, user: own)
export const updateBooking = async (req, res) => {
  try {
    const booking = await prisma.appointment.findUnique({ where: { id: req.params.id } });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (
      req.user.role !== "ADMIN" &&
      booking.userId !== req.user.id &&
      booking.vetId !== req.user.id
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const updated = await prisma.appointment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ message: "Booking updated", booking: updated });
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
};

// Delete booking (admin: any, vet: own, user: own)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await prisma.appointment.findUnique({ where: { id: req.params.id } });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    if (
      req.user.role !== "ADMIN" &&
      booking.userId !== req.user.id &&
      booking.vetId !== req.user.id
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await prisma.appointment.delete({ where: { id: req.params.id } });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
