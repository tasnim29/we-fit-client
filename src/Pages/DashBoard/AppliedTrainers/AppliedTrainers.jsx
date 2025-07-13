import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AppliedTrainers = () => {
  const axiosSecure = UseAxiosSecure();
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
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Applied Trainers
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                Name
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                Email
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                Skills
              </th>
              <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">
                Status
              </th>
              <th className="px-5 py-3 text-center text-sm font-semibold text-gray-700 border border-gray-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((trainer) => (
              <tr
                key={trainer._id}
                className="border-t border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors duration-150"
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
                    className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors duration-150"
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
