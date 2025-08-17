import { use, useState } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const ClassDescription = ({ details }) => {
  const { theme } = use(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Adjust threshold based on your average detail length
  const shouldShowToggle = details.length > 150;

  return (
    <div>
      <p
        className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {details}
      </p>
      {shouldShowToggle && (
        <button
          onClick={toggleExpanded}
          className={`mt-1 text-sm font-medium cursor-pointer ${
            theme === "dark"
              ? "text-blue-400 hover:text-blue-300"
              : "text-primary hover:text-primary/80"
          }`}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ClassDescription;
