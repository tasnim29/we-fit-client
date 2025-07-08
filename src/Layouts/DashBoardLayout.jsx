import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { MdHome } from "react-icons/md";

const DashBoardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 w-64 h-screen bg-gray-100 shadow-md transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative`}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between px-4 py-3 border-b lg:hidden">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-primary"
          >
            ✕
          </button>
        </div>

        <Link to="/" className="p-4">
          <h1 className="text-xl font-bold">WeFIT</h1>
        </Link>
        <ul className="p-4 space-y-2 text-primary font-medium">
          <li>
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(false)} // Close on click (mobile)
            >
              <MdHome /> Dashboard Home
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Top navbar on small screen */}
        <div className="bg-gray-200 p-4 flex items-center justify-between lg:hidden shadow">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-primary"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* <span className="font-semibold text-lg">Dashboard</span> */}
        </div>

        {/* Main content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
