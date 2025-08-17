import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import GlobalLoader from "../../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const NewsletterSubscribers = () => {
  const axiosSecure = UseAxiosSecure();
  const { theme } = use(AuthContext);

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
    <div className={`max-w-7xl mx-auto py-10 px-4 `}>
      <Helmet>
        <title>WeFit | All-Subs</title>
      </Helmet>

      <h2
        className={`text-2xl sm:text-3xl font-bold text-center mb-10 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        All Newsletter Subscribers
      </h2>

      {subscribers.length === 0 ? (
        <div
          className={`text-center py-10 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <p className="text-lg">📭 No subscribers found.</p>
          <p className="text-sm mt-1">
            Your newsletter list is currently empty.
          </p>
        </div>
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
                <th className="px-6 py-4 border-b border-gray-200">#</th>
                <th className="px-6 py-4 border-b border-gray-200">Name</th>
                <th className="px-6 py-4 border-b border-gray-200">Email</th>
              </tr>
            </thead>
            <tbody
              className={`divide-y ${
                theme === "dark" ? "divide-gray-700" : "divide-gray-100"
              }`}
            >
              {subscribers.map((sub, index) => (
                <tr
                  key={sub._id}
                  className={`transition ${
                    theme === "dark"
                      ? "hover:bg-gray-800 text-gray-300"
                      : "hover:bg-gray-50 text-gray-800"
                  }`}
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
