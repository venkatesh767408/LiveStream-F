import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer";
import Homemain from "../components/Home/Homemain";
import "../index.css";

const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header className="fixed top-0 left-0 w-full z-50" />

        <div className="flex-1 overflow-y-auto mt-[80px]">
          <Homemain />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
