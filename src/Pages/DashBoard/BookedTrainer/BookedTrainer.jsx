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
      <h2 className="text-3xl font-bold mb-6">Your Booked Trainer</h2>

      {/* Trainer Info */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Trainer Info</h3>
        <p>
          <strong>Name:</strong> {trainer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {trainer.email}
        </p>
      </section>

      {/* Class Info */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Class Info</h3>
        {classInfo ? (
          <ul className="list-disc ml-5">
            <li>
              <strong>{classInfo.className}</strong> - {classInfo.details}
            </li>
          </ul>
        ) : (
          <p>No class info found.</p>
        )}
      </section>

      {/* Slot Info */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Slot Info</h3>
        {slotInfo ? (
          <ul className="list-disc ml-5">
            <li>
              {slotInfo.slotName} - {slotInfo.slotTime} (
              {slotInfo.days?.join(", ")})
            </li>
          </ul>
        ) : (
          <p>No slot info found.</p>
        )}
      </section>

      {/* Review Button */}
      <button
        className="btn bg-primary text-white px-6 py-2 rounded hover:bg-black"
        onClick={() => setReviewOpen(true)}
      >
        Review Trainer
      </button>

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
