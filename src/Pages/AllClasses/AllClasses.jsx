import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const AllClasses = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["public-classes", page],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/public/classes?page=${page}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-24 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">All Classes</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.classes?.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-lg shadow-lg p-5 space-y-3"
          >
            <img
              src={cls.image}
              alt={cls.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold">{cls.name}</h2>
            <p>{cls.details}</p>
            <p>
              <strong>Level:</strong> {cls.level}
            </p>
            <p>
              <strong>Category:</strong> {cls.category}
            </p>
            <p>
              <strong>Duration:</strong> {cls.duration}
            </p>

            <div>
              <strong>Trainers:</strong>
              <div className="flex space-x-2 mt-2">
                {cls.trainers?.map((trainer) => (
                  <Link
                    to={`/trainer-details/${trainer._id}`}
                    key={trainer._id}
                  >
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-10 h-10 rounded-full object-cover border hover:scale-110 transition"
                      title={trainer.fullName}
                    />
                    <span className="text-center font-semibold">
                      {trainer.fullName}
                    </span>
                  </Link>
                ))}
              </div>
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

export default AllClasses;
