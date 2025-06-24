// sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Reusable delay utility (default: 2 mins)
export async function delay(ms = 2 * 60 * 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Email sending function
export async function sendMail({ to, subject, text }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.response}`);

    // Delay after each successful email
    await delay(); // 2 minutes by default

    return info;
  } catch (error) {
    console.error(`❌ Error sending email to ${to}:`, error.message);
    throw error;
  }
}
