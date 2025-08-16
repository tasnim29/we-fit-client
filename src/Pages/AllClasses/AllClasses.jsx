import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";
import { Link } from "react-router";
import GlobalLoader from "../Shared/GlobalLoader/GlobalLoader";
import ClassDescription from "./ClassDescription";
import { Helmet } from "react-helmet-async";

const AllClasses = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch] = useDebounce(searchText, 500);
  const axiosInstance = UseAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["public-classes", page, debouncedSearch, sortOrder],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/public/classes?page=${page}&search=${debouncedSearch}&sort=${sortOrder}`
      );
      return res.data;
    },
  });

  if (isLoading) return <GlobalLoader></GlobalLoader>;

  return (
    <div className="max-w-7xl mx-auto py-32 px-4">
      <Helmet>
        <title>WeFit | All-Classes</title>
      </Helmet>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-primary">
        All Classes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-3">
          {/* 🔍 Search bar */}
          <div className="mb-3">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search by class name..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-3.5 text-gray-400 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
                />
              </svg>
            </div>
          </div>
          {/* sorting */}
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 border border-gray-300  shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          >
            <option value="asc">Sort: A → Z</option>
            <option value="desc">Sort: Z → A</option>
          </select>
        </div>

        <div className="md:col-span-9">
          {/* Grid of class cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.classes?.map((cls) => (
              <div
                key={cls._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={cls.image}
                  alt={cls.name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5 flex-grow space-y-2">
                  <h2 className="text-2xl font-bold text-primary">
                    {cls.className}
                  </h2>
                  <ClassDescription details={cls.details} />
                  <p className="text-sm text-gray-500">
                    <strong>Level:</strong> {cls.level}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Category:</strong> {cls.category}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Duration:</strong> {cls.duration}
                  </p>

                  {/* 👥 Trainers */}
                  {cls.trainers?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Trainers:
                      </p>
                      <div className="flex items-center space-x-2">
                        {cls.trainers.map((trainer) => (
                          <Link
                            to={`/trainer-details/${trainer._id}`}
                            key={trainer._id}
                            title={trainer.fullName}
                          >
                            <img
                              src={trainer.image}
                              alt={trainer.fullName}
                              className="w-10 h-10 rounded-full object-cover border-2 border-primary hover:scale-110 transition duration-200"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="text-center mt-12 space-x-2">
        {[...Array(data.totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`px-4 py-2 rounded-full font-semibold ${
              page === idx + 1
                ? "bg-primary text-white shadow"
                : "bg-gray-200 hover:bg-primary hover:text-white transition"
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
