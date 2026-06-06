import express from 'express';
import { getCustomers, getCustomerProfile } from '../controllers/customerController.js';

const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerProfile);

export default router;