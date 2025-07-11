import { useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const ManageSlots = () => {
  const queryClient = useQueryClient();
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);

  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trainer-slots", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/trainer/slots?email=${encodeURIComponent(user.email)}`
      );
      return res.data;
    },
    enabled: !!user.email,
  });

  const handleDelete = (slotId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the slot permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/trainer/slots/${slotId}`);
          Swal.fire("Deleted!", "Slot has been deleted.", "success");
          queryClient.invalidateQueries(["trainer-slots", user.email]);
        } catch (err) {
          console.error("Failed to delete slot", err);
          Swal.fire("Error", "Could not delete slot", "error");
        }
      }
    });
  };

  if (isLoading) return <p>Loading slots...</p>;
  if (isError) return <p>Error loading slots: {error.message}</p>;
  if (!slots?.length) return <p>No slots found.</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Manage Your Slots</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Slot Name</th>
            <th className="border border-gray-300 px-4 py-2">Class Name</th>
            <th className="border border-gray-300 px-4 py-2">Booking Info</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {slot.slotName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {slot.className}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {slot.bookingInfo ? (
                  <div>
                    <p>
                      <strong>User:</strong> {slot.bookingInfo.userName} (
                      {slot.bookingInfo.userEmail})
                    </p>
                    <p>
                      <strong>Paid:</strong> ${slot.bookingInfo.amount}
                    </p>
                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {slot.bookingInfo.transactionId}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(slot.bookingInfo.date).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <span className="italic text-gray-500">Not booked</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(slot._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;
