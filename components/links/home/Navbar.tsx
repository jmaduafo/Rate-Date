"use client";
import React, { useState } from "react";
import Logo from "@/app/elysian_logo.png";
import Link from "next/link";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import { boskaMedium, boskaRegular } from "@/fonts/font";

function Navbar() {
  const [pricingHover, setPricingHover] = useState(false);

  return (
    <header className="py-3 px-10 z-[60]">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-[40px] object-cover">
            <Image
              src={Logo}
              alt="elysian logo with three lines symbolizing journal entries"
              className="w-full h-full"
            />
          </div>
          <p className={`text-[18px] ${boskaRegular.className}`}>Elysian</p>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-5">
            <li className="text-[13px] list-none tracking-tight">
              <Link href="#features">Features</Link>
            </li>
            <li
              className="text-[13px] list-none tracking-tight duration-500"
              onMouseEnter={() => setPricingHover(true)}
              onMouseLeave={() => setPricingHover(false)}
            >
              <a href="#pricing">{pricingHover ? "Coming Soon" : "Pricing"}</a>
            </li>
          </ul>
          <Link href='/login'>
            <PrimaryButton>Sign In</PrimaryButton>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
