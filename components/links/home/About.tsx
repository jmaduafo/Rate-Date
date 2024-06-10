'use client'
import React, { useRef } from "react";
import { boskaMedium } from "@/fonts/font";
import { finalAboutArray } from "@/utils/general/homeAboutCarousel";
import GradientCircle from "./GradientCircle";
import Image from "next/image";
import Gif from '@/app/home_gif.gif'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function About() {
  const textRise = useRef(null)

  useGSAP(() => {
    // gsap code here...
    gsap.from(textRise.current,{
      y: 120,
      // duration: 3,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: textRise.current,
        start: 'top 140%',
        end: 'bottom 10%',
        scrub: true,
        markers: true
      }
    }); // <-- automatically reverted

  }, []);

  return (
    <section className="mt-[30vh]">
      <div className="overflow-hidden z-[20]">
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
      </div>
      <div className="relative flex z-[1] px-10 my-[14vh]">
        <div className="relative object-cover flex-[1] z-[0] flex justify-center">
          {/* <GradientCircle
            classNamePosition="left-1/2 top-[30%]"
            classNameAnimate="animate-bounceMove2"
          /> */}
          <Image src={Gif} alt='couple on a date' className="w-[80%]"/>
        </div>
        <div className="flex-[1] flex justify-end" ref={textRise}>
          <p className="w-[90%] font-light">
            Elysian is designed to enrich your dating life. Easily record,
            schedule future meetups, and explore new ideas for unforgettable
            experiences. With visual charts to track your activity and a vibrant
            community to share your stories, Elysian greatly enhances your
            dating journey. Have any date successes or even date horror stories to get off your chest?
            Share and advise others on what to look out for in the dating scene.
            Use Elysian as your venting space, your personal journal, or to
            advance your status as a dating coach.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
