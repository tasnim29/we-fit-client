import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import logo from "../../../assets/companyLogo.png";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    logOutUser().then(() => console.log("Logged out"));
  };

  const navItems = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/all-trainers", label: "All Trainers" },
        { to: "/all-classes", label: "All Classes" },
        // { to: "/beTrainer", label: "Be A Trainer" },
        { to: "/forums", label: "Forums" },
        ...(user ? [{ to: "/dashboard", label: "Dashboard" }] : []),
      ].map(({ to, label }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={closeDrawer}
            className={({ isActive }) =>
              `px-4 py-2 font-medium rounded transition duration-200 ${
                isActive
                  ? "text-accent font-semibold border-b-2 border-accent"
                  : "text-white hover:text-accent"
              }`
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" className="w-16" />
          </Link>
          <div>
            <DarkMode></DarkMode>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6">{navItems}</ul>

        {/* Login + Drawer Toggle */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="User"
                />
              )}
              <button
                onClick={handleLogout}
                className="bg-accent cursor-pointer text-white px-4 py-1.5 rounded transition duration-300 hover:scale-105"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-accent text-white px-4 py-1.5 rounded transition duration-300 hover:scale-105 cursor-pointer "
            >
              Log In
            </Link>
          )}

          {/* Drawer Toggle */}
          <button onClick={toggleDrawer} className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isDrawerOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary z-40 shadow-lg transform transition-transform duration-300 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span className="text-xl font-semibold text-accent">Menu</span>
          <button onClick={closeDrawer}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="p-4 space-y-2 text-black">{navItems}</ul>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/40 z-30" onClick={closeDrawer} />
      )}
    </header>
  );
};

export default Navbar;
