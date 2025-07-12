import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import About from "./About";
import NewsletterSubscription from "./NewsletterSubscription";
import FeaturedClasses from "./FeaturedClasses";
import Testimonials from "./Testimonials/Testimonials";
import LatestForums from "./LatestForums";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <About></About>
      <FeaturedClasses></FeaturedClasses>
      <Testimonials></Testimonials>
      <LatestForums></LatestForums>
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
