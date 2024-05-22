"use client";

import React, { useState, useEffect, Fragment } from "react";
import Card from "@/components/Card";
import { useToast } from "@/components/ui/use-toast";
import { getInitials } from "@/utils/general/initials";
import { getZodiac } from "@/utils/general/zodiacSign";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

import { useRouter } from "next/navigation";

import Header4 from "@/components/Header4";
import Loading from "@/components/Loading";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { PostProps } from "@/types/type";
import CollectionCard from "../../CollectionCard";
import SelectedBanner from "@/components/SelectedBanner";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function LeftBar() {
  const supabase = createClient();

  const { toast } = useToast();
  const [userSelect, setUserSelect] = useState<string | undefined>(
    "Date Idea"
  );
  const [infoData, setInfoData] = useState<PostProps[] | undefined>();
  const [filterData, setFilterData] = useState<PostProps[] | undefined>();

  const router = useRouter();

  const profileList = [
    {
      title: "Date Ideas",
      select: "Date Idea",
    },
    {
      title: "Date Stories",
      select: "Date Story",
    },
    {
      title: "My Saves",
      select: "My Saves",
    },
  ];

  const getInfo = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log(authError?.message);
    } else {
      const { data: cornerData, error: cornerError } = await supabase
        .from("corner")
        .select(`
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
        `)
        .eq("user_id", authData?.user?.id);

      if (cornerError) {
        console.log(cornerError.message);
      } else {
        setInfoData(cornerData);

        const filter = cornerData?.filter(data => data.category === userSelect)
        setFilterData(filter)
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (userSelect !== "My Saves") {
      setFilterData(infoData)
      const filter = infoData?.filter((data) => data.date_type === userSelect);

      setFilterData(filter);
    }
  }, [userSelect]);

  return (
    <section>
      {/* USER'S STORIES AND DATE IDEAS SECTION */}
      <section className="">
        <div className="">
          {userSelect === "Date Idea" ? (
            <Link href="/the-corner/ideas/create">
              <div className="flex items-center gap-2 text-darkText mb-3">
                <PlusCircleIcon className="w-6" />
                <p className="text-[15px] tracking-tighter">
                  Create a date idea
                </p>
              </div>
            </Link>
          ) : (
            userSelect === "Date Story" && (
              <Link href="/the-corner/stories/create">
                <div className="flex items-center gap-2 text-darkText mb-3">
                  <PlusCircleIcon className="w-6" />
                  <p className="text-[15px] tracking-tighter">
                    Create a date story
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
        <div className="flex justify-center items-center gap-3 mb-10">
          {profileList.map((list) => {
            return (
              <SelectedBanner
                title={list.title}
                name={list.select}
                setSelect={setUserSelect}
                select={userSelect}
              />
            );
          })}
        </div>
        <div>
          {filterData
            ? filterData.map((info) => {
                return (
                  <Fragment key={info?.id}>
                    <CollectionCard info={info} />
                  </Fragment>
                );
              })
            : [0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
                return (
                  <Fragment key={col}>
                    <p>hi</p>
                  </Fragment>
                );
              })}
        </div>
      </section>
    </section>
  );
}

export default LeftBar;
