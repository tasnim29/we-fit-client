import React from "react";
import Slider from "react-slick";
import image1 from "../../assets/Banner/bannerImg-1.jpg";
import image2 from "../../assets/Banner/bannerImg-2.webp";
import image3 from "../../assets/Banner/bannerImg-3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer
               w-12 h-12 flex items-center justify-center rounded-full bg-black/60
               text-white text-3xl hover:bg-secondary transition shadow-lg"
  >
    ❯
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 cursor-pointer
               w-12 h-12 flex items-center justify-center rounded-full bg-black/60
               text-white text-3xl hover:bg-secondary transition shadow-lg"
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
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slides = [
    {
      image: image1,
      heading: "Start Your Fitness Journey",
      subheading: "Set goals, measure progress, and stay motivated",
      buttonText: <Link to="/all-classes">All Classes</Link>,
    },
    {
      image: image2,
      heading: "Join Expert Trainers",
      subheading: "Personalized classes from certified professionals",
      buttonText: <Link to="/all-trainers">All Trainers</Link>,
    },
    {
      image: image3,
      heading: "Connect with the Fit Community",
      subheading: "Share, inspire, and grow together",
      buttonText: "Enjoy",
    },
  ];

  return (
    <div className=" pt-5">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[600px] md:h-[700px] w-full">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover brightness-[0.6] transition-transform duration-[4000ms] ease-linear hover:scale-105"
            />

            {/* Text overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl md:text-6xl font-extrabold mb-4 leading-tight tracking-wide drop-shadow-lg">
                {slide.heading}
              </h2>
              <p className="text-base md:text-xl font-light mb-8 max-w-2xl drop-shadow-sm">
                {slide.subheading}
              </p>
              <button
                className="bg-accent cursor-pointer hover:bg-white hover:text-primary transition-all duration-300
                  px-7 py-3 rounded-lg text-white font-medium text-sm md:text-base shadow-xl
                  hover:scale-105 transform ease-in-out"
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
