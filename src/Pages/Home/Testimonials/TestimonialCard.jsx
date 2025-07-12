import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md w-full text-center flex flex-col items-center">
      {/* User Image */}
      <img
        src={
          item.userImage ||
          "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg"
        }
        alt={item.userName}
        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary"
      />

      {/* Rating */}
      <div className="flex items-center justify-center gap-1 text-yellow-500 mb-2">
        {[...Array(item.rating || 5)].map((_, i) => (
          <FaStar key={i} className="text-sm" />
        ))}
      </div>

      {/* Quote Icon */}
      <FaQuoteLeft className="text-2xl text-primary mb-2" />

      {/* Feedback */}
      <p className="text-gray-600 text-sm mb-4 italic px-2">{item.feedback}</p>

      {/* Divider */}
      <hr className="w-16 border-dotted border-gray-300 mb-3" />

      {/* Name & Email */}
      <div>
        <p className="font-semibold text-black">{item.userName}</p>
        <p className="text-xs text-gray-500">{item.userEmail}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
