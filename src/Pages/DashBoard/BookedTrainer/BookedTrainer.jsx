import React, { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";

import ReviewModal from "./ReviewModal";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const BookedTrainer = () => {
  const { user } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [reviewOpen, setReviewOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["booked-trainer", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/booked-trainer?email=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading your booked trainer details...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>No booked trainer found.</p>;

  const { trainer, classInfo, slotInfo } = data;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-center text-gray-800">
        Your Booked Trainer
      </h2>

      {/* Trainer Info */}
      <section className="mb-10 bg-white shadow rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={
            trainer?.image || "https://via.placeholder.com/150?text=No+Image"
          }
          alt={trainer?.fullName}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border border-gray-300 shadow"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            {trainer?.fullName}
          </h3>
          <p className="text-gray-600">
            <strong>Email:</strong> {trainer?.email}
          </p>
        </div>
      </section>

      {/* Class Info */}
      <section className="mb-6 bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Class Info
        </h3>
        {classInfo ? (
          <ul className="list-disc ml-5 text-gray-700">
            <li>
              <strong>{classInfo.className}</strong> – {classInfo.details}
            </li>
          </ul>
        ) : (
          <p className="text-gray-500 italic">No class info found.</p>
        )}
      </section>

      {/* Slot Info */}
      <section className="mb-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Slot Info</h3>
        {slotInfo ? (
          <ul className="list-disc ml-5 text-gray-700">
            <li>
              {slotInfo.slotName} – {slotInfo.slotTime} (
              {slotInfo.days?.join(", ")})
            </li>
          </ul>
        ) : (
          <p className="text-gray-500 italic">No slot info found.</p>
        )}
      </section>

      {/* Review Button */}
      <div className="text-center">
        <button
          className="bg-accent cursor-pointer hover:bg-blue-700 transition text-white font-semibold px-6 py-3 rounded-lg shadow"
          onClick={() => setReviewOpen(true)}
        >
          Review Trainer
        </button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        trainerId={trainer._id}
        user={user}
      />
    </div>
  );
};

export default BookedTrainer;
