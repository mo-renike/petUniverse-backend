import express from "express";
import { createVetProfile, getAllVets, getVetById, } from "../controllers/vetControllers.js";


const router = express.Router();

router.post('/', createVetProfile);
router.get('/', getAllVets);
router.get('/:id', getVetById);

export default router;