import React from "react";

const TopCustomers = ({ customers }) => {
  return (
    <div className="rounded-xl bg-brand-surface p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Top 5 Customers
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Company
              </th>

              <th className="p-3 text-left">
                Revenue
              </th>

              <th className="p-3 text-left">
                Invoices
              </th>
            </tr>
          </thead>

          <tbody>
            {customers?.map(
              (customer, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800"
                >
                  <td className="p-3">
                    {customer.customerName}
                  </td>

                  <td className="p-3">
                    {customer.company}
                  </td>

                  <td className="p-3">
                    ₹
                    {customer.totalValue?.toLocaleString()}
                  </td>

                  <td className="p-3">
                    {customer.invoiceCount}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {(!customers ||
          customers.length === 0) && (
          <p className="py-6 text-center text-gray-400">
            No customer data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default TopCustomers;