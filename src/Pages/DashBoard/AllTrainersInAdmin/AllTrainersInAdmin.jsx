import React, { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const AllTrainersInAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { theme } = use(AuthContext);

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
    <div className={`max-w-7xl mx-auto py-10 px-4`}>
      <Helmet>
        <title>WeFit | All-Trainers</title>
      </Helmet>

      <h2
        className={`text-3xl font-bold mb-10 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        All Trainers
      </h2>

      {trainers.length === 0 ? (
        <p
          className={`text-center text-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          No trainers found.
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
              className={`uppercase text-xs tracking-wider ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-300"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <tr>
                <th className="px-6 py-3 border-b">Name</th>
                <th className="px-6 py-3 border-b">Email</th>
                <th className="px-6 py-3 border-b">Role</th>
                <th className="px-6 py-3 text-center border-b">Action</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                theme === "dark" ? "divide-gray-700" : "divide-gray-100"
              }`}
            >
              {trainers.map((trainer) => (
                <tr
                  key={trainer._id}
                  className={`transition ${
                    theme === "dark"
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trainer.fullName || trainer.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap break-all">
                    {trainer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {trainer.role}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        handleRevoke(
                          trainer._id,
                          trainer.fullName || trainer.name
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
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
