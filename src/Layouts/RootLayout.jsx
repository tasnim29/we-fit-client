import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <div>
        <Navbar isTransparent></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
