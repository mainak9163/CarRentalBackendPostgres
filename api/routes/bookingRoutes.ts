import express from 'express';
import { bookCar, getAllBookings } from '../controllers/bookingControllers';

const router = express.Router();

router.post('/book-car', bookCar);

router.get('/bookings', getAllBookings)

export default router;
