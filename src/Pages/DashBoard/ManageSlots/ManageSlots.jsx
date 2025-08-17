import { useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";

const ManageSlots = () => {
  const queryClient = useQueryClient();
  const axiosSecure = UseAxiosSecure();
  const { user, theme } = use(AuthContext);

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

  if (isLoading) return <GlobalLoader></GlobalLoader>;
  if (isError) return <p>Error loading slots: {error.message}</p>;

  // for no slots
  if (!slots?.length) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center">
        <div className="inline-block bg-white border border-gray-200 rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Slots Found
          </h2>
          <p className="text-gray-500 mb-4">
            You haven’t created any slots yet. Once you add some, they’ll show
            up here.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076501.png"
            alt="Empty"
            className="mx-auto w-32 opacity-60"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto py-10 px-4`}>
      <Helmet>
        <title>WeFit | Manage Slots</title>
      </Helmet>

      <h2
        className={`text-3xl font-bold text-center mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Manage Your Slots
      </h2>

      <div
        className={`overflow-x-auto rounded-lg shadow border ${
          theme === "dark"
            ? "border-gray-700 bg-gray-800"
            : "border-gray-200 bg-white"
        }`}
      >
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead
            className={`uppercase text-xs tracking-wider ${
              theme === "dark"
                ? "bg-gray-700 text-gray-200"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            <tr>
              <th className="px-6 py-4 border-b border-gray-200">Slot Name</th>
              <th className="px-6 py-4 border-b border-gray-200">Class Name</th>
              <th className="px-6 py-4 border-b border-gray-200">
                Booking Info
              </th>
              <th className="px-6 py-4 border-b border-gray-200 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              theme === "dark" ? "divide-gray-700" : "divide-gray-100"
            }`}
          >
            {slots.map((slot) => (
              <tr
                key={slot._id}
                className={`transition hover:${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <td
                  className={`${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  } px-6 py-4`}
                >
                  {slot.slotName}
                </td>
                <td
                  className={`${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  } px-6 py-4`}
                >
                  {slot.className}
                </td>
                <td
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  } px-6 py-4`}
                >
                  {slot.bookingInfo ? (
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">User:</span>{" "}
                        {slot.bookingInfo.userName} (
                        {slot.bookingInfo.userEmail})
                      </p>
                      <p>
                        <span className="font-medium">Paid:</span> $
                        {slot.bookingInfo.amount}
                      </p>
                      <p>
                        <span className="font-medium">Txn ID:</span>{" "}
                        {slot.bookingInfo.transactionId}
                      </p>
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(slot.bookingInfo.date).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <span className="italic text-gray-400">Not booked</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(slot._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded transition cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlots;
