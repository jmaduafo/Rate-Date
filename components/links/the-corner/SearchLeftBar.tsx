"use client";
import React, { Fragment, useEffect, useState } from "react";
import Card from "@/components/Card";
import Header4 from "@/components/Header4";
import Link from "next/link";
import Gif from "@/app/nothing_displayed.gif";
import CollectionCard from "@/components/CollectionCard";
import { createClient } from "@/utils/supabase/client";
import { PostProps } from "@/types/type";
import SearchBar from "./SearchBar";
import Header3 from "@/components/Header3";
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";
import Image from "next/image";

function SearchLeftBar({ searchParams }: { searchParams: { search: string } }) {
  const [currentUser, setCurrentUser] = useState<string | undefined>();
  const [allData, setAllData] = useState<PostProps[] | undefined>();
  const [filterData, setFilterData] = useState<PostProps[] | undefined>();
  const [filterTitleData, setFilterTitleData] = useState<
    PostProps[] | undefined
  >();
  const [filterCategoryData, setFilterCategoryData] = useState<
    PostProps[] | undefined
  >();
  const [filterTypeData, setFilterTypeData] = useState<
    PostProps[] | undefined
  >();

  const supabase = createClient();

  async function getCorner() {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log(authError);
    } else {
      setCurrentUser(authData?.user?.id);

      const { data, error } = await supabase
        .from("corner")
        .select(`*, likes ( * ), saves ( * ), replies ( * ), comments ( * )`);

      if (error) {
        console.log(error);
      } else {
        setAllData(data);

        setFilterData(
          data?.filter(
            (data) =>
              data?.tags?.includes(searchParams.search?.toLowerCase()) ||
              data?.title
                ?.toLowerCase()
                .includes(searchParams.search?.toLowerCase()) ||
              data?.content
                ?.toLowerCase()
                .includes(searchParams.search?.toLowerCase()) ||
              data?.category
                ?.toLowerCase()
                .includes(searchParams.search?.toLowerCase()) ||
              data?.date_type
                ?.toLowerCase()
                .includes(searchParams.search?.toLowerCase())
          )
        );
      }
    }
  }

  useEffect(() => {
    getCorner();
  }, [searchParams]);

  return (
    <section className="relative text-darkText">
      <SearchBar classNameSize="md:w-[45%] w-full" />
      <div className="mt-8 mb-2">
        <Header3 title={`All under "${searchParams.search}"`} />
      </div>
      {/* POPULAR TAGS */}

      <div className={``}>
        {filterData && filterData?.length ? (
          filterData?.map((data) => {
            return (
              <Fragment key={data.id}>
                <CollectionCard info={data} userID={currentUser} />
              </Fragment>
            );
          })
        ) : filterData && !filterData.length ? (
          <div className="mt-10">
            <div className="w-[55%] object-cover mx-auto">
              <Image
                src={Gif}
                alt="animated techy gif"
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-[15px] font-medium mt-[-10px]">
              Sorry, nothing displayed under "{searchParams.search}"
            </p>
          </div>
        ) : (
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((el) => {
            return (
              <Fragment key={el}>
                <CollectionCardSkeleton />
              </Fragment>
            );
          })
        )}
      </div>
    </section>
  );
}

export default SearchLeftBar;
