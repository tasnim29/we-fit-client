import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

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
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <Helmet>
        <title>WeFit | Activity-log</title>
      </Helmet>
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
        Trainer Applications Activity Log
      </h2>

      {filteredApps.length === 0 ? (
        <p className="text-center text-gray-600">
          No pending or rejected applications found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition-colors duration-150 text-gray-800"
                >
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap">
                    {app.fullName}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 whitespace-nowrap break-all">
                    {app.email}
                  </td>
                  <td className="px-6 py-4 border border-gray-200 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        app.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border border-gray-200 text-center">
                    {app.status === "rejected" && (
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
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
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl max-w-lg w-full relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold transition"
              onClick={() => setModalData(null)}
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              Rejection Feedback
            </h3>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-medium">Name:</span> {modalData.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {modalData.email}
              </p>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border text-gray-800">
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
