import React from "react";

const FilterBar = ({
  status,
  setStatus,
}) => {
  return (
    <div className="flex gap-3">
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="rounded-lg border border-gray-700 bg-brand-surface px-4 py-2 text-white"
      >
        <option value="">
          All Status
        </option>

        <option value="Paid">
          Paid
        </option>

        <option value="Unpaid">
          Unpaid
        </option>

        <option value="Overdue">
          Overdue
        </option>

        <option value="Sent">
          Sent
        </option>

        <option value="Draft">
          Draft
        </option>

        <option value="Void">
          Void
        </option>
      </select>
    </div>
  );
};

export default FilterBar;