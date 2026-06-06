import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { getCustomerProfile } from "../api/customerApi";

import CustomerCard from "../components/customer/CustomerCard";
import CustomerStats from "../components/customer/CustomerStats";
import InvoiceHistory from "../components/customer/InvoiceHistory";

const CustomerProfile = () => {
  const { id } = useParams();

  const [customer, setCustomer] =
    useState(null);

  const [metrics, setMetrics] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCustomer();
  }, [id]);

  const loadCustomer = async () => {
    try {
      const data =
        await getCustomerProfile(id);

      setCustomer(data.customer);
      setMetrics(data.metrics);
      setHistory(data.history);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <CustomerCard
        customer={customer}
      />

      <CustomerStats
        metrics={metrics}
      />

      <InvoiceHistory
        invoices={history}
      />
    </div>
  );
};

export default CustomerProfile;