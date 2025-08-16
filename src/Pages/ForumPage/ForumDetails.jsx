import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const ForumDetails = () => {
  const { id } = useParams();
  const { theme } = use(AuthContext);
  const axiosInstance = UseAxios();

  const {
    data: forum,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["forum-details", id],
    queryFn: async () => {
      console.log(id);
      const res = await axiosInstance.get(`/forums/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading)
    return <p className="text-center py-20">Loading forum post...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Error: {error.message}</p>
    );
  if (!forum) return <p className="text-center py-10">Forum post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto py-32 px-4">
      {forum.image && (
        <img
          src={forum.image}
          alt={forum.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}

      <h1
        className={`text-3xl font-bold mb-4 ${
          theme === "dark" ? "text-gray-200" : "text-gray-900"
        }`}
      >
        {forum.title}
      </h1>

      <div
        className={`mb-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        <span className="mr-4">
          By{" "}
          <span
            className={
              theme === "dark"
                ? "text-gray-200 font-medium"
                : "text-gray-800 font-medium"
            }
          >
            {forum.authorName}{" "}
          </span>
          <span
            className={`px-2 py-1 rounded text-[11px] uppercase tracking-wide ${
              forum.role === "admin"
                ? "bg-secondary text-white"
                : "bg-accent text-white"
            }`}
          >
            {forum.role || "No role"}
          </span>
        </span>
        <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          {new Date(forum.createdAt).toLocaleString()}
        </span>
      </div>

      <p
        className={`text-lg whitespace-pre-line ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        {forum.description}
      </p>
    </div>
  );
};

export default ForumDetails;
