import express from 'express';
import studentRouter from './students.js';

const router = express.Router();

router.use('/students', studentRouter);

export default router;
