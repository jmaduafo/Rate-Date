"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import Gif from "@/app/graphLoading.gif";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { DateDataProps, UserDataProps } from "@/types/type";
import SingleDateList from "@/components/SingleDateList";
import { FireIcon } from "@heroicons/react/24/solid";
import Loading from "@/components/Loading";
import { getZodiac, getZodiacImage } from "@/utils/general/zodiacSign";
import PrimaryButton from "@/components/PrimaryButton";

function TopBar() {
  const [chartLoading, setChartLoading] = useState(true);
  const [topData, setTopData] = useState<DateDataProps[] | undefined>();
  const [zodiacData, setZodiacData] = useState<UserDataProps[] | undefined>();
  const [horoscope, setHoroscope] = useState<string | undefined>();

  const supabase = createClient();

  async function fetchHoroscope(zodiac: string) {
    try {
        // const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${getZodiac(zodiac)}&day=TODAY`)
        // const data = await res.json();

        const URL = `https://aztro.sameerkumar.website/?sign=${getZodiac(zodiac)}&day=today`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        .then(response => response.json())
        .then((data : any) => { setHoroscope(data.description); });

    } catch (err: any) {
        console.log(err.message)
    }
  }

  async function getUserData() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError.message);
    } else {

      const { data: zodiac, error: zodiacError } = await supabase
        .from("users")
        .select("id, birthday")
        .eq("id", userData?.user?.id);

      const { data: topData, error: topError } = await supabase
        .from("dates")
        .select("date_name, rating, user_id, id")
        .eq("user_id", userData?.user?.id)
        .order("rating", { ascending: false })
        .is("is_seeing", true)
        .limit(1);

        
        if (zodiacError) {
            console.log(zodiacError.message);
        } else {
            setZodiacData(zodiac);

            // CALL HOROSCOPE FUNCTION TO GET THE DAILY HOROSCOPE
            // fetchHoroscope(zodiac[0].birthday)

        }

      if (topError) {
        console.log(topError.message);
      } else {
        setTopData(topData);
      }

    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="flex md:flex-row flex-col gap-6 md:h-[30vh] md:mt-0 mt-8">
      {/* CHART CARD */}
      <Card className="flex-[1.5]">
        {chartLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loading
              classNameColor="border-t-darkText60"
              classNameSize="w-[50px] h-[50px]"
            />
          </div>
        ) : (
          <div>
            <Header3 title="Chart Overview" />
          </div>
        )}
      </Card>
      {/* HOROSCOPE CARD */}
      <Card className="flex-[1.5]">
        <div className="flex justify-between items-center">
          <Header3 title="Daily Horoscope" />
          {

            zodiacData && zodiacData?.length ?
            <div className="w-[30px] object-cover">
                {zodiacData[0].birthday && <Image src={getZodiacImage(getZodiac(zodiacData[0].birthday))} alt={getZodiac(zodiacData[0].birthday)} className="w-full h-full" />}
            </div>
            :
            <div className="">
                <Loading classNameColor="border-t-darkText" classNameSize="w-5"/>
            </div> 
          }
        </div>
          {
            horoscope && horoscope.length ?
            // HOROSCOPE
            <div className=''>
                {/* <p className="text-center px-6 text-[15px]">{horoscope}</p> */}
            </div>
            :
            <div className="mt-9">
                <p className="text-center px-6 text-[15px]">Add your birthday when editing your profile to get your daily horoscope</p>
                <div className="flex justify-center items-center mt-4">
                    <PrimaryButton className="">
                        Go To Profile
                    </PrimaryButton>
                </div>
            </div>
          }
      </Card>
      {/* TOP DATE CARD */}
      {topData && topData.length ? (
        <Card className="flex-[1] flex flex-col">
          <Header3 title="Top Date" />
          <div className="mt-auto">
            {topData?.map((data) => {
              return (
                <div className="w-full" key={data.id}>
                  <SingleDateList>
                    <p>{data.date_name}</p>
                    <div className="flex items-center gap-1">
                      <FireIcon className="w-4 text-orange-600" />
                      <p>{data.rating}</p>
                    </div>
                  </SingleDateList>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card className="flex-[1] flex justify-center items-center">
          <div className="w-[80%] object-cover">
            <Image src={Gif} alt="laptop chart gif" className="w-full h-full" />
          </div>
        </Card>
      )}
    </div>
  );
}

export default TopBar;
