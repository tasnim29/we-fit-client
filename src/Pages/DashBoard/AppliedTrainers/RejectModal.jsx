import React, { useState } from "react";

const RejectModal = ({ trainer, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return alert("Feedback is required!");
    onSubmit(feedback);
  };

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-md shadow-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Heading */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Reject Trainer Application
        </h3>

        {/* Trainer Info */}
        <div className="text-gray-700 space-y-2 mb-4">
          <p>
            <span className="font-medium">Name:</span> {trainer.fullName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {trainer.email}
          </p>
        </div>

        {/* Feedback */}
        <label className="block mb-1 text-gray-800 font-medium">Feedback</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          rows="4"
          placeholder="Reason for rejection..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="mt-5 w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200"
        >
          Submit Rejection
        </button>
      </div>
    </div>
  );
};

export default RejectModal;
