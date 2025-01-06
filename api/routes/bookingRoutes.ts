import express from 'express';
import { bookCar } from '../controllers/bookingControllers';

const router = express.Router();

router.post('/book-car', bookCar);

export default router;
