"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  LightBulbIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import CategoriesSelect from "./CategoriesSelect";
import CollectionCard from "@/components/CollectionCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { PostProps, UserDataProps } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";
import Link from "next/link";
import SearchBar from "./SearchBar";

function MainLeftBar() {
  const supabase = createClient();

  const [infoData, setInfoData] = useState<PostProps[] | undefined>();
  const [userID, setUserID] = useState<string | undefined>();

  const categories = [
    {
      title: "Date Idea",
      icon: <LightBulbIcon className="duration-300 group-hover:text-[#e1b067] text-darkText md:w-6 w-4" />,
      borderColor: "group-hover:border-[#e1b06740]",
      href: "/the-corner/ideas/create",
    },
    {
      title: "Date Story",
      icon: <BookOpenIcon className="duration-300 group-hover:text-[#557467] text-darkText md:w-6 w-4" />,
      borderColor: "group-hover:border-[#55746740]",
      href: "/the-corner/stories/create",
    },
  ];

  const getInfo = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError.message);
    }

    setUserID(userData?.user?.id);

    const { data: cornerData, error: cornerError } = await supabase
      .from("corner")
      .select(
        `
          *,
          saves (
            *
          ),
          comments (
            *
          ),
          likes (
            *
          ),
          users (
            id,
            username,
            image,
            name
          ),
          replies (
            *
          )
        `
      )
      .order("created_at", { ascending: false });

    if (cornerError) {
      console.log(cornerError.message);
    } else {
      setInfoData(cornerData);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <section className="relative">
      <SearchBar classNameSize="md:w-[45%] w-full"/>
      {/* CREATE DATE STORY OR IDEA */}
      <section className="w-full mt-4">
        <div className="flex flex-col sm:flex-row gap-y-1 gap-x-3 px-1">
          {categories.map((cat) => {
            return (
              <Fragment key={cat.title}>
                <Link href={cat.href} className="w-full">
                  <CategoriesSelect
                    title={`Create a ${cat.title}`}
                    className={`flex-[1]`}
                    borderColor={cat.borderColor}
                  >
                    {cat.icon}
                  </CategoriesSelect>
                </Link>
              </Fragment>
            );
          })}
        </div>
      </section>
      {/* RENDER OF ALL IDEAS AND STORIES FROM NEWEST TO LATEST */}
      <section className="mt-9">
        <div>
          {infoData
            ? infoData.map((info) => {
                return (
                  <Fragment key={info?.id}>
                    <div className="md:py-0 md:px-4">
                      <CollectionCard info={info} userID={userID} />
                    </div>
                  </Fragment>
                );
              })
            : [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                return (
                  <Fragment key={col}>
                    <CollectionCardSkeleton />
                  </Fragment>
                );
              })}
        </div>
      </section>
    </section>
  );
}

export default MainLeftBar;
