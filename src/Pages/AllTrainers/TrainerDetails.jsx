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
    <div className="max-w-5xl mx-auto px-6 py-32">
      {/* Be A Trainer CTA */}
      <div className="bg-primary text-white p-6 rounded-md text-center mb-12">
        <h2 className="text-2xl font-bold mb-2">Passionate about fitness?</h2>
        <p className="mb-4">Join our growing team of professional trainers!</p>
        <Link
          to="/beTrainer"
          className="btn bg-white text-primary font-semibold hover:bg-gray-200"
        >
          Become a Trainer
        </Link>
      </div>

      {/* Trainer Info Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12 bg-white p-6 rounded shadow">
        <div>
          <img
            src={trainer.image}
            alt={trainer.fullName}
            className="rounded-lg w-full h-[300px] object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{trainer.fullName}</h2>
          <p className="mb-2">
            <strong>Age:</strong> {trainer.age}
          </p>
          <p className="mb-2">
            <strong>Skills:</strong> {trainer.skills.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Available Days:</strong> {trainer.availableDays.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Available Time:</strong> {trainer.availableTime}
          </p>
        </div>
      </div>

      {/* Slots Section */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4 text-center text-primary">
          📅 Available Slots
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {slots.length === 0 ? (
            <p className="text-center col-span-full">
              No slots added by this trainer yet.
            </p>
          ) : (
            slots.map((slot) => (
              <div
                key={slot._id}
                className="border rounded p-4 shadow hover:shadow-lg transition"
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
                  <button className="px-4 py-2 bg-primary text-white cursor-pointer mt-3 w-full">
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
