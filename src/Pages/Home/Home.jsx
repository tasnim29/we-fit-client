import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import About from "./About";
import NewsletterSubscription from "./NewsletterSubscription";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <About></About>
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
