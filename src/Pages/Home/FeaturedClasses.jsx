import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";
import SkeletonLoader from "../Shared/SkeletonLoader/SkeletonLoader";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const FeaturedClasses = () => {
  const { theme } = use(AuthContext);
  const axiosInstance = UseAxios();
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["featured-classes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/featured-classes");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-14 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-primary">
          🔥 Featured Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkeletonLoader type="class" count={6} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 max-w-7xl mx-auto px-4">
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          theme === "dark" ? "text-light" : "text-primary"
        }`}
      >
        Featured Classes
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className={`p-5 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <img
              src={cls.image || "/default-class.jpg"}
              alt={cls.className}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="p-5">
              <h3
                className={`text-xl font-bold mb-2 ${
                  theme === "dark" ? "text-light" : "text-gray-800"
                }`}
              >
                {cls.className}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {cls.details?.slice(0, 90)}...
              </p>
              <p
                className={`font-semibold ${
                  theme === "dark" ? "text-accent" : "text-primary"
                }`}
              >
                Total Bookings: {cls.bookingCount || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedClasses;
