import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { MessageCirclePlus } from "lucide-react";

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

  if (isLoading) return <GlobalLoader></GlobalLoader>;
  if (isError) return <p className="text-red-500">Failed to load data.</p>;

  // Filter only pending or rejected status (backend should do this ideally)
  const filteredApps = applications.filter(
    (app) => app.status === "pending" || app.status === "rejected"
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 bg-white ">
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
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition"
            >
              &times;
            </button>

            {/* Top Section with Icon */}
            <div className="bg-primary/10 p-6 flex flex-col items-center">
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                <MessageCirclePlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-primary text-center">
                Rejection Feedback
              </h3>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-5">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div className="font-medium">Name:</div>
                <div className="text-gray-800">{modalData.fullName}</div>
                <div className="font-medium">Email:</div>
                <div className="text-gray-800">{modalData.email}</div>
              </div>

              {/* Feedback */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-800 min-h-[80px] flex items-center justify-center">
                {modalData.feedback ? (
                  <p className="whitespace-pre-wrap text-center">
                    {modalData.feedback}
                  </p>
                ) : (
                  <p className="italic text-gray-500 text-center">
                    No feedback provided.
                  </p>
                )}
              </div>

              {/* Optional: Action Buttons can go here if needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
