import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoute.js";

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to PetUniverse Connect API");
});

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Server startup
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
