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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applied Trainers</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Skills</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((trainer) => (
              <tr key={trainer._id} className="border-t">
                <td className="p-2">{trainer.fullName}</td>
                <td className="p-2">{trainer.email}</td>
                <td className="p-2">{trainer.skills?.join(", ")}</td>
                <td className="p-2 capitalize">{trainer.status}</td>
                <td className="p-2">
                  <Link
                    to={`/dashboard/applied-trainers/${trainer._id}`}
                    className="text-blue-600 underline"
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
