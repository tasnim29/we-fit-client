import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../Hooks/UseAxios";
import { Link } from "react-router";
import SkeletonLoader from "../../Shared/SkeletonLoader/SkeletonLoader";

const TeamSection = () => {
  const axiosInstance = UseAxios();

  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["team-trainers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trainers/team");
      return res.data;
    },
  });

  if (isLoading) {
    // Show skeletons inside same section layout with heading and grid
    return (
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-10">Meet Our Trainers</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <SkeletonLoader type="team" count={6} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-10">Meet Our Trainers</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-primary 
                         hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 
                         flex flex-col"
            >
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto relative mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <img
                    src={trainer.image}
                    alt={trainer.fullName}
                    className="rounded-full w-full h-full object-cover border-4 border-white"
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {trainer.fullName}
              </h3>

              {/* Bio */}
              <p className="text-sm text-gray-600 mt-2 italic flex-grow">
                {trainer.bio?.length > 100
                  ? trainer.bio.slice(0, 100) + "..."
                  : trainer.bio}
              </p>

              {/* Skills */}
              <div className="mt-5">
                <h4 className="font-medium text-gray-700 text-sm mb-2 uppercase tracking-wide">
                  Areas of Expertise
                </h4>
                <ul className="flex flex-wrap justify-center gap-2 text-sm">
                  {trainer.skills?.map((skill, idx) => (
                    <li
                      key={idx}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full shadow-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Know More Button */}
              <Link
                to={`/trainer-details/${trainer._id}`}
                className="mt-6 block w-full py-2 bg-primary text-white font-semibold rounded-lg
                           hover:bg-primary/90 transition text-center"
              >
                Know more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
