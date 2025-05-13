import express from 'express';
import userRoutes from './userRoutes.js';
import ticketRoutes from './ticketRoute.js';
const router = express.Router();

// Main route
router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);

export default router;
