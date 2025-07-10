import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEye } from "react-icons/fa";

const ActivityLog = () => {
  const axiosSecure = UseAxiosSecure();
  const [modalData, setModalData] = useState(null);

  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainer-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/trainers/applications");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading applications...</p>;
  if (isError) return <p className="text-red-500">Failed to load data.</p>;

  // Filter only pending or rejected status (backend should do this ideally)
  const filteredApps = applications.filter(
    (app) => app.status === "pending" || app.status === "rejected"
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">
        Trainer Applications Activity Log
      </h2>

      {filteredApps.length === 0 && (
        <p>No pending or rejected applications found.</p>
      )}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                {app.fullName}
              </td>
              <td className="border border-gray-300 px-4 py-2">{app.email}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                {app.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {app.status === "rejected" && (
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="View rejection feedback"
                    onClick={() => setModalData(app)}
                  >
                    <FaEye size={20} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
              onClick={() => setModalData(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Rejection Feedback</h3>
            <p>
              <strong>Name:</strong> {modalData.fullName}
            </p>
            <p>
              <strong>Email:</strong> {modalData.email}
            </p>
            <div className="mt-4 p-4 bg-gray-100 rounded">
              {modalData.feedback ? (
                <p>{modalData.feedback}</p>
              ) : (
                <p className="italic text-gray-500">No feedback provided.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
