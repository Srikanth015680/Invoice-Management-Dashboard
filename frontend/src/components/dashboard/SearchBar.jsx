import React from "react";

const SearchBar = ({
  search,
  setSearch,
}) => {
  return (
    <input
      type="text"
      placeholder="Search invoice or customer..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;