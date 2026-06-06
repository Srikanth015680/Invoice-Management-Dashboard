import React from "react";

const CustomerCard = ({ customer }) => {
  if (!customer) return null;

  return (
    <div className="rounded-xl bg-brand-surface p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Customer Information
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-400">
            Name
          </p>

          <p className="text-lg font-medium">
            {customer.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Company
          </p>

          <p className="text-lg font-medium">
            {customer.company}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Customer ID
          </p>

          <p className="text-sm">
            {customer._id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;