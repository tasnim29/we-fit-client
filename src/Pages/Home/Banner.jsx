import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/Banner/bannerImg-1.jpg";
import image2 from "../../assets/Banner/bannerImg-2.webp";
import image3 from "../../assets/Banner/bannerImg-3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer
               w-12 h-12 md:w-14 md:h-14 flex items-center justify-center
               rounded-full bg-black/70 text-white text-2xl md:text-3xl
               hover:bg-[#a80000] transition duration-300 ease-in-out shadow-lg"
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer
               w-12 h-12 md:w-14 md:h-14 flex items-center justify-center
               rounded-full bg-black/70 text-white text-2xl md:text-3xl
               hover:bg-[#a80000] transition duration-300 ease-in-out shadow-lg"
  >
    ❮
  </div>
);

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slides = [
    {
      image: image1,
      heading: "Track Your Fitness Journey",
      subheading: "Set goals, measure progress, and stay motivated",
      buttonText: "Get Started",
    },
    {
      image: image2,
      heading: "Join Expert Trainers",
      subheading: "Personalized classes from certified professionals",
      buttonText: "Explore Trainers",
    },
    {
      image: image3,
      heading: "Connect with the Fit Community",
      subheading: "Share, inspire, and grow together",
      buttonText: "Join Now",
    },
  ];

  return (
    <div>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[700px]">
            <img
              src={slide.image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70 z-10"></div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl md:text-6xl font-bold mb-4 tracking-wide drop-shadow-lg">
                {slide.heading}
              </h2>
              <p className="text-light md:text-xl font-medium mb-6 max-w-2xl drop-shadow">
                {slide.subheading}
              </p>
              <button
                className="bg-secondary hover:bg-[#f2f2f2] hover:text-black transition-colors duration-300
             px-6 py-2 rounded-full text-white font-semibold text-sm md:text-base shadow-lg
             hover:scale-105 transform cursor-pointer ease-in-out"
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
