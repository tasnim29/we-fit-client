import React from "react";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <div>
        <Navbar isTransparent={isHomePage}></Navbar>
        <main className=" min-h-[calc(100vh-435px)] ">
          <Outlet></Outlet>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
