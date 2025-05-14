import express from 'express';
import studentRouter from './students.js';
import userRouter from './users.js';
import authRouter from './authentication.js';

const router = express.Router();

router.use('/', authRouter);
router.use('/users', userRouter);
router.use('/students', studentRouter);

export default router;
