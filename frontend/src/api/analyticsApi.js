import api from "./axios";

// dashboard analytics
export const getAnalytics = async () => {
  const response = await api.get(
    "/analytics"
  );

  return response.data;
};