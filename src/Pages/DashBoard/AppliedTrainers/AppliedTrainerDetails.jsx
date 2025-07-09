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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Trainer Details</h2>
      <img
        src={trainer.image}
        alt={trainer.fullName}
        className="w-40 h-40 object-cover rounded-full mb-4"
      />
      <p>
        <strong>Name:</strong> {trainer.fullName}
      </p>
      <p>
        <strong>Email:</strong> {trainer.email}
      </p>
      <p>
        <strong>Age:</strong> {trainer.age}
      </p>
      <p>
        <strong>Skills:</strong> {trainer.skills?.join(", ")}
      </p>
      <p>
        <strong>Available Days:</strong> {trainer.availableDays?.join(", ")}
      </p>
      <p>
        <strong>Available Time:</strong> {trainer.availableTime}
      </p>
      <p>
        <strong>Status:</strong> {trainer.status}
      </p>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleApprove}
        >
          Confirm
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setShowRejectModal(true)}
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
