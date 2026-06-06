import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  const navLinkClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-brand-surface"
    }`;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      {/* navbar */}
      <header className="border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-xl font-bold"
          >
            Invoice Dashboard
          </Link>

          <nav className="flex items-center gap-3">
            <NavLink
              to="/"
              end
              className={navLinkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/summary"
              className={navLinkClass}
            >
              Analytics
            </NavLink>
          </nav>
        </div>
      </header>

      {/* main content */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;