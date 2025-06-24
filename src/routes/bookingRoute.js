import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  createAppointment,
  updateVetMaxAppointments,
  updateAppointmentStatus,
  getVetAppointments,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createAppointment);
router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

router.route("/max-appointment").patch(updateVetMaxAppointments);
router.route("/:id/status").patch(updateAppointmentStatus);
router.route("/vets").get(getVetAppointments);

export default router;
