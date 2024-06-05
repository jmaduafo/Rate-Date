import React from "react";
import { boskaMedium } from "@/fonts/font";
import { finalAboutArray } from "@/utils/general/homeAboutCarousel";
import GradientCircle from "./GradientCircle";

function About() {
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
      <div className="relative h-[80vh] flex z-[1] px-10 mt-[14vh]">
        <div className="relative flex-[1] z-[0]">
          <GradientCircle
            classNamePosition="left-1/2 top-[30%]"
            classNameAnimate="animate-bounceMove2"
          />
        </div>
        <div className="flex-[1] flex justify-end">
          <p className="w-[90%] font-light">
            Elysian is designed to enrich your dating life. Easily record,
            schedule future meetups, and explore new ideas for unforgettable
            experiences. With visual charts to track your activity and a vibrant
            community to share your stories, Elysian greatly enhances your
            dating journey. Have any date horror stories to get off your chest?
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
