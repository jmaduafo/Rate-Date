'use client'
import About from "@/components/links/home/About";
import Features from "@/components/links/home/Features";
import Footer from "@/components/links/home/Footer";
import Hero from "@/components/links/home/Hero";
import Navbar from "@/components/links/home/Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export default async function Index() {
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  return (
   <div className="bg-homeBackground text-homeText">
    <Navbar/>
    <Hero/>
    <About/>
    <Features/>
    <Footer/>
   </div>
  );
}
