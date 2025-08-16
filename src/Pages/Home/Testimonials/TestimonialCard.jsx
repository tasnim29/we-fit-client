import { use } from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const TestimonialCard = ({ item }) => {
  const { theme } = use(AuthContext);
  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      } rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between h-80`}
    >
      <img
        src={
          item.userImage ||
          "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg"
        }
        alt={item.userName}
        className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-primary"
      />

      {/* Stars */}
      <div className="flex items-center gap-1 text-yellow-500 mb-2">
        {[...Array(item.rating || 5)].map((_, i) => (
          <FaStar key={i} className="text-sm" />
        ))}
      </div>

      <FaQuoteLeft
        className={`text-2xl mb-2 ${
          theme === "dark" ? "text-accent" : "text-primary"
        }`}
      />

      <p
        className={`text-sm italic text-center flex-grow px-2 line-clamp-3 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {item.feedback}
      </p>

      <hr
        className={`w-16 border-dotted my-3 ${
          theme === "dark" ? "border-gray-600" : "border-gray-300"
        }`}
      />

      <div className="text-center">
        <p className="font-semibold">{item.userName}</p>
        <p
          className={`text-xs ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {item.userEmail}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
