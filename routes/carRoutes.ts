import express from 'express';
import { addCar, getAvailableCars } from '../controllers/carController';

const router = express.Router();

router.post('/add-car', addCar);
router.get('/get-available-cars', getAvailableCars);

export default router;
