import React from "react";
import InvoiceForm from "./InvoiceForm";

const InvoiceModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  loading,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-2xl rounded-xl bg-brand-dark p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isEditing
              ? "Edit Invoice"
              : "New Invoice"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <InvoiceForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default InvoiceModal;