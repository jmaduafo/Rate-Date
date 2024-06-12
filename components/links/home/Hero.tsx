import React from "react";
import { boskaMedium } from "@/fonts/font";
import PrimaryButton from "@/components/PrimaryButton";
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import GradientCircle from "./GradientCircle";
import Link from "next/link";
import { motion } from "framer-motion";

function Hero() {
  const firstLine = "Track your journey,";
  const secondLine = "plan your future";

  const arise = {
    initial: {
      y: 200,
    },
    animate: {
      y: 0,
    },
  };

  const textAppear = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const leftButtonAppear = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.4,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const rightButtonAppear = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.45,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  const arrowAppear = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.5,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <section className="relative z-[2] h-screen pb-[5vh] flex justify-center items-center md:items-end">
      <GradientCircle classNameAnimate="animate-bounceMove3" />
      {/* <GradientCircle classNameAnimate="animate-bounceMove4"/> */}
      <div>
        <div className="flex items-center justify-center gap-2 md:gap-6 overflow-hidden">
          {firstLine.split(" ").map((el, i) => {
            return (
              <motion.h1
                key={`${el}_${i}`}
                variants={arise}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1.5,
                  ease: [0.83, 0, 0.17, 1],
                  delay: i * 0.06,
                }}
                className={`${boskaMedium.className} uppercase text-[10vw] leading-[1.1]`}
              >
                {el}
              </motion.h1>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-6 overflow-hidden">
          {secondLine.split(" ").map((el, i) => {
            return (
              <motion.h1
                key={`${el}_${i}`}
                className={`${boskaMedium.className} uppercase text-[10vw] leading-[1]`}
                variants={arise}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 1.5,
                  ease: [0.83, 0, 0.17, 1],
                  delay: (i + .3) * 0.08,
                }}
              >
                {el}
              </motion.h1>
            );
          })}
        </div>
        <motion.div
          variants={textAppear}
          initial="initial"
          animate="animate"
          className="flex justify-center mt-10"
        >
          <p className="text-[15px] md:text-[20px] w-[80%] md:w-[40%] text-center">
            Welcome to Elysian – your personal hub for recording, planning, and
            sharing all your memorable moments. Whether it's a romantic evening
            or a casual meetup, keep track of your experiences and make every
            date count.
          </p>
        </motion.div>
        <div className="flex justify-center gap-6 items-center mt-8">
          <motion.div
            variants={leftButtonAppear}
            initial="initial"
            animate="animate"
          >
            <Link href="/signup">
              <PrimaryButton className="flex gap-5 items-center">
                Sign Up Free
                <ArrowRightIcon strokeWidth={1} className="w-5 text-homeText" />
              </PrimaryButton>
            </Link>
          </motion.div>
          <motion.button
            variants={rightButtonAppear}
            initial="initial"
            animate="animate"
            className="bg-homeText50 duration-500 hover:opacity-80 border-none text-darkText rounded-xl py-2 px-5 outline-none"
          >
            View Demo
          </motion.button>
        </div>
        <motion.div
          className="flex justify-center mt-8"
          variants={arrowAppear}
          initial="initial"
          animate="animate"
        >
          <div className="flex justify-center items-center rounded-full w-[60px] h-[60px] md:w-[100px] md:h-[100px] border-[1.5px] border-homeText">
            <div className=" animate-bounce">
              <ArrowDownIcon strokeWidth={1} className="w-6 md:w-10 text-homeText" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
