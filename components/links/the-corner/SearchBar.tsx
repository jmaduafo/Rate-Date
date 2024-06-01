"use client";
import React, { Fragment, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { PostProps, UserDataProps } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import Header6 from "@/components/Header6";
import { getInitials } from "@/utils/general/initials";

function SearchBar({ classNameSize }: { classNameSize?: string }) {
  const supabase = createClient();
  const router = useRouter();

  const [userID, setuserID] = useState<string | undefined>();
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

  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.log(error.message);
    } else {
      setuserID(data?.user?.id)
    }
  };

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
    getUser();
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
        searchData?.filter((data) =>
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
      <div
        className={`relative mb-2 flex items-center gap-2 text-darkText bg-myForeground rounded-full py-2 px-3 ${classNameSize}`}
      >
        <MagnifyingGlassIcon className="w-6 text-darkText" strokeWidth={1} />
        <input
          placeholder="Search"
          className="outline-none border-none bg-transparent w-full text-[14px]"
          onChange={handleSearch}
          value={search}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.length) {
              router.push("/the-corner/search" + "?search=" + search);
            }
          }}
        />
      </div>
      {/* SEARCH DROP DOWN */}
      {(search.length && filterUserData?.length) ||
      filterTitleData?.length ||
      filterTypeData?.length ||
      filterCategoryData?.length ? (
        <div
          className={`absolute ${classNameSize} z-[10] rounded-xl bg-myForeground text-darkText p-2 text-[15px]`}
        >
          {filterUserData && filterUserData?.length
            ? filterUserData?.slice(0, 8)?.map((data) => {
                return (
                  <Link key={data.id} href={`/profile/${data.username}`}>
                    <div className="flex items-center gap-3 py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                      {data.image ? (
                        <div className="w-[30px] h-[30px] object-cover">
                          <Image
                            src={data.image}
                            alt={`${data.username}'s profile`}
                            width={500}
                            height={500}
                            className="w-full h-full rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-300 w-[30px] h-[30px] flex justify-center items-center rounded-full">
                          <p className="uppercase font-semibold text-[13px]">{getInitials(data.name as string)}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-[15px]">
                          {data?.name}{" "}
                          <span className="text-[13px] text-darkText60">
                            &#x2022; @{data?.username}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
          {/* <Link
            href={`/the-corner/search?search=${
              !search.length ? "all users" : search
            }`}
          >
            <div className="cursor-pointer py-1">
              <p className="text-[14px] text-center font-medium text-orange-800">
                See more users
              </p>
            </div>
          </Link> */}
          {filterTitleData && filterTitleData?.length
            ? filterTitleData?.slice(0, 4)?.map((data) => {
                return (
                  <Link
                    key={data.id}
                    href={`/the-corner/search?search=${data?.title?.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                      <MagnifyingGlassIcon className="w-5 text-darkText" />
                      <div>
                        <p className="text-[15px]">{data?.title}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
          {/* {filterTagsData && filterTagsData?.length
            ? filterTagsData?.slice(0, 4)?.map((data) => {
                data?.tags?.forEach((tag) => {
                  tag.toLowerCase().includes(search.toLowerCase()) && (
                    <p
                      key={data?.id}
                      className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                    >
                      {tag}
                    </p>
                  );
                });
                return (
                  <p
                    key={data.id}
                    className="py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500"
                  >
                    {data?.title}
                  </p>
                );
              })
            : null} */}
          {filterCategoryData && filterCategoryData?.length
            ? filterCategoryData?.slice(0, 4)?.map((data) => {
                return (
                  <Link
                    key={data.id}
                    href={`/the-corner/search?search=${data?.category?.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                      <MagnifyingGlassIcon className="w-5 text-darkText" />
                      <div>
                        <p className="text-[15px]">{data?.category}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
          {filterTypeData && filterTypeData?.length
            ? filterTypeData?.slice(0, 4)?.map((data) => {
                return (
                  <Link
                    key={data.id}
                    href={`/the-corner/search?search=${data.date_type?.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 py-2 px-2 rounded cursor-pointer hover:bg-dark10 duration-500">
                      <MagnifyingGlassIcon className="w-5 text-darkText" />
                      <div>
                        <p className="text-[15px]">{data?.date_type}</p>
                      </div>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      ) : null}
    </>
  );
}

export default SearchBar;
