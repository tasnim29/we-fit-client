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
        userImage: user.photoURL,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-center mb-4">
          Your opinion matters!
        </h2>

        {/* Star Rating */}
        <div className="flex flex-col items-center py-4 space-y-3 w-full">
          <span className="text-center text-gray-700 text-lg">
            How was your experience?
          </span>
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= rating}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Feedback Box */}
        <div className="w-full">
          <textarea
            className="w-full p-4 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            rows="4"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          className="mt-6 cursor-pointer w-full py-3 font-semibold text-white bg-accent hover:bg-blue-700 rounded-md transition "
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Leave Feedback"}
        </button>

        {/* Optional: Cancel/Skip */}
        <div
          className="mt-4 text-sm text-gray-500 hover:underline cursor-pointer"
          onClick={onClose}
        >
          Maybe later
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
