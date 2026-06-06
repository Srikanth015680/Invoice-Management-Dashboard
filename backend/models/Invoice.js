import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: String,
      required: [true, "Invoice ID is required"],
      unique: true,
      trim: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    taxRate: {
      type: Number,
      required: true,
      enum: [0, 3, 5, 18, 28],
    },

    tax: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      required: true,
      enum: [
        "Sent",
        "Unpaid",
        "Overdue",
        "Paid",
        "Void",
        "Draft",
      ],
      default: "Draft",
    },

    issueDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// indexes
invoiceSchema.index({ status: 1 });
invoiceSchema.index({ taxRate: 1 });
invoiceSchema.index({ customer: 1 });

invoiceSchema.index({
  issueDate: -1,
});

invoiceSchema.index({
  dueDate: 1,
});

invoiceSchema.index({
  amount: 1,
});

const Invoice = mongoose.model(
  "Invoice",
  invoiceSchema
);

export default Invoice;