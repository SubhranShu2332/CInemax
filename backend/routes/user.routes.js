import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

// Define the proper route and handler
router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
