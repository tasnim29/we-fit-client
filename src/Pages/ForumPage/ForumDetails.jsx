import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";

const ForumDetails = () => {
  const { id } = useParams();
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
      <h1 className="text-3xl font-bold mb-4">{forum.title}</h1>
      <div className="text-gray-600 mb-4">
        <span className="mr-4">
          By {forum.authorName}{" "}
          <span
            className={`text-black px-2 py-1 rounded ${
              forum.role === "admin"
                ? "bg-secondary text-white"
                : "bg-accent text-white"
            }`}
          >
            {forum.role || "No role"}
          </span>
        </span>
        <span>{new Date(forum.createdAt).toLocaleString()}</span>
      </div>
      <p className="text-gray-800 text-lg whitespace-pre-line">
        {forum.description}
      </p>
    </div>
  );
};

export default ForumDetails;
