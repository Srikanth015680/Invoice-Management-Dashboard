import React from "react";

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${summary.totalBilled?.toLocaleString()}`,
    },
    {
      title: "Total Tax",
      value: `₹${summary.totalTax?.toLocaleString()}`,
    },
    {
      title: "Total Invoices",
      value: summary.totalInvoices,
    },
    {
      title: "Total Customers",
      value: summary.totalCustomers,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-brand-surface p-6 shadow-md"
        >
          <p className="text-sm text-gray-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;