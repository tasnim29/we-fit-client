import { FaSatelliteDish, FaHeadset, FaCreditCard } from "react-icons/fa";
import image3 from "../../assets/Banner/bannerImg-3.jpg";

const features = [
  {
    icon: <FaSatelliteDish size={40} />,
    title: "Real-Time Tracking",
    description:
      "Know exactly where your parcel is — live updates on every step.",
  },
  {
    icon: <FaCreditCard size={40} />,
    title: "Secure Payments",
    description: "End-to-end encrypted Stripe payments for safe transactions.",
  },
  {
    icon: <FaHeadset size={40} />,
    title: "24/7 Support",
    description: "We’re always here — chat or call us anytime.",
  },
];

const Featured = () => {
  return (
    <section className="py-20 ">
      <h2 className="md:text-5xl text-3xl font-bold text-center mb-10 text-primary">
        🚀 Features That Set Us Apart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {features.map((feature) => (
          <div
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative p-8 rounded-2xl border overflow-hidden shadow-md backdrop-blur-md 
    border-blue-100 text-center bg-white/80 transition-all duration-300 group cursor-pointer"
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
              {/* ICON stays the same color */}
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-accent rounded-full">
                {feature.icon}
              </div>

              {/* TEXT turns white on hover */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-white transition duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white transition duration-300">
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
