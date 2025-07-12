import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

import TestimonialCard from "./TestimonialCard";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const Testimonials = () => {
  const axiosSecure = UseAxiosSecure();
  const [current, setCurrent] = useState(0);

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews"); // ✅ no trainerId
      return res.data;
    },
  });

  const total = testimonials.length;
  const cardWidth = 320;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  if (isLoading) return <p className="text-center py-10">Loading reviews...</p>;
  if (total === 0)
    return <p className="text-center py-10">No reviews available.</p>;

  return (
    <section className="pb-16 text-center">
      {/* <img
        src={headingImg}
        alt="Quote Icon"
        className="mx-auto mb-4 w-60 h-24"
      /> */}
      <h2 className="text-3xl font-bold mb-2">What our members are saying</h2>
      <p className="text-gray-500 mb-10 max-w-3xl mx-auto">
        Real feedback from members who have experienced our platform.
      </p>

      {/* Carousel */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ width: cardWidth * 3 }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${cardWidth * total}px`,
            transform: `translateX(${-current * cardWidth + cardWidth}px)`,
          }}
        >
          {testimonials.map((item, index) => {
            const prevIndex = (current - 1 + total) % total;
            const nextIndex = (current + 1) % total;

            // Only show current, prev, and next
            if (
              index !== current &&
              index !== prevIndex &&
              index !== nextIndex
            ) {
              return (
                <div
                  key={item._id}
                  className="flex-shrink-0 w-[320px] px-2 invisible"
                />
              );
            }

            // Optional: emphasize the center card slightly
            const scale = index === current ? 1.05 : 1;
            const shadow = index === current ? "shadow-lg" : "shadow";

            return (
              <div
                key={item._id}
                className={`flex-shrink-0 w-[320px] px-2 transition-all duration-500 ease-in-out ${shadow}`}
                style={{ transform: `scale(${scale})` }}
              >
                <TestimonialCard item={item} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-3 cursor-pointer rounded-full text-black font-bold bg-white hover:text-white"
        >
          <FaArrowLeft />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === current ? "bg-primary" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
        <button
          onClick={next}
          className="p-3 cursor-pointer rounded-full text-black font-bold bg-primary hover:text-white"
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
