import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../Hooks/UseAxios";
import { Link } from "react-router";

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
    return <p className="text-center py-20">Loading team...</p>;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Meet Our Trainers</h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-10">
          {trainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-primary hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-28 h-28 mx-auto relative mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <img
                    src={trainer.image}
                    alt={trainer.fullName}
                    className="rounded-full w-full h-full object-cover border-4 border-white"
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-4">
                {trainer.fullName}
              </h3>

              <p className="text-sm text-gray-600 mt-2 italic">
                {trainer.bio?.length > 100
                  ? trainer.bio.slice(0, 100) + "..."
                  : trainer.bio}
              </p>

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
                <div className="w-full py-2 bg-primary text-light font-semibold my-5 rounded-lg cursor-pointer">
                  <Link to={`/trainer-details/${trainer._id}`}>Know more </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
