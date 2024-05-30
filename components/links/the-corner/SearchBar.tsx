"use client";
import React, { Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { PostProps, UserDataProps } from "@/types/type";
import Link from "next/link";

function SearchBar({ classNameSize }: { classNameSize?: string}) {
  const supabase = createClient();

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

  useEffect(() => {
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
            data?.username?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.bio?.toLowerCase().includes(search?.toLowerCase())
        )
      );
      setFilterTagsData(
        searchData?.filter(
          (data) =>
            data?.tags?.includes(search?.toLowerCase())
        )
      );
      setFilterTitleData(
        searchData?.filter(
          (data) =>
            data?.title?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.content?.toLowerCase().includes(search?.toLowerCase())
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
    <>
    {/* SEARCH ENGINE */}
    <div className={`relative mb-2 flex items-center gap-2 text-darkText bg-myForeground rounded-full py-2 px-3 ${classNameSize}`}>
        <MagnifyingGlassIcon className="w-6 text-darkText" strokeWidth={1} />
        <input
          placeholder="Search"
          className="outline-none border-none bg-transparent w-full text-[14px]"
          onChange={handleSearch}
          value={search}
        />
      </div>
      {/* SEARCH DROP DOWN */}
      {(search.length && filterUserData?.length) ||
      filterTitleData?.length ||
      filterTypeData?.length ||
      filterCategoryData?.length ? (
        <div className={`absolute ${classNameSize} z-[10] rounded-xl bg-myForeground text-darkText p-2 text-[15px]`}>
          {filterUserData && filterUserData?.length
            ? filterUserData?.slice(0, 4)?.map((data) => {
                return (
                  <Link href={`/profile/${data.username}`}>
                    <p
                      key={data.id}
                      className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                    >
                      {data?.name} . {data?.username}
                    </p>
                  </Link>
                );
              })
            : null}
          {filterTitleData && filterTitleData?.length
            ? filterTitleData?.slice(0, 4)?.map((data) => {
                return (
                  <p
                    key={data.id}
                    className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                  >
                    {data?.title}
                  </p>
                );
              })
            : null}
          {filterTagsData && filterTagsData?.length
            ? filterTagsData?.slice(0, 4)?.map((data) => {
                data?.tags?.forEach(tag => {
                    tag.toLowerCase().includes(search.toLowerCase()) &&
                    <p
                    key={data?.id}
                    className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                  >
                    {tag}
                  </p>
                })
                return ( 
                  <p
                    key={data.id}
                    className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                  >
                    {data?.title}
                  </p>
                );
              })
            : null}
          {filterCategoryData && filterCategoryData?.length
            ? filterCategoryData?.slice(0, 4)?.map((data) => {
                return (
                  <p
                    key={data.id}
                    className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                  >
                    {data?.category}
                  </p>
                );
              })
            : null}
          {filterTypeData && filterTypeData?.length
            ? filterTypeData?.slice(0, 4)?.map((data) => {
                return (
                  <p
                    key={data.id}
                    className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                  >
                    {data?.date_type}
                  </p>
                );
              })
            : null}
        </div>
      ) : null}
    </>
  )
}

export default SearchBar;
