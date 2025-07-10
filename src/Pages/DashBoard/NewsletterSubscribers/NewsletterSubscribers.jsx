import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const NewsletterSubscribers = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: subscribers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/newsletter-subscribers");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading subscribers...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load subscribers.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-3xl font-bold mb-6">All Newsletter Subscribers</h2>

      {subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr key={sub._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">{sub.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {sub.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsletterSubscribers;
