import { useState } from "react";

const ClassDescription = ({ details }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  // Adjust threshold based on your average detail length
  const shouldShowToggle = details.length > 150;

  return (
    <div>
      <p className={`text-gray-600 ${expanded ? "" : "line-clamp-3"}`}>
        {details}
      </p>
      {shouldShowToggle && (
        <button
          onClick={toggleExpanded}
          className="text-primary mt-1 text-sm font-medium cursor-pointer"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
};

export default ClassDescription;
