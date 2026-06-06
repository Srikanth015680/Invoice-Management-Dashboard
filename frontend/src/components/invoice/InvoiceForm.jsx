import React, { useEffect, useState } from "react";
import { getCustomers } from "../../api/customerApi";

const InvoiceForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
}) => {
  const [customers, setCustomers] =
    useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data =
        await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCustomerChange = (
    e
  ) => {
    const selectedCustomer =
      customers.find(
        (customer) =>
          customer._id ===
          e.target.value
      );

    setFormData({
      ...formData,
      customerId:
        selectedCustomer?._id || "",
      company:
        selectedCustomer?.company ||
        "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const amount =
    Number(formData.amount) || 0;

  const taxRate =
    Number(formData.taxRate) || 0;

  const tax = Number(
    (
      amount *
      (taxRate / 100)
    ).toFixed(2)
  );

  const total = Number(
    (amount + tax).toFixed(2)
  );

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {/* customer */}
      <div>
        <label className="mb-1 block">
          Customer
        </label>

        <select
          value={
            formData.customerId
          }
          onChange={
            handleCustomerChange
          }
          className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2"
          required
        >
          <option value="">
            Select Customer
          </option>

          {customers.map(
            (customer) => (
              <option
                key={
                  customer._id
                }
                value={
                  customer._id
                }
              >
                {customer.name}
              </option>
            )
          )}
        </select>
      </div>

      {/* company */}
      <div>
        <label className="mb-1 block">
          Company
        </label>

        <input
          type="text"
          value={formData.company}
          readOnly
          className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2"
        />
      </div>

      {/* amount */}
      <div>
        <label className="mb-1 block">
          Amount
        </label>

        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2"
          required
        />
      </div>

      {/* tax rate */}
      <div>
        <label className="mb-1 block">
          Tax Rate
        </label>

        <select
          name="taxRate"
          value={formData.taxRate}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2"
          required
        >
          <option value={0}>
            0%
          </option>
          <option value={3}>
            3%
          </option>
          <option value={5}>
            5%
          </option>
          <option value={18}>
            18%
          </option>
          <option value={28}>
            28%
          </option>
        </select>
      </div>

      {/* issue date */}
      <div>
        <label className="mb-1 block">
          Issue Date
        </label>

        <input
          type="date"
          name="issueDate"
          value={
            formData.issueDate
          }
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2"
          required
        />
      </div>

      {/* due date */}
      <div>
        <label className="mb-1 block">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2"
          required
        />
      </div>

      {/* status */}
      <div>
        <label className="mb-1 block">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-700 bg-brand-surface px-4 py-2"
        >
          <option value="Draft">
            Draft
          </option>

          <option value="Sent">
            Sent
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

          <option value="Void">
            Void
          </option>
        </select>
      </div>

      {/* totals */}
      <div className="rounded-lg bg-gray-800 p-4">
        <p>
          Tax: ₹{tax}
        </p>

        <p className="font-semibold">
          Total: ₹{total}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 font-medium"
      >
        {loading
          ? "Saving..."
          : "Save Invoice"}
      </button>
    </form>
  );
};

export default InvoiceForm;