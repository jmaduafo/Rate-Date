"use client";
import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { DateDataProps } from "@/types/type";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import { checkForS } from "@/utils/general/isS";

function RealTimeSchedule({
  schedulesList,
  setScheduleID,
  setSelectedSchedule,
}: {
  schedulesList: DateDataProps[] | undefined;
  setScheduleID: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedSchedule: React.Dispatch<React.SetStateAction<DateDataProps | undefined>>;
}) {
  const supabase = createClient();
  const router = useRouter();

  function scheduleChannel() {
    const channel = supabase
      .channel("schedule changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "schedules",
          // Only care about dates where the user_id matches the user's id
          // filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          // if (schedulesList) {
          //   setSchedulesList([...schedulesList, payload.new as DateDataProps]);
          // }
          // console.log(payload);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  useEffect(() => {
    scheduleChannel();
  }, [supabase, router, schedulesList]);

  return (
    // futureTimeFromNow(...) returns negative numbers so should be rendered
    // when the output is less than 0 and not appear if greater than 0
    schedulesList?.map((date) => {
      return (
        // futureTimeFromNow(...) returns negative numbers so should be rendered
        // when the output is less than 0 and not appear if greater than 0
        date.date_schedule && futureTimeFromNow(date.date_schedule) <= 0 ? (
          <div
            className="mb-3 pr-3"
            key={date.id}
            onClick={() => setScheduleID(date.id)}
          >
            <DialogTrigger onClick={() => setSelectedSchedule(date)} asChild>
              <div className="flex justify-between items-center w-full px-4 py-3 shadow-md rounded-2xl hover:bg-myBackgroundMuted cursor-pointer duration-500">
                <p className="text-[15px]">{date.date_name}</p>
                <p className="italic text-[10px] text-darkText60">
                  in{" "}
                  {date.date_schedule &&
                  futureTimeFromNow(date.date_schedule) <= -1
                    ? Math.round(
                        Math.abs(futureTimeFromNow(date.date_schedule))
                      ) +
                      " day" +
                      checkForS(
                        Math.round(
                          Math.abs(futureTimeFromNow(date.date_schedule))
                        )
                      )
                    : Math.round(
                        Math.abs(futureHoursFromNow(date.date_schedule))
                      ) +
                      " hour" +
                      checkForS(
                        Math.round(
                          Math.abs(futureHoursFromNow(date.date_schedule))
                        )
                      )}
                </p>
              </div>
            </DialogTrigger>
          </div>
        ) : null
      );
    })
  );
}

export default RealTimeSchedule;
