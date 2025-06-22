import { Notification, PetOwner, Doctor } from "../models/u.index.js";
import { Op } from "sequelize";
import { sendMail } from "../senders/sendEmail.js";

export async function sendReminders() {
  const now = new Date();

  const notifications = await Notification.findAll({
    where: {
      sent: false,
      scheduledTime: { [Op.lte]: now },
    },
    include: [{ model: Doctor }, { model: PetOwner }],
  });


  for (const note of notifications) {
    const { Doctor: doctor, PetOwner: petOwner, message } = note;

    let doctorSuccess = false;
    let ownerSuccess = false;


    // Send to doctor
    if (doctor?.email) {
      const doctorMsg = `Hi Dr. ${doctor.firstName},\n\n${message}`;
      try {
        await sendMail({
          to: doctor.email,
          subject: `Appointment Reminder with ${
            petOwner?.firstName || "a Pet Owner"
          }`,
          text: doctorMsg,
        });
        console.log(`✅ Reminder sent to Doctor: ${doctor.email}`);
        doctorSuccess = true;
      } catch (err) {
        console.error(
          `❌ Failed to send to Doctor ${doctor.email}:`,
          err.message
        );
      }
    }


    // Send to pet owner.
    if (petOwner?.email) {
      const ownerMsg = `Hi ${petOwner.firstName},\n\n${message}`;
      try {
        await sendMail({
          to: petOwner.email,
          subject: `Appointment Reminder with Dr. ${
            doctor?.firstName || "your doctor"
          }`,
          text: ownerMsg,
        });
        console.log(`✅ Reminder sent to PetOwner: ${petOwner.email}`);
        ownerSuccess = true;
      } catch (err) {
        console.error(
          `❌ Failed to send to PetOwner ${petOwner.email}:`,
          err.message
        );
      }
    }




    // Mark as sent if all required sends succeed
    const shouldMarkAsSent =
      (!doctor?.email || doctorSuccess) && (!petOwner?.email || ownerSuccess);

    if (shouldMarkAsSent) {
      note.sent = true;
      await note.save();
      console.log(`🔒 Notification ${note.id} marked as sent.`);
    } else {
      console.log(`⏳ Notification ${note.id} will be retried later.`);
    }
  }
}
