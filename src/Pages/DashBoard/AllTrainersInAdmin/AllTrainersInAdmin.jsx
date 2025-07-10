import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

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

  if (isLoading) return <p>Loading trainers...</p>;
  if (isError) return <p className="text-red-500">Failed to load trainers.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">All Trainers</h2>

      {trainers.length === 0 ? (
        <p>No trainers found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {trainer.fullName || trainer.name || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {trainer.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {trainer.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() =>
                      handleRevoke(
                        trainer._id,
                        trainer.fullName || trainer.name
                      )
                    }
                    className="text-red-600 hover:text-red-800 font-semibold"
                    disabled={revokeMutation.isPending}
                  >
                    Revoke Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllTrainersInAdmin;
