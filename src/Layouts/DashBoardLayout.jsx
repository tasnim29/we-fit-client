import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdAccessTime,
  MdAccountBalanceWallet,
  MdEventNote,
  MdForum,
  MdHome,
  MdHowToReg,
  MdLibraryAdd,
  MdMailOutline,
  MdPeopleAlt,
} from "react-icons/md";
import logo from "../assets/companyLogo.png";
import UseUserRole from "../Hooks/UseUserRole";

const DashBoardLayout = () => {
  const { role, isLoading } = UseUserRole();
  console.log(role);
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

        {/* Logo */}
        <Link className="p-4" to="/">
          <div>
            <img className="w-32" src={logo} alt="" />
          </div>
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
          {/* admin links */}
          {!isLoading && role === "admin" && (
            <div>
              <li>
                <NavLink
                  to="/dashboard/newsletter-subscribers"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdMailOutline /> Newsletter Subscribers
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/all-trainers"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdPeopleAlt /> All Trainers
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/applied-trainers"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdHowToReg /> Applied Trainers
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/balance"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdAccountBalanceWallet /> Balance Overview
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/add-class"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdLibraryAdd /> Add New Class
                </NavLink>
              </li>
            </div>
          )}
          {/* trainer links */}
          {!isLoading && role === "trainer" && (
            <div>
              {/* Manage Slots */}
              <li>
                <NavLink
                  to="/dashboard/manage-slots"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdEventNote /> Manage Slots
                </NavLink>
              </li>

              {/* Add New Slot */}
              <li>
                <NavLink
                  to="/dashboard/add-slot"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdAccessTime /> Add New Slot
                </NavLink>
              </li>

              {/* Add New Forum (Shared with Admin) */}
              <li>
                <NavLink
                  to="/dashboard/add-forum"
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdForum /> Add New Forum
                </NavLink>
              </li>
            </div>
          )}
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
