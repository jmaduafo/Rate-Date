"use client";
import React from "react";
import About from "./About";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Navbar from "./Navbar";

function Main() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  return (
    <>
      <Navbar/>
      <Hero />
      <About />
      <Features />
      <Footer />
    </>
  );
}

export default Main;
