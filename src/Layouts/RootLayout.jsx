import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
        <main className=" min-h-[calc(100vh-435px)] ">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
