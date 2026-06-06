import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

// GET /api/customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({})
      .sort({ name: 1 })
      .lean();

    res.status(200).json(customers);
  } catch (error) {
    console.error("Get Customers Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/customers/:id
export const getCustomerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // validate mongodb Objectid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer id",
      });
    }

    const customer = await Customer.findById(id).lean();

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const history = await Invoice.find({
      customer: id,
    })
      .sort({ issueDate: -1 })
      .lean();

    let totalBilled = 0;
    let totalTax = 0;
    let outstanding = 0;

    const statusCounts = {
      Paid: 0,
      Unpaid: 0,
      Overdue: 0,
      Draft: 0,
      Sent: 0,
      Void: 0,
    };

    history.forEach((invoice) => {
      totalBilled += invoice.total || 0;
      totalTax += invoice.tax || 0;

      if (
        ["Unpaid", "Overdue", "Sent"].includes(
          invoice.status
        )
      ) {
        outstanding += invoice.total || 0;
      }

      if (statusCounts[invoice.status] !== undefined) {
        statusCounts[invoice.status]++;
      }
    });

    res.status(200).json({
      success: true,

      customer,

      metrics: {
        totalBilled: Number(
          totalBilled.toFixed(2)
        ),

        totalTax: Number(
          totalTax.toFixed(2)
        ),

        outstanding: Number(
          outstanding.toFixed(2)
        ),

        invoiceCount: history.length,

        statusCounts,
      },

      history,
    });
  } catch (error) {
    console.error(
      "Customer Profile Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};