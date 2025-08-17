import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { MessageCirclePlus } from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const ActivityLog = () => {
  const { theme } = use(AuthContext);
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
    <div className={`max-w-7xl mx-auto py-10 px-4`}>
      <Helmet>
        <title>WeFit | Activity-log</title>
      </Helmet>

      <h2
        className={`text-3xl font-extrabold mb-8 text-center ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Trainer Applications Activity Log
      </h2>

      {filteredApps.length === 0 ? (
        <p
          className={`${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          } text-center`}
        >
          No pending or rejected applications found.
        </p>
      ) : (
        <div
          className={`overflow-x-auto rounded-lg border ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <table
            className={`min-w-full text-sm text-left whitespace-nowrap ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <thead
              className={`bg-gray-100 uppercase text-xs tracking-wider ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <tr>
                <th className="px-6 py-3 border-b border-gray-200">Name</th>
                <th className="px-6 py-3 border-b border-gray-200">Email</th>
                <th className="px-6 py-3 border-b border-gray-200">Status</th>
                <th className="px-6 py-3 border-b border-gray-200 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody
              className={`${
                theme === "dark" ? "divide-gray-700" : "divide-gray-100"
              } divide-y`}
            >
              {filteredApps.map((app) => (
                <tr
                  key={app._id}
                  className={`transition ${
                    theme === "dark"
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <td className="px-6 py-4 border-b whitespace-nowrap">
                    {app.fullName}
                  </td>
                  <td className="px-6 py-4 border-b break-all">{app.email}</td>
                  <td className="px-6 py-4 border-b capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        app.status === "rejected"
                          ? theme === "dark"
                            ? "bg-red-800 text-red-400"
                            : "bg-red-100 text-red-600"
                          : theme === "dark"
                          ? "bg-yellow-800 text-yellow-400"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 border-b text-center">
                    {app.status === "rejected" && (
                      <button
                        className={`transition ${
                          theme === "dark"
                            ? "text-blue-400 hover:text-blue-200"
                            : "text-blue-600 hover:text-blue-800"
                        }`}
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
          <div
            className={`rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalData(null)}
              className={`absolute top-4 right-4 text-3xl font-bold transition ${
                theme === "dark"
                  ? "text-gray-400 hover:text-red-400"
                  : "text-gray-400 hover:text-red-500"
              }`}
            >
              &times;
            </button>

            {/* Top Section with Icon */}
            <div
              className={`p-6 flex flex-col items-center ${
                theme === "dark" ? "bg-primary/20" : "bg-primary/10"
              }`}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md">
                <MessageCirclePlus className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-center text-primary`}>
                Rejection Feedback
              </h3>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-5">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 font-medium"
                      : "font-medium"
                  }`}
                >
                  Name:
                </div>
                <div
                  className={`${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {modalData.fullName}
                </div>
                <div
                  className={`${
                    theme === "dark"
                      ? "text-gray-300 font-medium"
                      : "font-medium"
                  }`}
                >
                  Email:
                </div>
                <div
                  className={`${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {modalData.email}
                </div>
              </div>

              {/* Feedback */}
              <div
                className={`rounded-xl p-4 min-h-[80px] flex items-center justify-center border ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-300"
                    : "bg-gray-50 border-gray-200 text-gray-800"
                }`}
              >
                {modalData.feedback ? (
                  <p className="whitespace-pre-wrap text-center">
                    {modalData.feedback}
                  </p>
                ) : (
                  <p className="italic text-center text-gray-500">
                    No feedback provided.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;
