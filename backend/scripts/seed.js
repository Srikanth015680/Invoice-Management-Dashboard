import dotenv from "dotenv";
import connectDB from "../config/db.js";

import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedData = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    const filePath = path.resolve(
      __dirname,
      "../../seed-data.json"
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `seed-data.json not found at ${filePath}`
      );
    }

    const rawData = fs.readFileSync(
      filePath,
      "utf8"
    );

    if (!rawData.trim()) {
      throw new Error(
        "seed-data.json is empty"
      );
    }

    const invoices = JSON.parse(rawData);

    await Invoice.deleteMany({});
    await Customer.deleteMany({});

    console.log("Old data removed");

    const customerMap = new Map();

    invoices.forEach((invoice) => {
      if (!customerMap.has(invoice.customer)) {
        customerMap.set(invoice.customer, {
          name: invoice.customer,
          company: invoice.company,
        });
      }
    });

    const customers = await Customer.insertMany(
      [...customerMap.values()]
    );

    console.log(
      `${customers.length} customers inserted`
    );

    const customerLookup = {};

    customers.forEach((customer) => {
      customerLookup[customer.name] =
        customer._id;
    });

    const invoiceDocs = invoices.map(
      (invoice) => ({
        invoiceId: invoice.invoiceId,
        customer:
          customerLookup[invoice.customer],
        amount: invoice.amount,
        taxRate: invoice.taxRate,
        tax: invoice.tax,
        total: invoice.total,
        status: invoice.status,

        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
      })
    );

    await Invoice.insertMany(invoiceDocs);

    console.log(
      `${invoiceDocs.length} invoices inserted`
    );

    console.log(
      "Database seeded successfully"
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Seed Error:",
      error.message
    );
    process.exit(1);
  }
};

seedData();