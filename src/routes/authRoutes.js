import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);

export default router;

//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"