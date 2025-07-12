import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";

const TrainerDetails = () => {
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
      const res = await axiosInstance.get(`/slots/trainer/${id}`);
      return res.data;
    },
    enabled: !!trainer?._id,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-32 space-y-16">
      {/* Be A Trainer CTA */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-md text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Passionate about fitness?</h2>
        <p className="mb-4">Join our growing team of professional trainers!</p>
        <Link
          to="/beTrainer"
          className="px-5 py-2 rounded-lg bg-white text-primary font-semibold hover:bg-gray-200 transition"
        >
          Become a Trainer
        </Link>
      </div>

      {/* Trainer Info */}
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-xl shadow-md">
        <div>
          <img
            src={trainer.image}
            alt={trainer.fullName}
            className="rounded-xl w-full h-[320px] object-cover shadow"
          />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">
            {trainer.fullName}
          </h2>
          <p className="text-gray-700 text-sm italic">{trainer.bio}</p>
          <p>
            <strong>Age:</strong> {trainer.age}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            <span className="text-primary">{trainer.skills.join(", ")}</span>
          </p>
          <p>
            <strong>Available Days:</strong> {trainer.availableDays.join(", ")}
          </p>
          <p>
            <strong>Available Time:</strong> {trainer.availableTime}
          </p>
        </div>
      </div>

      {/* Slot Section */}
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-6 text-center text-primary">
          📅 Available Slots
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slots.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No slots added by this trainer yet.
            </p>
          ) : (
            slots.map((slot) => (
              <div
                key={slot._id}
                className="border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
              >
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
                <Link
                  to={`/trainer-booking/${trainer._id}?slot=${slot.slotName}`}
                >
                  <button className="mt-4 w-full py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
                    Book Slot
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
