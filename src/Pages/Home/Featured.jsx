import { FaSatelliteDish, FaHeadset, FaCreditCard } from "react-icons/fa";
import image3 from "../../assets/Banner/bannerImg-3.jpg";
import { use } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const features = [
  {
    icon: <FaSatelliteDish size={40} />,
    title: " Goal-Based Smart Booking",
    description:
      "Choose your fitness goal and our system recommends the best class-slot-trainer combo",
  },
  {
    icon: <FaCreditCard size={40} />,
    title: "Secure Payments",
    description: "End-to-end encrypted Stripe payments for safe transactions.",
  },
  {
    icon: <FaHeadset size={40} />,
    title: "Community-Driven Reviews & Forums",
    description:
      "Learn from the community — read reviews, post questions, and share your journey in our active forum space.",
  },
];

const Featured = () => {
  const { theme } = use(AuthContext);
  return (
    <section className="py-20">
      <h2
        className={`md:text-4xl text-3xl font-bold text-center mb-10 
          ${theme === "dark" ? "text-white" : "text-primary"}`}
      >
        Features That Set Us Apart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-2xl border overflow-hidden shadow-md backdrop-blur-md 
              border-blue-100 text-center transition-all duration-300 group cursor-pointer 
              hover:-translate-y-2 hover:shadow-2xl
              ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200 border-gray-700"
                  : "bg-white/80 text-gray-800"
              }`}
          >
            {/* Hover background image */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"
              style={{
                backgroundImage: `url(${image3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }}
            ></div>

            {/* Secondary tint overlay */}
            <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300 rounded-2xl"></div>

            {/* Content */}
            <div className="relative z-20">
              <div
                className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full
                ${
                  theme === "dark"
                    ? "bg-gray-700 text-accent"
                    : "bg-blue-100 text-accent"
                }`}
              >
                {feature.icon}
              </div>

              <h3
                className={`text-xl font-semibold mb-2 group-hover:text-white transition duration-300
                ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
              >
                {feature.title}
              </h3>
              <p
                className={`group-hover:text-white transition duration-300
                ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
