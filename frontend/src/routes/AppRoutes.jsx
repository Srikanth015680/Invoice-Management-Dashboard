import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import CustomerProfile from "../pages/CustomerProfile";
import Summary from "../pages/Summary";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="customers/:id"
          element={
            <CustomerProfile />
          }
        />

        <Route
          path="summary"
          element={<Summary />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;