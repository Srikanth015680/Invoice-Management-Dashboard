import api from "./axios";

// get invoices with filters
export const getInvoices = async (params = {}) => {
  const response = await api.get("/invoices", {
    params,
  });

  return response.data;
};

// get invoice by id
export const getInvoiceById = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

// create invoice
export const createInvoice = async (invoiceData) => {
  const response = await api.post(
    "/invoices",
    invoiceData
  );

  return response.data;
};

// update invoice
export const updateInvoice = async (
  id,
  invoiceData
) => {
  const response = await api.put(
    `/invoices/${id}`,
    invoiceData
  );

  return response.data;
};

// delete invoice
export const deleteInvoice = async (id) => {
  const response = await api.delete(
    `/invoices/${id}`
  );

  return response.data;
};