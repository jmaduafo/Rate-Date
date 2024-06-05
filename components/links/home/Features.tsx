"use client";
import React, { useState, useEffect, Fragment } from "react";
import Corner from "@/app/serendate_corner.png";
import Dashboard from "@/app/serendate_dashboard.png";
import Profile from "@/app/serendate_profile.png";
import Search from "@/app/serendate_search.png";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { boskaMedium } from "@/fonts/font";

function Features() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const slides = [
    {
      title: "The Corner",
      image: Corner,
      description: "Share your most creative date ideas and memorable stories in our vibrant community hub. Connect with fellow users by commenting, liking, and following posts that inspire you. Dive into a world where every date is an adventure, and every story is worth sharing. Join the conversation, spark new ideas, and make lasting connections.",
    },
    {
      title: "Search",
      image: Search,
      description: "Search for the perfect date ideas, captivating stories, and connect with like-minded users. Whether you're looking for inspiration or new friends, our powerful search tools make it easy to find exactly what you need. Dive in and discover a world of romantic adventures and meaningful connections.",
    },
    {
      title: "Profile",
      image: Profile,
      description: "Step into your personal profile haven where you can share your unique date ideas and stories with the world. Showcase your adventures, track your dating journey, and connect with others who share your interests. Personalize your profile to reflect your style and watch as your dating chronicles inspire and engage the community.",
    },
    {
      title: "Dashboard",
      image: Dashboard,
      description: "Gain access to your interactive personal dashboard, where planning and tracking your dating life is a breeze. Schedule future dates, view your dating activity at a glance, and stay organized with our intuitive calendar. Dive into a seamless experience that keeps your romantic and social life on track, all in one place with Elysian.",
    },
  ];

  return (
    <section className="overflow-x-hidden">
      <div className="mb-10">
        <Carousel
          className="w-full mx-auto max-w-[90vw] overflow-y-visible"
          setApi={setApi}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="overflow-y-visible">
            {slides.map((slide, index) => {
              return (
                <CarouselItem
                  className={`md:basis-1/3 overflow-y-visible`}
                  key={slide.title}
                >
                  <div
                    className={`w-full object-cover duration-700 rounded-lg ${
                      current === index + 1
                        ? "translate-y-[-40px]"
                        : "translate-y-0"
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className={`flex justify-center mt-10`}>
          {slides.map((slide, i) => {
            return (
              <div
                key={slide.title}
                className={`${
                  current === i + 1 ? "block" : "hidden"
                } duration-500 w-[30%] font-light`}
              >
                <h5 className={`${boskaMedium.className} uppercase text-center text-[28px] mb-3`}>{slide.title}</h5>
                <p className={`text-center`}>{slide.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
