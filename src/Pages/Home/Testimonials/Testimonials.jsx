import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "./TestimonialCard";
import UseAxios from "../../../Hooks/UseAxios";
import SkeletonLoader from "../../Shared/SkeletonLoader/SkeletonLoader";

const Testimonials = () => {
  const axiosInstance = UseAxios();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosInstance.get("/reviews");
      return res.data;
    },
  });

  const [cardsPerView, setCardsPerView] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsPerView(3);
      else if (width >= 768) setCardsPerView(2);
      else setCardsPerView(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = testimonials.length;
  const maxIndex = Math.max(total - cardsPerView, 0);

  const next = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // const translateX = -(currentIndex * (100 / cardsPerView));
  const translateX = -(currentIndex * (100 / total)); // smaller steps

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Members Are Saying
          </h2>
          <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
            See how our community experiences the platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonLoader type="testimonial" count={cardsPerView * 2} />
          </div>
        </div>
      </section>
    );
  }

  if (total === 0)
    return <p className="text-center py-10">No reviews available.</p>;

  const centerIndex = currentIndex + Math.floor(cardsPerView / 2);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          What Members Are Saying
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          See how our community experiences the platform
        </p>

        {/* Slider Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${(100 / cardsPerView) * total}%`,
                transform: `translateX(${translateX}%)`,
              }}
            >
              {testimonials.map((item, index) => {
                const isCenter = index === centerIndex;

                return (
                  <div
                    key={item._id}
                    className="p-4"
                    style={{
                      width: `${100 / cardsPerView}%`,
                    }}
                  >
                    <div
                      className={`transition-transform duration-300 ease-in-out ${
                        isCenter
                          ? "scale-105  shadow-xl bg-white"
                          : "opacity-90"
                      }`}
                    >
                      <TestimonialCard item={item} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white shadow hover:bg-primary hover:text-white transition"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-full bg-primary text-white shadow hover:bg-primary/90 transition"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
