import express from "express";
import { createVetProfile, getAllVets, getVetById, updateVetProfile } from "../controllers/vetControllers.js";
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/', createVetProfile);
router.get('/', getAllVets);
router.get('/:id', getVetById);
router.put('/:id', updateVetProfile);

export default router;