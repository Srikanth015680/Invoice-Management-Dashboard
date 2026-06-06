import React, { useState } from "react";

import SearchBar from "../components/dashboard/SearchBar";
import FilterBar from "../components/dashboard/FilterBar";
import InvoiceTable from "../components/dashboard/InvoiceTable";
import Pagination from "../components/dashboard/Pagination";

import InvoiceModal from "../components/invoice/InvoiceModal";

import useInvoices from "../hooks/useInvoices";

import {
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../api/invoiceApi";

const Dashboard = () => {
  const {
    invoices,
    loading,
    error,
    page,
    setPage,
    totalPages,
    search,
    setSearch,
    status,
    setStatus,
    refreshInvoices,
  } = useInvoices();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [selectedInvoice, setSelectedInvoice] =
    useState(null);

  const [formData, setFormData] =
    useState({
      customerId: "",
      company: "",
      amount: "",
      taxRate: 18,
      status: "Draft",
      issueDate: "",
      dueDate: "",
    });

  const resetForm = () => {
    setFormData({
      customerId: "",
      company: "",
      amount: "",
      taxRate: 18,
      status: "Draft",
      issueDate: "",
      dueDate: "",
    });

    setSelectedInvoice(null);
    setIsEditing(false);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);

    setFormData({
      customerId:
        invoice.customer?._id || "",
      company:
        invoice.customer?.company || "",
      amount: invoice.amount,
      taxRate: invoice.taxRate,
      status: invoice.status,
      issueDate:
        invoice.issueDate?.split("T")[0],
      dueDate:
        invoice.dueDate?.split("T")[0],
    });

    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        "Delete this invoice?"
      );

    if (!confirmed) return;

    try {
      await deleteInvoice(id);
      refreshInvoices();
    } catch (error) {
      console.error(error);
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    const payload = {
      customer: formData.customerId,
      amount: Number(formData.amount),
      taxRate: Number(formData.taxRate),
      status: formData.status,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
    };

    if (
      isEditing &&
      selectedInvoice
    ) {
      await updateInvoice(
        selectedInvoice._id,
        payload
      );
    } else {
      await createInvoice({
        customerId:
          formData.customerId,
        amount: Number(
          formData.amount
        ),
        taxRate: Number(
          formData.taxRate
        ),
        status: formData.status,
        issueDate:
          formData.issueDate,
        dueDate:
          formData.dueDate,
      });
    }

    setIsModalOpen(false);
    resetForm();
    refreshInvoices();
  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data
        ?.message ||
        "Failed to save invoice"
    );
  } finally {
    setSaving(false);
  }
};
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          Invoice Dashboard
        </h1>

        <button
          onClick={openCreateModal}
          className="rounded-lg bg-blue-600 px-5 py-3"
        >
          New Invoice
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <FilterBar
          status={status}
          setStatus={setStatus}
        />
      </div>

      {loading && (
        <p>Loading invoices...</p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {!loading && (
        <>
          <InvoiceTable
            invoices={invoices}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <InvoiceModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        loading={saving}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Dashboard;