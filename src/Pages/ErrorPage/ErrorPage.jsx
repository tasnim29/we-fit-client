import React from "react";
import { Link } from "react-router";

const ErrorPage = ({ theme }) => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 text-center ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        Oops! Page not found
      </h2>
      <p className="mb-8 text-gray-500 md:text-lg">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className={`px-6 py-3 rounded-full font-semibold transition transform hover:scale-105 ${
          theme === "dark"
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-accent text-white hover:bg-accent/90"
        }`}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
