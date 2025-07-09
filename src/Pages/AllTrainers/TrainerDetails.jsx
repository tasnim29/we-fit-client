import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../Hooks/UseAxios";

const TrainerDetails = () => {
  const { id } = useParams();
  const axiosInstance = UseAxios();
  const navigate = useNavigate();

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/approved/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return <p className="text-red-500 text-center py-10">Trainer not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-32 space-y-8">
      {/* Be A Trainer CTA */}
      <div className="bg-primary text-white p-6 rounded-md text-center">
        <h2 className="text-2xl font-bold mb-2">Passionate about fitness?</h2>
        <p className="mb-4">Join our growing team of professional trainers!</p>
        <Link
          to="/beTrainer"
          className="btn bg-white text-primary font-semibold hover:bg-gray-200"
        >
          Become a Trainer
        </Link>
      </div>

      {/* Trainer Info */}
      <div className="bg-white p-6 rounded shadow grid md:grid-cols-2 gap-6 items-start">
        <div>
          <img
            src={trainer.image}
            alt={trainer.fullName}
            className="w-full h-72 object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{trainer.fullName}</h2>
          <p className="text-gray-600 mb-4">
            {trainer.details || "No additional details provided."}
          </p>
          <p>
            <strong>Age:</strong> {trainer.age}
          </p>
          <p>
            <strong>Skills:</strong> {trainer.skills?.join(", ")}
          </p>
          <p>
            <strong>Experience:</strong> {trainer.experience || "2+ years"}
          </p>
          <p>
            <strong>Available Days:</strong> {trainer.availableDays?.join(", ")}
          </p>
          <p>
            <strong>Available Time:</strong> {trainer.availableTime}
          </p>
        </div>
      </div>

      {/* Available Slots */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          📅 Available Slots
        </h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {trainer.availableDays?.map((day, idx) => (
            <button
              key={idx}
              onClick={() =>
                navigate(`/book-trainer/${trainer._id}?day=${day}`)
              }
              className="bg-primary text-white px-4 py-2 rounded hover:bg-black transition"
            >
              {day} - {trainer.availableTime}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
