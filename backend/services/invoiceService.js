import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";

export const getInvoicesService =
  async (filters) => {
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
    } = filters;

    const query = {};

    if (status) {
      query.status = status;
    }

    if (taxRate) {
      query.taxRate = Number(
        taxRate
      );
    }

    if (customerId) {
      query.customer = customerId;
    }

    if (
      issueDateStart ||
      issueDateEnd
    ) {
      query.issueDate = {};

      if (issueDateStart) {
        query.issueDate.$gte =
          new Date(
            issueDateStart
          );
      }

      if (issueDateEnd) {
        query.issueDate.$lte =
          new Date(
            issueDateEnd
          );
      }
    }

    if (
      dueDateStart ||
      dueDateEnd
    ) {
      query.dueDate = {};

      if (dueDateStart) {
        query.dueDate.$gte =
          new Date(
            dueDateStart
          );
      }

      if (dueDateEnd) {
        query.dueDate.$lte =
          new Date(
            dueDateEnd
          );
      }
    }

    if (search) {
      const matchingCustomers =
        await Customer.find({
          name: {
            $regex: search,
            $options: "i",
          },
        });

      const customerIds =
        matchingCustomers.map(
          (customer) =>
            customer._id
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
      await Invoice.countDocuments(
        query
      );

    const invoices =
      await Invoice.find(query)
        .populate("customer")
        .sort({
          [sortBy]:
            sortOrder === "desc"
              ? -1
              : 1,
        })
        .skip(
          (Number(page) - 1) *
            Number(limit)
        )
        .limit(Number(limit))
        .lean();

    return {
      invoices,
      totalInvoices,
      totalPages: Math.ceil(
        totalInvoices /
          Number(limit)
      ),
      currentPage:
        Number(page),
    };
  };