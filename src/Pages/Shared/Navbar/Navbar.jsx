import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import logo from "../../../assets/companyLogo.png";

const Navbar = ({ isTransparent }) => {
  const { user, logOutUser } = use(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  const handleLogout = () => {
    logOutUser().then(() => {
      console.log("log out successful");
    });
  };

  const navItems = (isTransparent) => (
    <>
      <li>
        <NavLink
          to="/"
          onClick={closeDrawer}
          className={({ isActive }) =>
            `block px-4 py-2 transition duration-300 ${
              isTransparent
                ? "text-white hover:text-secondary"
                : "text-black hover:text-secondary"
            } ${isActive ? "font-bold  text-xl " : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-trainers"
          onClick={closeDrawer}
          className={({ isActive }) =>
            `block px-4 py-2 transition duration-300 ${
              isTransparent
                ? "text-white hover:text-secondary"
                : "text-black hover:text-secondary"
            } ${isActive ? "font-bold text-secondary text-xl" : ""}`
          }
        >
          All Trainers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-classes"
          onClick={closeDrawer}
          className={({ isActive }) =>
            `block px-4 py-2 transition duration-300 ${
              isTransparent
                ? "text-white hover:text-secondary"
                : "text-black hover:text-secondary"
            } ${isActive ? "font-bold text-secondary text-xl" : ""}`
          }
        >
          All Classes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/beTrainer"
          onClick={closeDrawer}
          className={({ isActive }) =>
            `block px-4 py-2 transition duration-300 ${
              isTransparent
                ? "text-white hover:text-secondary"
                : "text-black hover:text-secondary"
            } ${isActive ? "font-bold text-secondary text-xl" : ""}`
          }
        >
          Be A Trainer
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `block px-4 py-2 transition duration-300 ${
                isTransparent
                  ? "text-white hover:text-secondary"
                  : "text-black hover:text-secondary"
              } ${isActive ? "font-bold text-secondary text-xl" : ""}`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
      <li>
        <NavLink
          to="/forums"
          onClick={closeDrawer}
          className={({ isActive }) =>
            `block px-4 py-2 transition duration-300 ${
              isTransparent
                ? "text-white hover:text-secondary"
                : "text-black hover:text-secondary"
            } ${isActive ? "font-bold text-secondary text-xl" : ""}`
          }
        >
          Forums
        </NavLink>
      </li>
    </>
  );

  return (
    <header
      className={`p-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-black/60 backdrop-blur-xl text-white"
          : "bg-white shadow-md text-black"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-16">
        {/* Logo */}
        <div>
          <img className="w-32" src={logo} alt="" />
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex space-x-4 items-center font-semibold">
          {navItems(isTransparent)}
        </ul>

        {/* Login + menu toggle */}
        <div className="flex items-center space-x-2">
          {user ? (
            <button
              onClick={handleLogout}
              to="login"
              className={`px-5 py-2 rounded text-sm transition cursor-pointer ${
                isTransparent
                  ? "bg-secondary text-white hover:bg-light hover:text-primary"
                  : "bg-secondary text-white hover:bg-black"
              }`}
            >
              Log out
            </button>
          ) : (
            <Link
              to="login"
              className={`px-5 py-2 rounded text-sm transition ${
                isTransparent
                  ? "bg-secondary text-white hover:bg-light hover:text-primary"
                  : "bg-secondary text-white hover:bg-black"
              }`}
            >
              Log in
            </Link>
          )}

          {/* Drawer toggle */}
          <button onClick={toggleDrawer} className="lg:hidden p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`w-6 h-6 ${
                isTransparent ? "text-white" : "text-gray-800"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md transform transition-transform duration-300 ease-in-out z-40 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg text-secondary">Menu</span>
          <button onClick={closeDrawer}>
            <svg
              className="h-6 w-6 text-gray-700"
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
        <ul className="flex flex-col py-4 space-y-2 text-black">
          {navItems(false)}
        </ul>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={closeDrawer}
        />
      )}
    </header>
  );
};

export default Navbar;
