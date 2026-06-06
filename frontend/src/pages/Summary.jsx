import React, {
  useEffect,
  useState,
} from "react";

import { getAnalytics } from "../api/analyticsApi";

import SummaryCards from "../components/analytics/SummaryCards";
import TopCustomers from "../components/analytics/TopCustomers";

const Summary = () => {
  const [summary, setSummary] =
    useState(null);

  const [topCustomers, setTopCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics =
    async () => {
      try {
        const data =
          await getAnalytics();

        setSummary(
          data.summary
        );

        setTopCustomers(
          data.topCustomers
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <p>Loading analytics...</p>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Analytics Summary
      </h1>

      <SummaryCards
        summary={summary}
      />

      <TopCustomers
        customers={
          topCustomers
        }
      />
    </div>
  );
};

export default Summary;