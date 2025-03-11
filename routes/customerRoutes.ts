import express from 'express';
import {
  addCustomer,
  verifyCustomer,
  getAllCustomers,
} from '../controllers/customerControllers';

const router = express.Router();

router.post('/add-customer', addCustomer);
router.post('/verify-customer', verifyCustomer);
router.get('/get-all-customers', getAllCustomers);

export default router;
