import {
  FaCogs,
  FaUsers,
  FaHeartbeat,
  FaRocket,
  FaClock,
} from "react-icons/fa";
import image3 from "../../assets/aboutBg.png";

const features = [
  {
    id: 1,
    icon: FaCogs,
    title: "Innovative Tech",
    subtitle: "Empowering Fitness",
  },
  {
    id: 2,
    icon: FaUsers,
    title: "Community",
    subtitle: "Support & Motivation",
  },

  {
    id: 3,
    icon: FaHeartbeat,
    title: "Health Focus",
    subtitle: "Active Lifestyles",
  },
  {
    id: 4,
    icon: FaRocket,
    title: "Cutting Edge",
    subtitle: "Fitness Solutions",
  },
];

const About = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${image3})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-12 z-10">
        {/* Left content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6 text-gray-100">
          <h2 className="text-6xl font-bold text-white">About Our Company</h2>
          <p className="text-lg text-light max-w-lg mx-auto md:mx-0">
            Our company is at the forefront of revolutionizing the fitness
            industry. We are dedicated to providing innovative solutions that
            empower individuals to lead healthier, more active lifestyles.
          </p>
          <p className="text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
            Combining cutting-edge technology with a passion for fitness, we
            strive to create a community-driven platform that inspires,
            motivates, and supports our users on their wellness journey.
          </p>
        </div>

        {/* Right features */}
        <div className="md:w-1/2 grid grid-cols-2 gap-8 ">
          {features.map(({ id, icon: Icon, title, subtitle }) => (
            <div
              key={id}
              className="flex bg-white hover:text-light flex-col items-center p-6 rounded-lg shadow-lg cursor-pointer transition hover:bg-secondary/50 group "
            >
              <Icon className="mb-4 w-10 h-10 text-accent" />
              <h3 className="text-lg font-semibold text-center text-secondary group-hover:text-light">
                {title}
              </h3>
              {subtitle && (
                <p className="text-center mt-1 text-sm text-light">
                  {subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
