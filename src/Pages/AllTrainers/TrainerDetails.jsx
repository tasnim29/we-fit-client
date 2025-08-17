import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";
import UseUserRole from "../../Hooks/UseUserRole";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const TrainerDetails = () => {
  const { theme } = use(AuthContext);
  const { role } = UseUserRole();
  // console.log(role);
  const { id } = useParams();
  const axiosInstance = UseAxios();

  const { data: trainer, isLoading } = useQuery({
    queryKey: ["trainer-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/approved/${id}`);
      return res.data;
    },
  });

  const { data: slots = [] } = useQuery({
    queryKey: ["trainer-slots", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/public/slots/trainer/${id}`);
      return res.data;
    },
    enabled: !!trainer?._id,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  const bgClass = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textClass = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const subTextClass = theme === "dark" ? "text-gray-400" : "text-gray-700";
  const borderClass = theme === "dark" ? "border-gray-700" : "border-gray-200";

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 space-y-16">
      {/* Be A Trainer CTA */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-md text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Passionate about fitness?</h2>
        <p className="mb-4">Join our growing team of professional trainers!</p>
        <Link
          to="/beTrainer"
          className="px-5 py-2 rounded-lg border-2 border-light font-semibold hover:bg-light hover:text-primary transition"
        >
          Become a Trainer
        </Link>
      </div>

      {/* Trainer Info */}
      <div
        className={`grid md:grid-cols-2 gap-8 items-center p-8 rounded-xl shadow-md ${bgClass}`}
      >
        <div>
          <img
            src={trainer.image}
            alt={trainer.fullName}
            className="rounded-xl w-full h-[320px] object-cover shadow"
          />
        </div>
        <div className="space-y-3">
          <h2 className={`text-3xl font-bold ${textClass}`}>
            {trainer.fullName}
          </h2>
          <p className={`text-sm italic ${subTextClass}`}>{trainer.bio}</p>
          <p>
            <strong>Age:</strong>{" "}
            <span className={textClass}>{trainer.age}</span>
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            <span
              className={`${theme === "dark" ? "text-white" : "text-class"}`}
            >
              {trainer.skills.join(", ")}
            </span>
          </p>
          <p>
            <strong>Available Days:</strong>{" "}
            <span className={textClass}>
              {trainer.availableDays.join(", ")}
            </span>
          </p>
          <p>
            <strong>Available Time:</strong>{" "}
            <span className={textClass}>{trainer.availableTime}</span>
          </p>
        </div>
      </div>

      {/* Slot Section */}
      <div className={`p-8 rounded-xl shadow-md ${bgClass}`}>
        <h3
          className={`text-2xl font-semibold mb-6 text-center ${
            theme === "dark" ? "text-white" : "text-primary"
          }`}
        >
          📅 Available Slots
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.length === 0 ? (
            <p className={`text-center col-span-full ${subTextClass}`}>
              No slots added by this trainer yet.
            </p>
          ) : (
            slots.map((slot) => (
              <div
                key={slot._id}
                className={`border ${borderClass} rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col`}
              >
                <div className="flex-1 space-y-2">
                  <p>
                    <strong>Slot Name:</strong> {slot.slotName}
                  </p>
                  <p>
                    <strong>Time:</strong> {slot.slotTime}
                  </p>
                  <p>
                    <strong>Days:</strong> {slot.days.join(", ")}
                  </p>
                  <p>
                    <strong>Class:</strong> {slot.className}
                  </p>
                </div>

                {role === "trainer" ? (
                  <div
                    className="mt-auto w-full text-center py-2 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
                    title="Trainers cannot book slots"
                  >
                    Book Slot
                  </div>
                ) : (
                  <Link
                    to={`/trainer-booking/${trainer._id}?slot=${slot.slotName}`}
                    className=" w-full block text-center py-2 rounded bg-accent mt-3 text-white  transition duration-300 hover:scale-105"
                  >
                    Book Slot
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
