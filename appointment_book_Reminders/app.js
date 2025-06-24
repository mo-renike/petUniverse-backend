import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "./cron/schedulers.js";
import appointmentRoute from "./routes/bookAppointment.route.js"
import appointmentResponseRoute from "./routes/appointmentResponse.route.js"
import changeAvailabilityRoute from "./routes/doctorChangeAvailabity.route.js"
import allAvailableDoctorsRoute from './routes/listOfAvailableDoctors.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
app.use('/api/book', appointmentRoute);
app.use('/api/appointments', appointmentResponseRoute);
app.use("/api/doctors", changeAvailabilityRoute);
app.use("/api/all/doctors", allAvailableDoctorsRoute);


export  default app;