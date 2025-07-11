import { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import UseAxios from "../../Hooks/UseAxios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

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
      return alert("You must log in to vote");
    }

    try {
      await axiosSecure.patch(`/forums/vote/${id}`, {
        email: user.email,
        voteType: type,
      });
      refetch();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Vote failed");
    }
  };

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Community Forum</h1>

      {data?.forums?.map((forum) => (
        <div key={forum._id} className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold">{forum.title}</h2>
          <p className="text-gray-700 mt-2">{forum.description}</p>

          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <span>
              Posted by: {forum.authorName} ({forum.role})
            </span>
            <span>{new Date(forum.createdAt).toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <button
              onClick={() => handleVote(forum._id, "up")}
              className="flex items-center gap-1 text-green-600 hover:scale-110 transition"
            >
              <ThumbsUp size={20} />
              {forum.upvotes}
            </button>
            <button
              onClick={() => handleVote(forum._id, "down")}
              className="flex items-center gap-1 text-red-500 hover:scale-110 transition"
            >
              <ThumbsDown size={20} />
              {forum.downvotes}
            </button>
          </div>
        </div>
      ))}

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
