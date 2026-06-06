import { useEffect, useState } from "react";
import { getInvoices } from "../api/invoiceApi";

const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] =useState(false);

  const [error, setError] =useState("");

  const [page, setPage] =useState(1);

  const [totalPages, setTotalPages] =useState(1);

  const [search, setSearch] =useState("");

  const [status, setStatus] =useState("");

  const fetchInvoices =
    async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getInvoices({
            page,
            search,
            status,
          });

        setInvoices(
          data.invoices || []
        );

        setTotalPages(
          data.totalPages || 1
        );
      } catch (error) {
        console.error(error);

        setError(
          error?.response?.data
            ?.message ||
            "Failed to load invoices"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchInvoices();
  }, [page, search, status]);

  return {
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

    refreshInvoices:
      fetchInvoices,
  };
};

export default useInvoices;