import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../Hooks/UseAxios";
import GlobalLoader from "../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const AllTrainers = () => {
  const { theme } = use(AuthContext);
  const axiosInstance = UseAxios();

  const {
    data: trainers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["approvedTrainers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers?status=approved");
      return res.data;
    },
  });

  if (isLoading) return <GlobalLoader></GlobalLoader>;
  if (isError)
    return (
      <p className="text-red-500 text-center py-10">Failed to load trainers.</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <Helmet>
        <title>WeFit | All-Trainers</title>
      </Helmet>
      <h2
        className={`text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Meet Our Trainers
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className={`border rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-xl duration-300 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200"
                : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            <img
              src={trainer.image}
              alt={trainer.fullName}
              className="w-32 h-32 object-cover rounded-full mb-6 ring-4 ring-primary/30"
            />
            <h3 className="text-2xl font-semibold mb-2">{trainer.fullName}</h3>
            <p className="text-sm mb-4 italic">
              {trainer.experience} years of experience
            </p>

            <p className="text-sm mb-4">
              <strong>Available:</strong>{" "}
              {trainer.availableDays?.join(", ") || "N/A"}
            </p>

            <div className="flex gap-6 justify-center text-2xl text-primary mb-6">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-primary/80 transition"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-primary/80 transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-primary/80 transition"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            <Link
              to={`/trainer-details/${trainer._id}`}
              className="w-full py-3 border-2 border-accent hover:bg-accent text-white rounded-lg font-semibold  transition"
            >
              Know More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
