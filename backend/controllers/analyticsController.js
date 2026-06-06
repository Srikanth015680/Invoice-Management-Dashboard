import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";

export const getAnalytics = async (req, res) => {
  try {
    // dashboard summary
    const summary = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalBilled: {
            $sum: "$total",
          },
          totalTax: {
            $sum: "$tax",
          },
          totalInvoices: {
            $sum: 1,
          },
        },
      },
    ]);

    // total customers
    const totalCustomers =
      await Customer.countDocuments();

    // top 5 customers
    const topCustomers =
      await Invoice.aggregate([
        {
          $group: {
            _id: "$customer",

            totalValue: {
              $sum: "$total",
            },

            invoiceCount: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            totalValue: -1,
          },
        },

        {
          $limit: 5,
        },

        {
          $lookup: {
            from: "customers",
            localField: "_id",
            foreignField: "_id",
            as: "customer",
          },
        },

        {
          $unwind: "$customer",
        },

        {
          $project: {
            _id: 0,

            customerId:
              "$customer._id",

            customerName:
              "$customer.name",

            company:
              "$customer.company",

            totalValue: 1,

            invoiceCount: 1,
          },
        },
      ]);

    res.status(200).json({
      success: true,

      summary: {
        totalBilled:
          summary[0]?.totalBilled || 0,

        totalTax:
          summary[0]?.totalTax || 0,

        totalInvoices:
          summary[0]?.totalInvoices || 0,

        totalCustomers,
      },

      topCustomers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};