import { Doctor, Appointment, PetOwner } from "../models/u.index.js";
import { Op } from "sequelize";

export default async function bookAppointment(req, res) {
  try {
    const { petOwnerId, doctorId, scheduledTime } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if pet owner exists
    const petOwner = await PetOwner.findByPk(petOwnerId);
    if (!petOwner) {
      return res.status(404).json({ message: "Pet owner not found" });
    }

    // Enforce one appointment per doctor per day per pet owner
    const appointmentDate = new Date(scheduledTime);
    appointmentDate.setHours(0, 0, 0, 0); // Start of day
    const nextDay = new Date(appointmentDate);
    nextDay.setDate(appointmentDate.getDate() + 1); // Start of next day

    const existingAppointment = await Appointment.findOne({
      where: {
        petOwnerId,
        doctorId,
        scheduledTime: {
          [Op.gte]: appointmentDate,
          [Op.lt]: nextDay,
        },
      },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "You already have an appointment with this doctor for the selected day.",
      });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      petOwnerId,
      doctorId,
      scheduledTime,
      status: "pending",
    });

    res.json(appointment);
  } catch (error) {
    console.error("Appointment creation failed:", error);
    res
      .status(500)
      .json({ error: "Appointment creation failed", details: error.message });
  }
}
