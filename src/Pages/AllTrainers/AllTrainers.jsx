import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxios from "../../Hooks/UseAxios";

const AllTrainers = () => {
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

  if (isLoading)
    return <p className="text-center py-10">Loading trainers...</p>;
  if (isError)
    return (
      <p className="text-red-500 text-center py-10">Failed to load trainers.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-32">
      <h2 className="text-3xl font-bold text-center mb-8">
        👨‍🏫 Meet Our Trainers
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="border rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <img
              src={trainer.image}
              alt={trainer.fullName}
              className="w-28 h-28 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{trainer.fullName}</h3>

            <p className="text-sm mb-2">
              <strong>Available:</strong> {trainer.availableDays?.join(", ")}
            </p>

            {/* Socials (optional static icons for now) */}
            <div className="flex gap-4 justify-center text-xl text-blue-600 my-2">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>

            <Link
              to={`/trainer-details/${trainer._id}`}
              className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-black"
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
