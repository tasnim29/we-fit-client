import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ type = "card", count = 1 }) => {
  const renderTeamCard = () => (
    <div className="bg-white rounded-xl shadow-xl p-6 border-t-4 border-primary flex flex-col">
      <div className="flex justify-center mb-4">
        <Skeleton circle height={80} width={80} />
      </div>
      <Skeleton height={20} width="70%" className="mx-auto mb-3" />
      <Skeleton count={2} height={14} width="90%" className="mb-2 mx-auto" />
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} height={32} width={64} borderRadius={999} />
        ))}
      </div>
      <Skeleton height={40} width="100%" borderRadius={8} />
    </div>
  );

  const renderClassCard = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Skeleton height={192} width="100%" />
      <div className="p-4">
        <Skeleton height={20} width="60%" className="mb-2" />
        <Skeleton height={14} width="90%" className="mb-2" />
        <Skeleton height={14} width="70%" />
      </div>
    </div>
  );

  const renderForumCard = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col">
      <Skeleton height={192} width="100%" />
      <div className="p-5 flex flex-col flex-1">
        <Skeleton height={20} width="80%" className="mb-2" />
        <Skeleton count={2} height={14} width="100%" className="mb-2" />
        <Skeleton height={12} width="60%" className="mt-auto" />
        <Skeleton height={20} width="40%" className="mt-4" />
      </div>
    </div>
  );

  const renderTestimonialCard = () => (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
      <Skeleton circle height={80} width={80} className="mb-3" />
      <Skeleton height={20} width="50%" className="mb-2" />
      <Skeleton count={2} height={14} width="90%" className="mb-2" />
      <Skeleton height={12} width="50%" className="mb-2" />
      <Skeleton height={20} width="80%" />
    </div>
  );

  const renderByType = {
    team: renderTeamCard,
    class: renderClassCard,
    forum: renderForumCard,
    testimonial: renderTestimonialCard,
    card: renderTeamCard, // default
  };

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="w-full">
          {renderByType[type]?.() || renderByType["card"]()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
