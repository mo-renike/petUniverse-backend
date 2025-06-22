
import cron from 'node-cron';
import { sendReminders } from '../services/reminderService.js';

cron.schedule("* * * * *", async () => {
  console.log("Checking for due notifications...");
  try {
    await sendReminders();
  } catch (error) {
    console.error("Error sending reminders:", error);
  }
});

