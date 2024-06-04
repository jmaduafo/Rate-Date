import React from "react";
import { boskaMedium } from "@/fonts/font";
import PrimaryButton from "@/components/PrimaryButton";
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import GradientCircle from "./GradientCircle";

function Hero() {
  return (
    <section className="relative z-[2] h-screen pb-[5vh] flex justify-center items-end">
        <GradientCircle/>
      <div>
        <h1
          className={`${boskaMedium.className} uppercase text-center text-[10vw] leading-[1]`}
        >
          Track your journey,
          <br /> plan your future
        </h1>
        <div className="flex justify-center mt-10">
          <p className="text-[20px] w-[40%] text-center">
            Welcome to Elysian – your personal hub for recording, planning, and
            sharing all your memorable moments. Whether it's a romantic evening
            or a casual meetup, keep track of your experiences and make every
            date count.
          </p>
        </div>
        <div className="flex justify-center gap-6 items-center mt-8">
          <PrimaryButton className="flex gap-5 items-center">
            Sign Up Free
            <ArrowRightIcon strokeWidth={1} className="w-5 text-homeText" />
          </PrimaryButton>
          <button className="bg-homeText50 duration-500 hover:opacity-80 border-none text-darkText rounded-xl py-2 px-5 outline-none">
            View Demo
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <div className="flex justify-center items-center rounded-full w-[100px] h-[100px] border-[1.5px] border-homeText">
            <div className=" animate-bounce">
              <ArrowDownIcon strokeWidth={1} className="w-10 text-homeText" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
