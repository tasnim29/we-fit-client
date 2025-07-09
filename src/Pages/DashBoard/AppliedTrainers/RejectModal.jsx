import React, { useState } from "react";

const RejectModal = ({ trainer, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) return alert("Feedback is required!");
    onSubmit(feedback);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 text-xl font-bold"
        >
          ✕
        </button>
        <h3 className="text-lg font-semibold mb-4">
          Reject Trainer Application
        </h3>

        <p>
          <strong>Name:</strong> {trainer.fullName}
        </p>
        <p>
          <strong>Email:</strong> {trainer.email}
        </p>

        <label className="block mt-4 mb-1 font-medium">Feedback</label>
        <textarea
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="Reason for rejection..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Submit Rejection
        </button>
      </div>
    </div>
  );
};

export default RejectModal;
