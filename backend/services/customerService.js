import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

export const getAllCustomers = async () => {
  return await Customer.find({})
    .sort({ name: 1 })
    .lean();
};

export const getCustomerProfileById = async (
  customerId
) => {
  const customer = await Customer.findById(
    customerId
  ).lean();

  if (!customer) {
    return null;
  }

  const history = await Invoice.find({
    customer: customerId,
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

    if (
      statusCounts[invoice.status] !==
      undefined
    ) {
      statusCounts[invoice.status]++;
    }
  });

  return {
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
  };
};