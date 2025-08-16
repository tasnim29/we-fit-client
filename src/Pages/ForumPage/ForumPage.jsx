import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import UseAxios from "../../Hooks/UseAxios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { Link } from "react-router";
import GlobalLoader from "../Shared/GlobalLoader/GlobalLoader";
import { Helmet } from "react-helmet-async";

import Swal from "sweetalert2";

const ForumPage = () => {
  const [page, setPage] = useState(1);
  const { user } = use(AuthContext);
  const axiosInstance = UseAxios();
  const axiosSecure = UseAxiosSecure();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["public-forums", page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/public/forums?page=${page}`);
      return res.data;
    },
  });

  const handleVote = async (id, type) => {
    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in to vote",
      });
    }

    try {
      await axiosSecure.patch(`/forums/vote/${id}`, {
        email: user.email,
        voteType: type,
      });
      refetch();
      Swal.fire({
        icon: "success",
        title: "Voted!",
        text: "Your vote has been recorded.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Vote failed",
        text: err.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (isLoading) return <GlobalLoader></GlobalLoader>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-32">
      <Helmet>
        <title>WeFit | Forums</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8 text-center">Community Forum</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.forums?.map((forum) => (
          <div
            key={forum._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col"
          >
            {/* Image */}
            {forum.image && (
              <img
                src={forum.image}
                alt={forum.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            {/* Title */}
            <h2 className="text-lg font-bold text-gray-900 line-clamp-2">
              {forum.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 mt-2 text-sm leading-relaxed flex-grow">
              {forum.description.length > 120
                ? `${forum.description.slice(0, 120)}...`
                : forum.description}
            </p>

            {/* Read More */}
            <Link
              to={`/forums/${forum._id}`}
              className="text-primary font-medium mt-2 inline-block hover:underline"
            >
              Read More →
            </Link>

            {/* Footer */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500">
              {/* Author + Role */}
              <span>
                By{" "}
                <span className="font-medium text-gray-800">
                  {forum.authorName}
                </span>{" "}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wide ${
                    forum.role === "admin"
                      ? "bg-secondary text-white"
                      : "bg-accent text-white"
                  }`}
                >
                  {forum.role || "User"}
                </span>
              </span>

              {/* Time */}
              <span>{new Date(forum.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Voting */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleVote(forum._id, "up")}
                className="flex items-center gap-1 text-green-600 hover:scale-110 transition"
              >
                <ThumbsUp size={18} /> {forum.upvotes}
              </button>
              <button
                onClick={() => handleVote(forum._id, "down")}
                className="flex items-center gap-1 text-red-500 hover:scale-110 transition"
              >
                <ThumbsDown size={18} /> {forum.downvotes}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="text-center mt-10 space-x-2">
        {[...Array(data.totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 rounded ${
              page === idx + 1 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
