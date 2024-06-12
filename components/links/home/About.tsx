"use client";
import React, { useRef } from "react";
import { boskaMedium } from "@/fonts/font";
import { finalAboutArray } from "@/utils/general/homeAboutCarousel";
import GradientCircle from "./GradientCircle";
import Image from "next/image";
import Gif from "@/app/home_gif.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";

function About() {
  const textRise = useRef(null);

  useGSAP(() => {
    // gsap code here...
    gsap.from(textRise.current, {
      y: 120,
      // duration: 3,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: textRise.current,
        start: "top 140%",
        end: "bottom 10%",
        scrub: true,
      },
    }); // <-- automatically reverted
  }, []);

  const appear = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <section className="mt-[10vh] md:mt-[30vh]">
      <motion.div
        className="overflow-hidden z-[20]"
        variants={appear}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="flex gap-4">
          {finalAboutArray.map((el) => {
            return (
              <h2
                key={el.id}
                className={`${boskaMedium.className} text-homeText70 animate-slide1 uppercase whitespace-nowrap text-[9vw] leading-[1] 
                    `}
              >
                {el.text}
              </h2>
            );
          })}
        </div>
        <div className="flex gap-4">
          {finalAboutArray.map((el) => {
            return (
              <h2
                key={el.id}
                className={`text-homeBackground textBlock font-bold animate-slide2 uppercase whitespace-nowrap text-[9vw] leading-[1]
                `}
              >
                {el.text}
              </h2>
            );
          })}
        </div>
        <div className="flex gap-4 z-[20]">
          {finalAboutArray.map((el) => {
            return (
              <h2
                key={el.id}
                className={`${boskaMedium.className} text-homeText70 animate-slide1 uppercase whitespace-nowrap text-[9vw] leading-[1] 
                    `}
              >
                {el.text}
              </h2>
            );
          })}
        </div>
      </motion.div>
      <div className="relative flex flex-col sm:flex-row z-[1] px-10 my-[14vh]">
        <div className="relative object-cover flex-[1] z-[0] flex justify-center">
          <Image src={Gif} alt="couple on a date" className="w-[80%]" />
        </div>
        <div className="flex-[1] flex justify-center sm:justify-end" ref={textRise}>
          <p className="w-[90%] font-light text-center sm:text-left">
            Elysian is designed to enrich your dating life. Easily record,
            schedule future meetups, and explore new ideas for unforgettable
            experiences. With visual charts to track your activity and a vibrant
            community to share your stories, Elysian greatly enhances your
            dating journey. Have any date successes or even date horror stories
            to get off your chest? Share and advise others on what to look out
            for in the dating scene. Use Elysian as your venting space, your
            personal journal, or to advance your status as a dating coach.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
