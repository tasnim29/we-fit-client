import { FaStar, FaQuoteLeft } from "react-icons/fa";

const TestimonialCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between h-80">
      <img
        src={
          item.userImage ||
          "https://wallpapers.com/images/hd/user-avatar-login-icon-ng092795juuuurfp.jpg"
        }
        alt={item.userName}
        className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-primary"
      />

      <div className="flex items-center gap-1 text-yellow-500 mb-2">
        {[...Array(item.rating || 5)].map((_, i) => (
          <FaStar key={i} className="text-sm" />
        ))}
      </div>

      <FaQuoteLeft className="text-2xl text-primary mb-2" />

      <p className="text-gray-600 text-sm italic text-center flex-grow px-2 line-clamp-3">
        {item.feedback}
      </p>

      <hr className="w-16 border-dotted border-gray-300 my-3" />

      <div className="text-center">
        <p className="font-semibold text-black">{item.userName}</p>
        <p className="text-xs text-gray-500">{item.userEmail}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
