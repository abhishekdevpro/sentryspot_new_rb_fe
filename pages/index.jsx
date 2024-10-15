import React, {  } from "react";
import Builder from "./builder";
import Loder from './Loder'
import Home_first from "./Home/Home_first";
import FAQ from "./Home/FAQ/FAQ_Component";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const ResumeBuilder = () => {
  return (
    <>
    {/* <Builder /> */}
    <Navbar/>
    <Home_first/>
    <FAQ/>
   {/* <Loder/> */}
    <Footer/>
    </>
  );
};

export default ResumeBuilder;

