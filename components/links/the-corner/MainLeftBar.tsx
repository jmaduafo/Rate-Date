"use client";
import React, { Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

function MainLeftBar() {
  const supabase = createClient();
  const router = useRouter();

  const [infoData, setInfoData] = useState<PostProps[] | undefined>();
  const [searchData, setSearchData] = useState<PostProps[] | undefined>();
  const [userData, setUserData] = useState<UserDataProps[] | undefined>();
  const [filterTagsData, setFilterTagsData] = useState<
    PostProps[] | undefined
  >();
  const [filterUserData, setFilterUserData] = useState<
    UserDataProps[] | undefined
  >();
  const [filterTitleData, setFilterTitleData] = useState<
    PostProps[] | undefined
  >();
  const [filterCategoryData, setFilterCategoryData] = useState<
    PostProps[] | undefined
  >();
  const [filterTypeData, setFilterTypeData] = useState<
    PostProps[] | undefined
  >();
  const [search, setSearch] = useState<string>("");
  const [userID, setUserID] = useState<string | undefined>();

  const categories = [
    {
      title: "Date Idea",
      icon: <LightBulbIcon className="text-darkText md:w-6 w-4" />,
      bgColor: "hover:bg-[#E0A85440]",
      href: "/the-corner/ideas/create",
    },
    {
      title: "Date Story",
      icon: <BookOpenIcon className="text-darkText md:w-6 w-4" />,
      bgColor: "hover:bg-[#96D6BB40]",
      href: "/the-corner/stories/create",
    },
  ];

  const getCorner = async () => {
    const { data: cornerData, error: cornerError } = await supabase
      .from("corner")
      .select();

    if (cornerError) {
      console.log(cornerError.message);
    } else {
      setSearchData(cornerData);
    }
  };

  const getUsers = async () => {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select();

    if (userError) {
      console.log(userError.message);
    } else {
      setUserData(userData);
    }
  };

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
    }
  };

  useEffect(() => {
    getInfo();
    getCorner();
    getUsers();
  }, []);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);

    if (searchData && userData && search.length) {
      setFilterUserData(
        userData?.filter(
          (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.username?.toLowerCase().includes(search?.toLowerCase())
        )
      );
      setFilterTitleData(
        searchData?.filter((data) =>
          data?.title?.toLowerCase().includes(search?.toLowerCase())
        )
      );
      setFilterCategoryData(
        searchData?.filter((data) =>
          data?.category?.toLowerCase().includes(search?.toLowerCase())
        )
      );
      setFilterTypeData(
        searchData?.filter((data) =>
          data?.date_type?.toLowerCase().includes(search?.toLowerCase())
        )
      );
    }
  }

  return (
    <section className="relative">
      {/* SEARCH ENGINE */}
      <div className="relative mb-2 flex items-center gap-2 text-darkText bg-myForeground rounded-full py-2 px-3 md:w-[45%] w-full">
        <MagnifyingGlassIcon className="w-6 text-darkText" strokeWidth={1} />
        <input
          placeholder="Search"
          className="outline-none border-none bg-transparent w-full text-[14px]"
          onChange={handleSearch}
          value={search}
        />
      </div>
      {/* SEARCH DROP DOWN */}
      {search.length &&
      filterUserData?.length ||
      filterTitleData?.length ||
      filterTypeData?.length ||
      filterCategoryData?.length ? (
        <div className="absolute md:w-[45%] w-full z-[10] rounded-xl bg-myForeground text-darkText p-2 text-[15px]">
          {filterUserData && filterUserData?.length
            ? filterUserData?.slice(0, 4)?.map((data) => {
                return (
                  <Link href={`/profile/${data.id}`}>

                  <p key={data.id} className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                    {data?.name} . {data?.username}
                  </p>
                  </Link>
                );
              })
            : null}
          {filterTitleData && filterTitleData?.length
            ? filterTitleData?.slice(0, 4)?.map((data) => {
                return (
                  <p key={data.id} className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                    {data?.title}
                  </p>
                );
              })
            : null}
          {filterCategoryData && filterCategoryData?.length
            ? filterCategoryData?.slice(0, 4)?.map((data) => {
                return (
                  <p key={data.id} className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                    {data?.category}
                  </p>
                );
              })
            : null}
          {filterTypeData && filterTypeData?.length
            ? filterTypeData?.slice(0, 4)?.map((data) => {
                return (
                  <p key={data.id} className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                    {data?.date_type}
                  </p>
                );
              })
            : null}
        </div>
      ) : null}
      {/* CREATE DATE STORY OR IDEA */}
      <section className="w-full mt-4">
        <div className="flex gap-3 px-1">
          {categories.map((cat) => {
            return (
              <Fragment key={cat.title}>
                <Link href={cat.href} className="w-full">
                  <CategoriesSelect
                    title={`Create a ${cat.title}`}
                    bgColor={`${cat.bgColor} flex-[1]`}
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
      <section className="mt-4">
        <div>
          {infoData
            ? infoData.map((info) => {
                return (
                  <Fragment key={info?.id}>
                    <div className="md:py-5 md:px-4">
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
