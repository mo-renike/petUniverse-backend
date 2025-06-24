import { Doctor } from "../models/u.index.js";

export default async function allAvailableDoctors(req, res) {
  try {
    const doctors = await Doctor.findAll();

    const availableDoctors = doctors.filter(
      (doctor) => doctor.isAvailable === true
    );

    res.status(200).json(availableDoctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching doctors." });
  }
}
