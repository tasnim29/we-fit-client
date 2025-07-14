import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";

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

  if (isLoading) return <GlobalLoader></GlobalLoader>;

  if (isError)
    return <p className="text-red-500">Failed to load subscribers.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm mt-10">
      <Helmet>
        <title>WeFit | All-Subs</title>
      </Helmet>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
        All Newsletter Subscribers
      </h2>

      {subscribers.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-lg">📭 No subscribers found.</p>
          <p className="text-sm mt-1">
            Your newsletter list is currently empty.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b border-gray-200">#</th>
                <th className="px-6 py-4 border-b border-gray-200">Name</th>
                <th className="px-6 py-4 border-b border-gray-200">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((sub, index) => (
                <tr
                  key={sub._id}
                  className="hover:bg-gray-50 transition text-gray-800"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{sub.name}</td>
                  <td className="px-6 py-4">{sub.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterSubscribers;
