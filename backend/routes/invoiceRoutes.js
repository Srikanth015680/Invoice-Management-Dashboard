import express from "express";

import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

//get all invoices
router.get("/", getInvoices);

// get single invoice
router.get("/:id", getInvoiceById);

//create invoice
router.post("/", createInvoice);

// update invoice
router.put("/:id", updateInvoice);

//delete invoice
router.delete("/:id", deleteInvoice);

export default router;