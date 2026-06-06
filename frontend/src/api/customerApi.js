import api from "./axios";

// get all customers
export const getCustomers = async () => {
  const response = await api.get("/customers");
  return response.data;
};

// get customer profile by id
export const getCustomerProfile = async (id) => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};