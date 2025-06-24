
import { Doctor } from "../models/u.index.js";

export default async function changeAvailability(req, res) {
  try {
    const { isAvailable } = req.body;
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // if (!doctor.isAvailable) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Doctor hhhhhis not available" });
    // }

    doctor.isAvailable = isAvailable;
    await doctor.save();

    res.json({ message: "Availability Updated", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
      