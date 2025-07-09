import { useSearchParams, useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

const packages = [
  {
    name: "Basic",
    price: 10,
    benefits: [
      "Access to gym facilities during regular operating hours",
      "Use of cardio and strength training equipment",
      "Access to locker rooms and showers",
    ],
  },
  {
    name: "Standard",
    price: 50,
    benefits: [
      "All benefits of Basic",
      "Access to group fitness classes (Yoga, Zumba, etc.)",
      "Use of sauna or steam room",
    ],
  },
  {
    name: "Premium",
    price: 100,
    benefits: [
      "All benefits of Standard",
      "Access to personal training sessions",
      "Discounts on massage therapy/nutrition counseling",
    ],
  },
];

const TrainerBookedPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSlot = searchParams.get("day");
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState("Basic");

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainerDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/approved/${id}`);
      return res.data;
    },
  });

  const handleJoinNow = () => {
    navigate(
      `/payment?trainer=${id}&package=${selectedPackage}&slot=${selectedSlot}`
    );
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !trainer)
    return <p className="text-red-500 text-center py-10">Trainer not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Trainer Booking Summary
      </h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <p>
          <strong>Trainer Name:</strong> {trainer.fullName}
        </p>
        <p>
          <strong>Selected Slot:</strong> {selectedSlot} -{" "}
          {trainer.availableTime}
        </p>
        <p>
          <strong>Expertise / Class:</strong> {trainer.skills?.join(", ")}
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-center">
        Choose a Membership Package
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            onClick={() => setSelectedPackage(pkg.name)}
            className={`p-6  rounded-xl cursor-pointer shadow hover:shadow-lg transition ${
              selectedPackage === pkg.name
                ? "border border-primary scale-105"
                : "hover:border-gray-300"
            }`}
          >
            <h3 className="text-xl font-bold text-center mb-2">
              {pkg.name} Membership
            </h3>
            <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
              {pkg.benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
            <p className="text-center font-bold text-primary text-lg">
              ${pkg.price}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleJoinNow}
          className="btn bg-primary text-white px-6 py-2 rounded-full hover:bg-black transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default TrainerBookedPage;
