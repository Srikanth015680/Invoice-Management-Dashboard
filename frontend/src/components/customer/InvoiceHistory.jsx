import React from "react";

const InvoiceHistory = ({
  invoices,
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
    <div className="rounded-xl bg-brand-surface p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        Invoice History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">
                Invoice ID
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Tax
              </th>

              <th className="p-3 text-left">
                Total
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Issue Date
              </th>

              <th className="p-3 text-left">
                Due Date
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices?.map(
              (invoice) => (
                <tr
                  key={invoice._id}
                  className="border-b border-gray-800"
                >
                  <td className="p-3">
                    {
                      invoice.invoiceId
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {invoice.amount?.toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹
                    {invoice.tax?.toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹
                    {invoice.total?.toLocaleString()}
                  </td>

                  <td className="p-3">
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

                  <td className="p-3">
                    {new Date(
                      invoice.issueDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {new Date(
                      invoice.dueDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {(!invoices ||
          invoices.length === 0) && (
          <p className="py-6 text-center text-gray-400">
            No invoices found.
          </p>
        )}
      </div>
    </div>
  );
};

export default InvoiceHistory;