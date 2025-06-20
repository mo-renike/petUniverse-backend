<<<<<<< HEAD
=======

>>>>>>> 112aa9b8a92afc88f32c2791cc482271341c778d

import postRoutes from './src/routes/postRoutes.js'
import commentRoutes from './src/routes/commentRoutes.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoute.js";
<<<<<<< HEAD
import vetRoutes from './src/routes/vetRoutes.js'
=======
>>>>>>> 112aa9b8a92afc88f32c2791cc482271341c778d

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


// Routes for vets
app.use('/api/vets', vetRoutes)

//Routes for community forum
app.use('/api/posts', postRoutes );
app.use('/api/comments', commentRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to PetUniverse Connect API");
});

app.use("/api/bookings", bookingRoutes);




app.use('/pets', petRoutes);




app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
