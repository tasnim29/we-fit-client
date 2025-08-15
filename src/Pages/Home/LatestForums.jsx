import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";
import SkeletonLoader from "../Shared/SkeletonLoader/SkeletonLoader";

const LatestForums = () => {
  const axiosInstance = UseAxios();

  const { data: forums = [], isLoading } = useQuery({
    queryKey: ["latest-forums"],
    queryFn: async () => {
      const res = await axiosInstance.get("/forums/latest");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Latest Community Posts
          </h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <SkeletonLoader type="forum" count={6} />
          </div>
        </div>
      </section>
    );
  }
  if (!forums.length)
    return <p className="text-center py-10">No community posts found.</p>;

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          Latest Community Posts
        </h2>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {forums.map((forum) => (
            <div
              key={forum._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-300 "
            >
              {forum.image && (
                <img
                  src={forum.image}
                  alt={forum.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{forum.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {forum.description}
                </p>

                <p className="text-xs text-gray-500 mt-auto flex items-center gap-2 flex-wrap">
                  By{" "}
                  <span className="font-medium text-gray-700">
                    {forum.authorName}
                  </span>
                  <span
                    className={`text-black px-2 py-1 rounded ${
                      forum.role === "admin"
                        ? "bg-secondary text-white"
                        : "bg-accent text-white"
                    }`}
                  >
                    {forum.role || "No role"}
                  </span>
                  — {new Date(forum.createdAt).toLocaleDateString()}
                </p>

                <Link
                  to={`/forums/${forum._id}`}
                  className="mt-4 inline-block text-primary font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestForums;
