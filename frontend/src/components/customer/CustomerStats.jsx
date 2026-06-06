import React from "react";

const CustomerStats = ({
  metrics,
}) => {
  if (!metrics) return null;

  const cards = [
    {
      title: "Total Billed",
      value: `₹${metrics.totalBilled?.toLocaleString()}`,
    },
    {
      title: "Total Tax",
      value: `₹${metrics.totalTax?.toLocaleString()}`,
    },
    {
      title: "Outstanding",
      value: `₹${metrics.outstanding?.toLocaleString()}`,
    },
    {
      title: "Invoices",
      value: metrics.invoiceCount,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-brand-surface p-5 shadow-md"
        >
          <p className="text-sm text-gray-400">
            {card.title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CustomerStats;