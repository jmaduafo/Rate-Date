'use client'

import React, { useState, useEffect, Fragment } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { FireIcon, PlusIcon } from "@heroicons/react/24/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import Header4 from "@/components/Header4";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import SingleDateList from "@/components/SingleDateList";
import LineBreak from "@/components/LineBreak";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { UserProp, DateDataProps } from "@/types/type";

// { userID }: {userID: string}
function BottomBar() {
  const [datesList, setDatesList] = useState<DateDataProps[] | undefined>();
  const [schedulesList, setSchedulesList] = useState<DateDataProps[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const listHeaders = [
    {
      header: "Name",
      className: "flex-[3]",
    },
    {
      header: "Description",
      className: "flex-[3]",
    },
    {
      header: "Duration",
      className: "flex-[2]",
    },
    {
      header: "Rating",
      className: "flex-[2]",
    },
    {
      header: "Status",
      className: "flex-[2]",
    },
  ];

  const supabase = createClient();
  const { toast } = useToast();

  async function getDateList() {
    setLoading(true)

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.log(error.message)
    } else {
        if (user) {
            const { data: dateData, error: dateError } = await supabase
            .from("dates")
            .select()
            .eq("user_id", user?.id)
            .order('created_at', { ascending: false })
    
            if (dateError) {
                console.log(dateError.message);
            } else {
                setDatesList(dateData);
                console.log(dateData)
            }
        }
    }
  }

  async function getUpcomingDates() {
    setLoading(true)

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.log(error.message)
    } else {
        if (user) {
            const { data: scheduleData, error: scheduleError } = await supabase
              .from("dates")
              .select('id, date_name, date_schedule, user_id')
              .eq("user_id", user?.id)
              .order('date_schedule', { ascending: false })
    
            if (scheduleError) {
                console.log(scheduleError.message);
            } else {
                setSchedulesList(scheduleData);
                console.log(scheduleData)
            }

        }
    }
  }

  function getLoading() {
    if (schedulesList && datesList) {
        setLoading(false)
    }
  }

  useEffect(() => {
    getDateList()
    getUpcomingDates()
    getLoading()
    console.log(loading)
  }, [])

  return (
    <Dialog>
    <div className="md:mt-8 gap-6 flex md:flex-row flex-col">
      {/* DATES TABLE */}
      <div className="flex-[5]">
        <div className="flex gap-4">
          <Link href={"/dashboard/create"}>
            <PrimaryButton className="flex items-center gap-2 h-full">
              <PlusIcon className="w-4" />
              <p className="text-[13px]">Add a Date</p>
            </PrimaryButton>
          </Link>
          <SecondaryButton className="flex justify-center items-center px-2">
            <AdjustmentsHorizontalIcon strokeWidth={1} className="w-6" />
          </SecondaryButton>
        </div>
        <Card className="mt-5 text-darkText">
          <div>
            <div className="flex py-2 px-3">
              {listHeaders.map((header) => {
                return (
                  <div key={header.header} className={`${header.className}`}>
                    <p className="text-[12px] text-darkText60">
                      {header.header}
                    </p>
                  </div>
                );
              })}
            </div>
            <LineBreak />
            <div className="flex mt-2 text-darkText max-h-[45vh] overflow-y-auto">
              {
                !datesList ? 
                    [...listHeaders, ...listHeaders, ...listHeaders, ...listHeaders, ...listHeaders].map((header, i) => {
                        return (
                            <div className="mb-2" key={`${header.header}_${i}`}>
                                <Skeleton className={`${header.className} w-full h-6 rounded-lg animate-skeleton`}/>
                            </div>
                        )
                    })
                    :
                    (

                        datesList.length ?
                        datesList.map(date => {
                            return (
                                <DialogTrigger key={date.id} asChild>
                                    <div className="duration-500 hover:bg-myBackgroundMuted cursor-pointer mt-1 py-3 px-3 rounded-xl flex w-full">
                                        <div className='flex-[3] text-darkText'>
                                            <p className="text-[13.5px]">{date.date_name}</p>
                                        </div>
                                        <div className='flex-[3] text-darkText'>
                                            <p className="text-[13.5px]">{date.short_desc}</p>
                                        </div>
                                        <div className='flex-[2] text-darkText'>
                                            <p className="text-[13.5px]">{date.duration_of_dating} {date.duration_metric}</p>
                                        </div>
                                        <div className='flex-[2] text-darkText flex gap-1 items-center'>
                                            {date.rating && date.rating >= 8 ? <FireIcon className="w-4 text-orange-500"/> : null}
                                            <p className="text-[13.5px]">{date.rating?.toFixed(1)}</p>
                                        </div>
                                        <div className='flex-[2] text-darkText'>
                                            <p className="text-[13.5px]">{date.relationship_status}</p>
                                        </div>
                                    </div>
                                </DialogTrigger>
                            )
                        }) 
                        :
                        <div className="mt-8 text-darkText">
                            <p className="text-center">No dates added yet</p>
                        </div> 
                    )
                }
            </div>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Date Info</DialogTitle>
                </DialogHeader>
                <div></div>
            </DialogContent>
          </div>
        </Card>
      </div>
      {/* UPCOMING DATES */}
      <Card className="flex-[2]">
        <div className="mb-[4rem]">
          <Header4 title="Upcoming Dates" />
        </div>
        <div className="max-h-[35vh] overflow-y-auto scrollbar">
          {/* {data.map((date, i) => {
              return (
                  <div className='mb-3 pr-3' key={`${date.dateName}_${i}`}>
                  <SingleDateList>
                  <p className='text-[15px]'>{date.dateName}</p>
                  <p className='italic text-[10px] text-darkText60'>in {date.dueDate}</p>
                  </SingleDateList>
                  </div>
                  )
                })} */}
        </div>
      </Card>
    </div>
    </Dialog>
  );
}

export default BottomBar;
