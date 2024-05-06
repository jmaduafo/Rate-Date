"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import Gif from "@/app/graphLoading.gif";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { DateDataProps } from "@/types/type";
import SingleDateList from "@/components/SingleDateList";
import ScreenLoading from "@/components/ScreenLoading";
import Loading from "@/components/Loading";

function TopBar() {
  const [chartLoading, setChartLoading] = useState(true);
  const [topData, setTopData] = useState<DateDataProps[] | undefined>();

  const supabase = createClient();

  async function fetchHoroscope() {}

  async function getTopDate() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError.message);
    } else {
      const { data: topData, error: topError } = await supabase
        .from("dates")
        .select("date_name, rating, user_id, id")
        .eq("id", userData?.user?.id)
        .order("rating", { ascending: false })
        .is("is_seeing", true)
        .limit(1);
        
        if (topError) {
            console.log(topError.message)
        } else {
            setTopData(topData)
        }
    }
  }

  useEffect(() => {
    getTopDate()
  }, []);

  return (
    <div className="flex md:flex-row flex-col gap-6 md:h-[30vh] md:mt-0 mt-8">
      {/* CHART CARD */}
      <Card className="flex-[1.5]">
        {chartLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading classNameColor='border-t-darkText60' classNameSize="w-[50px] h-[50px]"/>
          </div>
        ) : (
          <div>
            <Header3 title="Chart Overview" />
          </div>
        )}
      </Card>
      {/* HOROSCOPE CARD */}
      <Card className="flex-[1.5]">
        <Header3 title="Daily Horoscope" />
      </Card>
      {/* TOP DATE CARD */}
      <Card className="flex-[1]">
        {
            topData && topData.length ?
            <div>
                <Header3 title="Top Date" />
                {
                    topData?.map(data => {
                        return (
                            <div className="" key={data.id}>
                                <SingleDateList>
                                    <p>{data.date_name}</p>
                                    <p>{data.rating}</p>
                                </SingleDateList>
                            </div>
                        )
                    })
                }
            </div>
            :
            <div className="w-[80%] object-cover mx-auto">
                <Image
                    src={Gif}
                    alt="laptop chart gif"
                    className="w-full h-full"
                    />
            </div>


        }

      </Card>
    </div>
  );
}

export default TopBar;
