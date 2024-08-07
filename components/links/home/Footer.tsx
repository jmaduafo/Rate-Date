"use client";
import React, { useState, useRef } from "react";
import GradientCircle from "./GradientCircle";
import { boskaMedium } from "@/fonts/font";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";

function Footer() {
  const [pricingHover, setPricingHover] = useState(false);

  const textRise = useRef(null);

  useGSAP(() => {
    // gsap code here...
    gsap.to(textRise.current, {
      y: -100,
      duration: 3.4,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: textRise.current,
        start: "top bottom",
        end: "bottom top",
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
    <section className="pt-[30vh]">
      <div className="z-[0] translate-y-[8vh]">
        <h2
          ref={textRise}
          className={`${boskaMedium.className} text-[9vw] leading-[1] text-center`}
        >
          ELEVATE YOUR DATING
          <br /> EXPERIENCE TODAY
        </h2>
      </div>
      <div className="overflow-hidden relative flex justify-center items-center w-full rounded-tl-3xl rounded-tr-3xl bg-homeAccent2 h-[90vh] z-[10]">
        <GradientCircle
          classNamePosition="z-[0] top-1/2 left-1/2"
          classNameAnimate="animate-bounceMove3"
        />
        <GradientCircle
          classNamePosition="z-[0] top-1/2 left-1/2"
          classNameAnimate="animate-bounceMove4"
        />
        <motion.div
          variants={appear}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="z-[2]"
        >
          <div className="">
            <h5
              className={`${boskaMedium.className} text-[26px] md:text-[40px] uppercase text-center leading-[1]`}
            >
              Sign up to get started
            </h5>
            <div className="flex justify-center mt-4">
              <Link href="/signup">
                <button className="outline-none border-none tracking-tight bg-homeText text-homeAccent py-2 px-4 rounded-lg flex items-center gap-4">
                  Get Started
                  <ArrowRightIcon className="w-6 " strokeWidth={1} />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2 mt-10">
            <SocialIcon
              fgColor="#FFFFFF"
              bgColor="transparent"
              network="instagram"
              target="_blank"
              url="https://www.instagram.com"
              style={{ width: "40px" }}
            />
            <SocialIcon
              fgColor="#FFFFFF"
              bgColor="transparent"
              network="linkedin"
              target="_blank"
              url="hhttps://www.linkedin.com/in/jasmine-maduafokwa-48070a180/"
              style={{ width: "40px" }}
            />
          </div>
          <div className="flex justify-center mt-1">
            <ul className="flex items-center gap-16">
              <li className="text-[13px] list-none tracking-tight">
                <Link href="/#features">Features</Link>
              </li>
              <li
                className="text-[13px] list-none tracking-tight duration-500"
                onMouseEnter={() => setPricingHover(true)}
                onMouseLeave={() => setPricingHover(false)}
              >
                <a>{pricingHover ? "Coming Soon" : "Pricing"}</a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center mt-[10rem]">
            <p>Elysian &copy; 2024</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Footer;
