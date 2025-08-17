import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const AppliedTrainers = () => {
  const axiosSecure = UseAxiosSecure();
  const { theme } = use(AuthContext);
  const {
    data: applications = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applied/trainers");
      return res.data;
    },
  });

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load trainers.
      </div>
    );

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <Helmet>
        <title>WeFit | Applied Trainers</title>
      </Helmet>

      <h2
        className={`text-2xl sm:text-3xl font-bold mb-10 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Applied Trainers
      </h2>

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
            className={`uppercase text-xs tracking-wider ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <tr>
              <th className="px-5 py-3 border">{`Name`}</th>
              <th className="px-5 py-3 border">{`Email`}</th>
              <th className="px-5 py-3 border">{`Skills`}</th>
              <th className="px-5 py-3 border">{`Status`}</th>
              <th className="px-5 py-3 text-center border">{`Action`}</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-100"
            }`}
          >
            {applications.map((trainer) => (
              <tr
                key={trainer._id}
                className={`transition ${
                  theme === "dark"
                    ? "hover:bg-gray-800 text-gray-300"
                    : "hover:bg-gray-50 text-gray-800"
                }`}
              >
                <td className="px-5 py-4 whitespace-nowrap">
                  {trainer.fullName || "N/A"}
                </td>
                <td className="px-5 py-4 whitespace-nowrap break-all">
                  {trainer.email}
                </td>
                <td className="px-5 py-4 whitespace-normal max-w-xs">
                  {trainer.skills?.join(", ") || "-"}
                </td>
                <td className="px-5 py-4 capitalize whitespace-nowrap">
                  {trainer.status}
                </td>
                <td className="px-5 py-4 text-center whitespace-nowrap">
                  <Link
                    to={`/dashboard/applied-trainers/${trainer._id}`}
                    className={`font-medium underline transition-colors duration-150 ${
                      theme === "dark"
                        ? "text-blue-400 hover:text-blue-300"
                        : "text-blue-600 hover:text-blue-800"
                    }`}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTrainers;
