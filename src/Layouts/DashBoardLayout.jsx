import React, { use, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  MdAccessTime,
  MdAccountBalanceWallet,
  MdEventNote,
  MdForum,
  MdHome,
  MdHowToReg,
  MdLibraryAdd,
  MdLogout,
  MdMailOutline,
  MdPeopleAlt,
} from "react-icons/md";
import logo from "../assets/companyLogo.png";
import UseUserRole from "../Hooks/UseUserRole";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import DarkMode from "../Pages/Shared/DarkMode/DarkMode";

const DashBoardLayout = () => {
  const { role, isLoading } = UseUserRole();
  console.log(role);
  const { logOutUser, user, theme } = use(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logOutUser();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 w-64 h-screen shadow-md transition-transform duration-300 ease-in-out transform 
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 lg:relative 
      ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-800"
      }`}
      >
        {/* Close button for mobile */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b lg:hidden 
        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        >
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-primary"
          >
            ✕
          </button>
        </div>

        {/* Logo */}
        <Link className="py-4" to="/">
          <div>
            <img className="w-24 mx-auto" src={logo} alt="" />
          </div>
        </Link>

        <ul className="p-4 space-y-2 font-medium">
          <li>
            <NavLink
              to="/dashboard"
              className={`flex items-center gap-2 p-2 rounded 
            ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <MdHome /> Dashboard Home
            </NavLink>
          </li>

          {/* Add New Forum (Shared with Admin and Trainer) */}
          {!isLoading && role !== "member" && (
            <li>
              <NavLink
                to="/dashboard/add-forum"
                className={`flex items-center gap-2 p-2 rounded 
              ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <MdForum /> Add New Forum
              </NavLink>
            </li>
          )}

          {/* Admin links */}
          {!isLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className="fa-solid fa-user"></i> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/newsletter-subscribers"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdMailOutline /> Newsletter Subscribers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-trainers"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdPeopleAlt /> All Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/applied-trainers"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdHowToReg /> Applied Trainers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/balance"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdAccountBalanceWallet /> Balance Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-class"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdLibraryAdd /> Add New Class
                </NavLink>
              </li>
            </>
          )}

          {/* Trainer links */}
          {!isLoading && role === "trainer" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manage-slots"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdEventNote /> Manage Slots
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-slot"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <MdAccessTime /> Add New Slot
                </NavLink>
              </li>
            </>
          )}

          {/* Member links */}
          {!isLoading && role === "member" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/activity-log"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className="fa-solid fa-clock-rotate-left"></i> Activity Log
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className="fa-solid fa-user"></i> Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booked-trainer"
                  className={`flex items-center gap-2 p-2 rounded 
                ${
                  theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"
                }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <i className="fa-solid fa-calendar-check"></i> Booked Trainer
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Logout button at bottom */}
        <div
          className={`absolute bottom-0 left-0 w-full p-4 border-t 
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-gray-100 border-gray-200"
        }`}
        >
          <div className="flex items-center gap-3 mb-2 px-2">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full object-cover border"
            />
            <span
              className={`text-sm font-medium truncate ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {user?.displayName || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-white bg-accent transition duration-300 hover:scale-105 rounded cursor-pointer"
          >
            <MdLogout size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Content area */}
      <div
        className="flex-1 flex flex-col w-full overflow-auto"
        style={{ maxHeight: "100vh" }}
      >
        {/* Top navbar on small screen */}
        <div
          className={`p-4 flex items-center justify-between lg:hidden shadow 
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
        >
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
          <DarkMode />
        </div>

        {/* ✅ Top Navbar */}
        <div
          className={`hidden px-6 py-3 lg:flex items-center justify-between border-b shadow-sm sticky top-0 z-30 
        ${
          theme === "dark"
            ? "bg-gray-900 border-gray-700 text-gray-200"
            : "bg-white border-gray-200 text-gray-800"
        }`}
        >
          <div>
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <small>Here you can see all your important data</small>
          </div>
          <div className="flex items-center gap-4">
            <span>{user.displayName}</span>
            <img src={user.photoURL} className="w-8 h-8 rounded-full" />
            <DarkMode />
          </div>
        </div>

        {/* Main content */}
        <div
          className={`p-6 ${
            theme === "dark"
              ? "bg-gray-950 text-gray-200"
              : "bg-white text-gray-800"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
