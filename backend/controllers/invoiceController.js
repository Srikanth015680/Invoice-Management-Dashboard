import mongoose from "mongoose";
import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";

// get all invoice
export const getInvoices = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      sortBy = "issueDate",
      sortOrder = "desc",
      search,
      status,
      taxRate,
      customerId,
      issueDateStart,
      issueDateEnd,
      dueDateStart,
      dueDateEnd,
    } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query = {};

    // status filter
    if (status) {
      query.status = status;
    }

    // tax filter
    if (taxRate) {
      query.taxRate = Number(taxRate);
    }

    // customer filter
    if (customerId) {
      query.customer = customerId;
    }

    // issue date filter
    if (issueDateStart || issueDateEnd) {
      query.issueDate = {};

      if (issueDateStart) {
        query.issueDate.$gte = new Date(issueDateStart);
      }

      if (issueDateEnd) {
        query.issueDate.$lte = new Date(issueDateEnd);
      }
    }

    // due date filter
    if (dueDateStart || dueDateEnd) {
      query.dueDate = {};

      if (dueDateStart) {
        query.dueDate.$gte = new Date(dueDateStart);
      }

      if (dueDateEnd) {
        query.dueDate.$lte = new Date(dueDateEnd);
      }
    }

    // search
    if (search) {
      const matchingCustomers = await Customer.find({
        name: {
          $regex: search,
          $options: "i",
        },
      });

      const customerIds = matchingCustomers.map(
        (customer) => customer._id
      );

      query.$or = [
        {
          invoiceId: {
            $regex: search,
            $options: "i",
          },
        },
        {
          customer: {
            $in: customerIds,
          },
        },
      ];
    }

    const totalInvoices =
      await Invoice.countDocuments(query);

    const invoices = await Invoice.find(query)
      .populate("customer")
      .sort({
        [sortBy]:
          sortOrder === "desc" ? -1 : 1,
      })
      .skip(
        (pageNumber - 1) * limitNumber
      )
      .limit(limitNumber)
      .lean();

    res.status(200).json({
      success: true,
      invoices,
      totalInvoices,
      totalPages: Math.ceil(
        totalInvoices / limitNumber
      ),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get invoice
export const getInvoiceById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid invoice id",
      });
    }

    const invoice =
      await Invoice.findById(id)
        .populate("customer")
        .lean();

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// create invoice
export const createInvoice = async (
  req,
  res
) => {
  try {
    const {
      customerId,
      amount,
      taxRate,
      status,
      issueDate,
      dueDate,
    } = req.body;

    const customer =
      await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const invoiceId = `INV-${Math.floor(
      1000000 +
        Math.random() * 9000000
    )}`;

    const tax = Number(
      (
        amount *
        (taxRate / 100)
      ).toFixed(2)
    );

    const total = Number(
      (amount + tax).toFixed(2)
    );

    const invoice =
      await Invoice.create({
        invoiceId,
        customer: customerId,
        amount,
        taxRate,
        tax,
        total,
        status,
        issueDate,
        dueDate,
      });

    res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// update invoice
export const updateInvoice = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const existingInvoice =
      await Invoice.findById(id);

    if (!existingInvoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const amount =
      req.body.amount ??
      existingInvoice.amount;

    const taxRate =
      req.body.taxRate ??
      existingInvoice.taxRate;

    const tax = Number(
      (
        amount *
        (taxRate / 100)
      ).toFixed(2)
    );

    const total = Number(
      (amount + tax).toFixed(2)
    );

    const updatedInvoice =
      await Invoice.findByIdAndUpdate(
        id,
        {
          ...req.body,
          amount,
          taxRate,
          tax,
          total,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate("customer");

    res.status(200).json({
      success: true,
      invoice: updatedInvoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// delete invoice
export const deleteInvoice = async (
  req,
  res
) => {
  try {
    const invoice =
      await Invoice.findById(
        req.params.id
      );

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    await invoice.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Invoice deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};