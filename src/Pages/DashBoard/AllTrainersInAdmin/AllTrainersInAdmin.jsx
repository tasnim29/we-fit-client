import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";

const AllTrainersInAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all trainers
  const {
    data: trainers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/trainers");
      return res.data;
    },
  });

  // ✅ Revoke trainer role mutation (v5 syntax)
  const revokeMutation = useMutation({
    mutationFn: async (trainerId) => {
      const res = await axiosSecure.patch(
        `/admin/trainers/${trainerId}/revoke`
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Revoke response:", data);
      if (data.userModified > 0 || data.trainerModified > 0) {
        Swal.fire("Success", "Trainer role revoked successfully", "success");
        queryClient.invalidateQueries({ queryKey: ["all-trainers"] });
      } else {
        Swal.fire("Error", "No change made to the trainer role", "error");
      }
    },

    onError: () => {
      Swal.fire("Error", "Something went wrong while revoking", "error");
    },
  });

  // 🔘 Handle revoke click
  const handleRevoke = (trainerId, trainerName) => {
    Swal.fire({
      title: `Revoke ${trainerName}'s Trainer Role?`,
      text: "This action will downgrade their role to member.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, revoke",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        revokeMutation.mutate(trainerId);
      }
    });
  };

  if (isLoading) return <GlobalLoader></GlobalLoader>;

  if (isError) return <p className="text-red-500">Failed to load trainers.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Helmet>
        <title>WeFit | All-Trainers</title>
      </Helmet>
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">
        All Trainers
      </h2>

      {trainers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No trainers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr
                  key={trainer._id}
                  className="text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                    {trainer.fullName || trainer.name || "N/A"}
                  </td>
                  <td className="border border-gray-200 px-6 py-4 whitespace-nowrap break-all">
                    {trainer.email}
                  </td>
                  <td className="border border-gray-200 px-6 py-4 capitalize whitespace-nowrap">
                    {trainer.role}
                  </td>
                  <td className="border border-gray-200 px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        handleRevoke(
                          trainer._id,
                          trainer.fullName || trainer.name
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded transition cursor-pointer"
                      disabled={revokeMutation.isPending}
                    >
                      Revoke Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTrainersInAdmin;
