import { Appointment, Notification, Doctor } from "../models/u.index.js";

export default async function appointmentResponse(req, res) {
  try {
    const { decision, doctorId } = req.body;

    const appointment = await Appointment.findByPk(req.params.id, {
      include: [{ model: Doctor }],
    });

    if (!appointment || !appointment.Doctor) {
      return res
        .status(404)
        .json({ message: "Appointment or doctor not found." });
    }

    if (!doctorId || appointment.doctorId !== doctorId) {
      return res.status(403).json({ message: "Unauthorized or forbidden." });
    }

    const doctorName = `Dr. ${appointment.Doctor.firstName}`;

    // Prevent duplicate accept/reject
    if (appointment.status === "confirmed" && decision === "accept") {
      return res
        .status(400)
        .json({ message: "Appointment already confirmed." });
    }
    if (appointment.status === "rejected" && decision === "reject") {
      return res.status(400).json({ message: "Appointment already rejected." });
    }

    // Handle decision
    let immediateMsg;
    if (decision === "reject") {
      appointment.status = "rejected";
      immediateMsg = `${doctorName} has rejected your appointment.`;
    } else if (decision === "accept") {
      appointment.status = "confirmed";
      immediateMsg = `${doctorName} has confirmed your appointment.`;
    } else {
      return res.status(400).json({ message: "Invalid decision value." });
    }

    await appointment.save();

    // Check for existing immediate notification
    const immediateNotificationExists = await Notification.findOne({
      where: {
        petOwnerId: appointment.petOwnerId,
        appointmentId: appointment.id,
        message: immediateMsg,
      },
    });

    if (!immediateNotificationExists) {
      await Notification.create({
        petOwnerId: appointment.petOwnerId,
        doctorId: appointment.doctorId, 
        appointmentId: appointment.id,
        message: immediateMsg,
        scheduledTime: new Date(),
        sent: false,
      });
    }

    // Schedule reminders if accepted
    if (decision === "accept") {
      const scheduledTime = new Date(appointment.scheduledTime);
      const reminders = [
        {
          offset: -10 * 60 * 1000,
          message: "Reminder: Your appointment is in 10 minutes.",
        },
        {
          offset: -5 * 60 * 1000,
          message: "Reminder: Your appointment is in 5 minutes.",
        },
      ];

      for (const reminder of reminders) {
        const reminderTime = new Date(
          scheduledTime.getTime() + reminder.offset
        );

        if (reminderTime > new Date()) {
          const exists = await Notification.findOne({
            where: {
              petOwnerId: appointment.petOwnerId,
              appointmentId: appointment.id,
              message: reminder.message,
              scheduledTime: reminderTime,
            },
          });

          if (!exists) {
            await Notification.create({
              petOwnerId: appointment.petOwnerId,
              doctorId: appointment.doctorId, 
              appointmentId: appointment.id,
              message: reminder.message,
              scheduledTime: reminderTime,
              sent: false,
            });
          }
        }
      }
    }

    return res.json({
      message: `${doctorName} has ${
        decision === "accept" ? "confirmed" : "rejected"
      } your appointment. Notifications scheduled accordingly.`,
    });
  } catch (error) {
    console.error("Responding to appointment failed:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
}
