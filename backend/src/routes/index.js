import express from 'express';
import studentRouter from './students.js';
import userRouter from './users.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/students', studentRouter);

export default router;
