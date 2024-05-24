"use client";
import React, { Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  LightBulbIcon,
  BookOpenIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { Speech } from "lucide-react";
import CategoriesSelect from "./CategoriesSelect";
import CollectionCard from "@/components/CollectionCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { PostProps } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";

function MainLeftBar() {
  const supabase = createClient();
  const router = useRouter();

  const [infoData, setInfoData] = useState<PostProps[] | undefined>();
  const [userID, setUserID] = useState<string | undefined>();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const categories = [
    {
      title: "Date Ideas",
      icon: <LightBulbIcon className="text-darkText w-9" />,
      bgColor: "bg-[#E0A85440]",
    },
    {
      title: "Date Stories",
      icon: <BookOpenIcon className="text-darkText w-9" />,
      bgColor: "bg-[#96D6BB40]",
    },
    {
      title: "NSFW",
      icon: <ExclamationTriangleIcon className="text-darkText w-9" />,
      bgColor: "bg-[#C82B3D40]",
    },
    {
      title: "Advice",
      icon: <Speech size={36} className="text-darkText" />,
      bgColor: "bg-[#5C7ED640]",
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
          )
        `
      )
      .order("created_at", { ascending: false });

    if (cornerError) {
      console.log(cornerError.message);
    } else {
      setInfoData(cornerData);

      const isLiked = cornerData[0]?.likes?.some(
        (like: { user_id: string | string[] }) =>
          like.user_id === userData?.user?.id
      );

      if (isLiked) {
        setIsLiked(true);
      }

      const isSaved = cornerData[0]?.saves?.some(
        (save: { user_id: string | string[] }) =>
          save.user_id === userData?.user?.id
      );
      if (isSaved) {
        setIsSaved(true);
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <section>
      <div className="flex items-center gap-2 text-darkText bg-myForeground rounded-full py-2 px-3 md:w-[45%] w-full">
        <MagnifyingGlassIcon className="w-6 text-darkText" strokeWidth={1} />
        <input
          placeholder="Search"
          className="outline-none border-none bg-transparent w-full text-[14px]"
        />
      </div>
      <section className="w-full mt-4">
        <div className="horizontal md:max-w-[56vw] w-full overflow-x-auto">
          <div className="w-fit flex gap-3 flex-nowrap px-1">
            {categories.map((cat) => {
              return (
                <Fragment key={cat.title}>
                  <CategoriesSelect
                    title={cat.title}
                    bgColor={`${cat.bgColor}`}
                  >
                    {cat.icon}
                  </CategoriesSelect>
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>
      <section className="mt-4">
        <div>
          {infoData
            ? infoData.map((info) => {
                return (
                  <Fragment key={info?.id}>
                    <CollectionCard
                      info={info}
                      isLiked={isLiked}
                      isSaved={isSaved}
                      userID={userID}
                    />
                  </Fragment>
                );
              })
            : [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                return (
                  <Fragment key={col}>
                    <CollectionCardSkeleton/>
                  </Fragment>
                );
              })}
        </div>
      </section>
    </section>
  );
}

export default MainLeftBar;
