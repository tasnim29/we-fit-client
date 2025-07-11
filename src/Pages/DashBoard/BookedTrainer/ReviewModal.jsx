// ReviewModal.jsx
import React, { use, useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const ReviewModal = ({ isOpen, onClose, trainerId }) => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!rating || !feedback.trim()) {
      Swal.fire("Error", "Please provide rating and feedback.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axiosSecure.post("/reviews", {
        trainerId,
        userEmail: user.email,
        userName: user.displayName,
        rating,
        feedback,
        date: new Date(),
      });

      if (res.data?.reviewId) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        setRating(0);
        setFeedback("");
        onClose();
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Failed to submit review.", "error");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Submit Your Review</h3>

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= rating}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Write your feedback..."
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="flex justify-end space-x-2">
          <button
            className="btn btn-outline btn-sm"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    className={`w-7 h-7 cursor-pointer transition ${
      filled ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"
    }`}
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.39-2.463a1 1 0 00-1.175 0l-3.39 2.463c-.784.57-1.838-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.295 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z"
    />
  </svg>
);

export default ReviewModal;
