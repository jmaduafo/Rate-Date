"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header3 from "@/components/Header3";
import Gif from "@/app/graphLoading.gif";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import {
  DateDataProps,
  ReactionDataProps,
  UserDataProps,
  ScheduleChartDataProps,
  EthnicDataProps
} from "@/types/type";
import SingleDateList from "@/components/SingleDateList";
import { FireIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import Loading from "@/components/Loading";
import { getZodiac, getZodiacImage } from "@/utils/general/zodiacSign";
import PrimaryButton from "@/components/PrimaryButton";
import Emoji from "./Emoji";
import { useToast } from "@/components/ui/use-toast";
import Horoscope from "./Horoscope";
import { Skeleton } from "@/components/ui/skeleton";
import { clearCachesByServerAction } from "@/utils/general/revalidatePath";
import ScheduleBarChart from "./ScheduleBarChart";
import { scheduleDayFormat } from "@/utils/general/dateTimeFile";
import DemographicChart from "../profile/DemographicChart";

function TopBar() {
  const [chartLoading, setChartLoading] = useState(true);
  const [chartData, setChartData] = useState<
    ScheduleChartDataProps[] | undefined
  >();
  const [ethnicData, setEthnicData] = useState<EthnicDataProps[] | undefined>();
  const [topData, setTopData] = useState<DateDataProps[] | undefined>();
  const [zodiacData, setZodiacData] = useState<UserDataProps[] | undefined>();
  const [horoscope, setHoroscope] = useState<string | undefined>();

  const [userID, setUserID] = useState<string | null>("");

  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>("");
  // const [emojiDialogOpen, setEmojiDialogOpen] = useState<boolean>(false);
  const [emojiLoading, setEmojiLoading] = useState<boolean>(false);

  const [emojiData, setEmojiData] = useState<ReactionDataProps | undefined>();

  const supabase = createClient();
  const { toast } = useToast();

  async function getUserData() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError.message);
    } else {
      setUserID(userData?.user?.id);

      const { data: topData, error: topError } = await supabase
        .from("dates")
        .select("date_name, rating, user_id, id, relationship_status")
        .eq("user_id", userData?.user?.id)
        .order("rating", { ascending: false })
        .is("is_seeing", true)
        .limit(1);

      const { data: reactionData, error: reactionError } = await supabase
        .from("reactions")
        .select()
        .eq("user_id", userData?.user?.id);

      const { data: scheduleData, error: scheduleError } = await supabase
        .from("schedules")
        .select()
        .eq("user_id", userData?.user?.id)
        .order("date_schedule", { ascending: true });

      const { data: ethnicityData, error: ethnicityError } = await supabase
        .from("dates")
        .select("id, user_id, ethnicity, date_name")
        .neq("ethnicity", "Don't know")
        .eq("user_id", userData?.user?.id);


      if (topError) {
        console.log(topError.message);
      } else {
        setTopData(topData);
      }

      if (reactionError) {
        console.log(reactionError.message);
      } else {
        setEmojiData(reactionData[0]);
        setSelectedEmoji(reactionData[0]?.reaction);
      }

      if (scheduleError) {
        console.log(scheduleError.message);
      } else {
        let array: ScheduleChartDataProps[] = [];

        scheduleData?.forEach((list, i) => {
          const filterCount = scheduleData?.filter(
            (el) =>
              scheduleDayFormat(el.date_schedule) ===
              scheduleDayFormat(list.date_schedule)
          ).length;

          array.push({
            date_schedule: scheduleDayFormat(list.date_schedule),
            date_schedule_count: filterCount,
          });
        });

        const newArray = [
          ...new Map(
            array.map((item) => [item["date_schedule"], item])
          ).values(),
        ];

        setChartData(newArray);
      }

      if (ethnicityError) {
        console.error(ethnicityError.message);
      } else {
        let array: EthnicDataProps[] = [];

        ethnicityData?.forEach((list, i) => {
          const filterCount = ethnicityData?.filter(
            (el) => el.ethnicity === list.ethnicity
          ).length;

          array.push({
            ethnicity: list.ethnicity,
            ethnicityCount: filterCount,
          });
        });

        const newArray = [
          ...new Map(array.map((item) => [item["ethnicity"], item])).values(),
        ];

        // SETS A UNIQUE OBJECT ARRAY BASED ON THE ETHNICITY
        setEthnicData(newArray);
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    listen()
  }, [supabase, emojiData, ethnicData, chartData]);

  async function listen() {
    const channel = supabase
      .channel("reaction changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reactions",
          // Only care about dates where the user_id matches the user's id
          filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          getUserData()
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function handleAddReaction(e: React.FormEvent) {
    e.preventDefault();

    setEmojiLoading(true);

    if (!selectedEmoji) {
      toast({
        title: "Sorry, you must select a reaction",
      });
    } else {
      const { data, error } = await supabase
        .from("reactions")
        .upsert({
          user_id: userID,
          reaction: selectedEmoji,
        })
        .select();

      if (error) {
        toast({
          title: "Whoops! Something went wrong",
          description: error.message,
        });
      } else {
        toast({
          title: "Success!",
          description: "Reaction added successfully!",
        });

        setEmojiData(data[0]);
      }
    }

    setEmojiLoading(false);
  }

  return (
    <div className="flex md:flex-row flex-col gap-6 md:mt-0 mt-8">
      {/* CHART CARD */}
      <Card className="flex-[1.5]">
        <ScheduleBarChart chartData={chartData} />
      </Card>
      {/* HOROSCOPE CARD */}
      <Card className="flex-[1.5] flex flex-col">
        <DemographicChart ethnicData={ethnicData}/>
      </Card>
      {/* TOP DATE CARD */}
      {topData && topData.length ? (
        <Card className="flex-[1] flex flex-col">
          {/* EMOJI SECTION */}
          <div className="flex justify-between items-center">
            <Header3 title="Top Date" />
            <Emoji
              emojiData={emojiData}
              emojiLoading={emojiLoading}
              handleSubmit={handleAddReaction}
              selectedEmoji={selectedEmoji}
              setSelectedEmoji={setSelectedEmoji}
            />
          </div>
          <div className="mt-1">
            <p className="bg-myAccent text-darkText py-[3px] px-3 rounded-full text-[11px] w-fit">
              {topData[0]?.relationship_status}
            </p>
          </div>
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
