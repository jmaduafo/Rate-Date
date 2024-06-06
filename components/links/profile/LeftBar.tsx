"use client";

import React, { useState, useEffect, Fragment } from "react";
import Card from "@/components/Card";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

import { useRouter } from "next/navigation";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { PostProps, OtherProps } from "@/types/type";
import CollectionCard from "../../CollectionCard";
import SelectedBanner from "@/components/SelectedBanner";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";
import SearchBar from "../the-corner/SearchBar";

function LeftBar({ username }: { username?: string | string[] }) {
  const supabase = createClient();

  const { toast } = useToast();
  const [userSelect, setUserSelect] = useState<string | undefined>("Date Idea");
  const [userID, setUserID] = useState<string | undefined>("");
  const [infoData, setInfoData] = useState<PostProps[] | undefined>();
  const [filterData, setFilterData] = useState<PostProps[] | undefined>();
  const [saveData, setSaveData] = useState<PostProps[] | undefined>();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
      select: !username ? "My Saves" : null,
    },
  ];

  const getNonUserInfo = async () => {
    if (username) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("username", username);

      if (userError) {
        console.error(userError.message);
      } else {
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
                replies (
                  *
                )
              `
          )
          .eq("user_id", userData[0]?.id);

        if (cornerError) {
          console.log(cornerError.message);
        } else {
          setInfoData(cornerData);

          const filter = cornerData?.filter(
            (data) => data.date_type === userSelect
          );

          setFilterData(filter);
        }
      }
    }
  };
  const getInfo = async () => {
    if (!username) {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) {
        console.log(authError?.message);
      } else {
        setUserID(authData?.user?.id);

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
            replies (
              *
            )
          `
          )
          .eq("user_id", authData?.user?.id);

        if (cornerError) {
          console.log(cornerError.message);
        } else {
          setInfoData(cornerData);

          const filter = cornerData?.filter(
            (data) => data.date_type === userSelect
          );

          setFilterData(filter);
        }
      }
    }
  };

  const getSaves = async () => {
    if (!username) {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError) {
        console.log(authError?.message);
      } else {
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
            replies (
              *
            )
          `
          );

        if (cornerError) {
          console.log(cornerError.message);
        } else {
          // CHECK FOR SAVED DATA THROUGH ALL STORIES AND IDEAS
          const savesArray: PostProps[] | undefined = [];

          cornerData?.forEach((data) => {
            data?.saves?.forEach((save: OtherProps) => {
              save.user_id === authData?.user?.id && savesArray.push(data);
            });
          });

          setSaveData(savesArray);
        }
      }
    }
  };

  useEffect(() => {
    getInfo();
    getNonUserInfo()
    getSaves();
  }, []);

  useEffect(() => {
    if (userSelect !== "My Saves") {
      setFilterData(infoData);
      const filter = infoData?.filter((data) => data.date_type === userSelect);

      setFilterData(filter);
    } else if (userSelect === "My Saves" && saveData) {
      setFilterData(saveData);
    } else {
      setFilterData([]);
    }
  }, [userSelect]);

  return (
    <section>
      {/* USER'S STORIES AND DATE IDEAS SECTION */}
      <section className="relative">
        <SearchBar classNameSize="md:w-[45%] w-full"/>
        <div className="flex md:justify-start md:mb-2 justify-center mt-8 mb-4">
          {userSelect === "Date Idea" && !username ? (
            <Link href="/the-corner/ideas/create">
              <div className="flex items-center gap-2 text-darkText mb-3">
                <PlusCircleIcon className="w-6" />
                <p className="text-[15px] tracking-tighter">
                  Create a date idea
                </p>
              </div>
            </Link>
          ) : (
            userSelect === "Date Story" &&
            !username && (
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
        <div className="flex justify-center items-center gap-6 mb-10">
          {profileList.map((list) => {
            return (
              list.select && (
                <div className="" key={list.title}>
                  <SelectedBanner
                    title={list.title}
                    name={list.select}
                    setSelect={setUserSelect}
                    select={userSelect}
                  />
                </div>
              )
            );
          })}
        </div>
        <div>
          {filterData && filterData?.length ? (
            filterData.map((info) => {
              return (
                <Fragment key={info?.id}>
                  <CollectionCard
                    info={info}
                    userID={userID}
                    isLiked={isLiked}
                    isSaved={isSaved}
                  />
                </Fragment>
              );
            })
          ) : filterData && !filterData?.length ? (
            <div className="text-darkText mt-[3rem]">
              <p className="text-center">
                {userSelect === "My Saves"
                  ? "No saves yet"
                  : `No ${userSelect?.toLowerCase()} created yet`}
              </p>
            </div>
          ) : (
            [0, 1, 2, 3, 4, 5].map((col) => {
              return (
                <Fragment key={col}>
                  <CollectionCardSkeleton />
                </Fragment>
              );
            })
          )}
        </div>
      </section>
    </section>
  );
}

export default LeftBar;
