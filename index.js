import postRoutes from './src/routes/postRoutes.js'
import commentRoutes from './src/routes/commentRoutes.js'
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoute.js";
import vetRoutes from './src/routes/vetRoutes.js'
import petRoutes from './src/routes/petRoutes.js'
import userRoutes from './src/routes/userRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);


// Routes for vets
app.use('/api/vets', vetRoutes)

//Routes for community forum     app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes)
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);

app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to PetUniverse Connect API");
});

app.use("/api/bookings", bookingRoutes);



app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
