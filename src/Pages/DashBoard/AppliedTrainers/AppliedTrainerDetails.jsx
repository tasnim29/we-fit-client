import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import RejectModal from "./RejectModal";

const AppliedTrainerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const [showRejectModal, setShowRejectModal] = useState(false);

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appliedTrainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applied/trainers/${id}`);
      return res.data;
    },
  });

  const handleApprove = async () => {
    try {
      await axiosSecure.patch(`/trainers/${id}`, {
        status: "approved",
        email: trainer.email,
      });
      Swal.fire("Approved!", "Trainer has been confirmed.", "success");
      navigate("/dashboard/applied-trainers");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleRejectSubmit = async (feedback) => {
    try {
      await axiosSecure.patch(`/trainers/${id}`, {
        status: "rejected",
        email: trainer.email,
        feedback,
      });
      Swal.fire("Rejected", "Trainer has been rejected", "info");
      setShowRejectModal(false);
      navigate("/dashboard/applied-trainers");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to reject trainer", "error");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load trainer data.</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 bg-white ">
      <h2 className="text-3xl font-bold mb-10  text-center">Trainer Details</h2>

      <div className="flex justify-center mb-6">
        <img
          src={trainer.image}
          alt={trainer.fullName}
          className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-md"
        />
      </div>

      <div className="space-y-3 text-gray-700 text-lg">
        <p>
          <span className="font-semibold text-gray-900">Name:</span>{" "}
          {trainer.fullName || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Email:</span>{" "}
          {trainer.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Age:</span>{" "}
          {trainer.age || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Skills:</span>{" "}
          {trainer.skills?.length ? trainer.skills.join(", ") : "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Available Days:</span>{" "}
          {trainer.availableDays?.length
            ? trainer.availableDays.join(", ")
            : "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Available Time:</span>{" "}
          {trainer.availableTime || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          <span
            className={`capitalize font-semibold ${
              trainer.status === "approved"
                ? "text-green-600"
                : trainer.status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {trainer.status || "N/A"}
          </span>
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={handleApprove}
          className="bg-green-600 cursor-pointer hover:bg-green-700 hover:scale-105  transition-colors duration-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
        >
          Confirm
        </button>
        <button
          onClick={() => setShowRejectModal(true)}
          className="bg-red-600 cursor-pointer hover:bg-red-700 hover:scale-105 transition-colors duration-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
        >
          Reject
        </button>
      </div>

      {/* Modal for rejection */}
      {showRejectModal && (
        <RejectModal
          trainer={trainer}
          onClose={() => setShowRejectModal(false)}
          onSubmit={handleRejectSubmit}
        />
      )}
    </div>
  );
};

export default AppliedTrainerDetails;
