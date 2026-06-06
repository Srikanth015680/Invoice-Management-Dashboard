import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({
  invoices,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "Paid":
        return "bg-green-600";

      case "Overdue":
        return "bg-red-600";

      case "Unpaid":
        return "bg-yellow-600";

      case "Draft":
        return "bg-gray-600";

      case "Sent":
        return "bg-blue-600";

      default:
        return "bg-slate-600";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-brand-surface">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-4 text-left">
              Invoice ID
            </th>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Total
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Due Date
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(
            (invoice) => (
              <tr
                key={invoice._id}
                className="border-b border-gray-800"
              >
                <td className="p-4">
                  {
                    invoice.invoiceId
                  }
                </td>

                <td className="p-4">
                  <Link
                    to={`/customers/${invoice.customer?._id}`}
                    className="text-blue-400 hover:underline"
                  >
                    {
                      invoice
                        .customer
                        ?.name
                    }
                  </Link>
                </td>

                <td className="p-4">
                  ₹
                  {invoice.amount?.toLocaleString()}
                </td>

                <td className="p-4">
                  ₹
                  {invoice.total?.toLocaleString()}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded px-2 py-1 text-sm ${getStatusColor(
                      invoice.status
                    )}`}
                  >
                    {
                      invoice.status
                    }
                  </span>
                </td>

                <td className="p-4">
                  {new Date(
                    invoice.dueDate
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        onEdit(
                          invoice
                        )
                      }
                      className="rounded bg-blue-600 px-3 py-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          invoice._id
                        )
                      }
                      className="rounded bg-red-600 px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;