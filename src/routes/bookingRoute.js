import express from "express";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";
import {
  createAppointment,
  updateVetMaxAppointments,
  updateAppointmentStatus,
  getVetAppointments,
} from "../controllers/bookingController.js";

const router = express.Router();

router
  .route("/")
  .post(authenticateToken, authorizeRoles("VET"), createAppointment)
  .get(authenticateToken, authorizeRoles("VET"), getVetAppointments);

router
  .route("/:id/status")
  .patch(authenticateToken, authorizeRoles("VET"), updateAppointmentStatus);

router
  .route("/max-appointment")
  .patch(authenticateToken, authorizeRoles("VET"), updateVetMaxAppointments);
export default router;
