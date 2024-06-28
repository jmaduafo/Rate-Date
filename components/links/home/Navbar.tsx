"use client";
import React, { useState } from "react";
import Logo from "@/app/elysian_logo.png";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import { boskaMedium, boskaRegular } from "@/fonts/font";
import { motion } from "framer-motion";

function Navbar() {
  const [pricingHover, setPricingHover] = useState(false);

  const drop = {
    initial: {
      y: -300,
      opacity: 0,
      rotateZ: 5,
    },
    animate: {
      y: 0,
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration: 0.6,
        ease: [0.85, 0, 0.15, 1],
      },
    },
  };

  return (
    <motion.header
      variants={drop}
      initial="initial"
      animate="animate"
      className="py-3 px-4 md:px-10 z-[60]"
    >
      <nav className="flex justify-between items-center">
        <Link href='/'>
          <div className="flex items-center z-[50]">
            <div className="w-[40px] object-cover">
              <Image
                src={Logo}
                alt="elysian logo with three lines symbolizing journal entries"
                className="w-full h-full"
              />
            </div>
            <p className={`text-[18px] ${boskaRegular.className}`}>Elysian</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-10 z-[50]">
          <ul className="flex items-center gap-3 md:gap-5">
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
          <Link href="/login">
            <PrimaryButton>Sign In</PrimaryButton>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
