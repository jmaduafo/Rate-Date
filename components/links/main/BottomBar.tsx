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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog"

import Header6 from "@/components/Header6";
import Header5 from "@/components/Header5";

import { UserProp, DateDataProps } from "@/types/type";
import { futureTimeFromNow, scheduleFormat } from "@/utils/general/dateTimeFile";

// { userID }: {userID: string}
function BottomBar() {
  const [selectedDate, setSelectedDate] = useState<DateDataProps | undefined>();
  const [datesList, setDatesList] = useState<DateDataProps[] | undefined>();
  const [schedulesList, setSchedulesList] = useState<DateDataProps[] | undefined>();
  const [dateLoading, setDateLoading] = useState<boolean>(false);
  const [upcomingLoading, setUpcomingLoading] = useState<boolean>(false);

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

  // GETS LIST OF DATES ACCORDING TO THE AUTH ID IN ORDER OF WHEN DATE WAS CREATED
  async function getDateList() {
    setDateLoading(true)

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
                setDateLoading(false)
            } else {
                setDatesList(dateData);
                console.log(dateData)
                setDateLoading(false)
            }
        }
    }
  }

  // GET 
  async function getUpcomingDates() {
    setUpcomingLoading(true)

    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      console.log(error.message)
    } else {
        if (user) {
            const { data: scheduleData, error: scheduleError } = await supabase
              .from("dates")
              .select('id, date_name, date_schedule, user_id')
              .eq("user_id", user?.id) 
              .not("date_schedule", 'is', null)
              .order('date_schedule', { ascending: true })
    
            if (scheduleError) {
                console.log(scheduleError.message);
                setUpcomingLoading(false)
            } else {
                setSchedulesList(scheduleData);
                setUpcomingLoading(false)
            }

        }
    }
  }

  useEffect(() => {
    getDateList()
    getUpcomingDates()
  }, [])

  async function handleDelete(id: string) {
    const { error } = await supabase
    .from('dates')
    .delete()
    .eq('id', id)

    if (error) {
      toast({
        title: "Whoops! An error occurred",
        description: error.message
      })
    } else {
      toast({
        title: "Success!",
        description: "Date was deleted successfully!"
      })      
    }
  }

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
            <div className="flex gap-3 py-2 px-3">
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
              {
                dateLoading || !datesList ? 
                    <div className="mt-2 text-darkText max-h-[45vh] overflow-y-auto">

                    {[0, 1, 2, 3, 4, 5].map((header, i) => {
                        return (
                            <div className="flex items-center w-full mt-4" key={`${header}`}  >
                                <div className="flex-[3] h-5">
                                    <Skeleton className="animate-skeleton h-full w-[60%] rounded-full"/>
                                </div>
                                <div className="flex-[3] h-5">
                                    <Skeleton className="animate-skeleton h-full w-[60%] rounded-full"/>
                                </div>
                                <div className="flex-[2] h-5">
                                    <Skeleton className="animate-skeleton h-full w-[60%] rounded-full"/>
                                </div>
                                <div className="flex-[2] h-5">
                                    <Skeleton className="animate-skeleton h-full w-[60%] rounded-full"/>
                                </div>
                                <div className="flex-[2] h-5">
                                    <Skeleton className="animate-skeleton h-full w-[60%] rounded-full"/>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    :
                    (
                        datesList.length ?
                        <div className=" mt-2 text-darkText max-h-[45vh] overflow-y-auto">
                        {datesList.map(date => {
                            return (
                                <DialogTrigger key={date.id} asChild onClick={() => setSelectedDate(date)}>
                                    <div className="flex gap-3 duration-500 hover:bg-myBackgroundMuted cursor-pointer mt-1 py-3 px-3 rounded-xl w-full">
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
                        })} 
                        </div>
                        :
                        <div className="mt-8 text-darkText">
                            <p className="text-center">No dates added yet</p>
                        </div> 
                    )
                }
            {/* DIALOG POP UP */}
            <DialogContent>
                <DialogHeader>
                  <div className="mb-5">
                    <DialogTitle>Full Info</DialogTitle>
                  </div>
                </DialogHeader>
                    {
                      selectedDate ?
                      <>
                      <div className="max-h-[60vh] overflow-y-auto scrollbar pr-4">
                        <DialogNormalDisplay title="Name" data={selectedDate?.date_name}/>
                        <DialogNormalDisplay title="Age" data={selectedDate?.date_age}/>
                        <DialogNormalDisplay title="Description" data={selectedDate?.short_desc}/>
                        <div className="mb-4">
                            <div className="mb-2 flex justify-start">
                              <Header6 title={'First Meet'}/>
                            </div>
                            <div className="flex justify-start">
                              <p className="text-[13px] text-left">{selectedDate?.first_meet}</p>
                            </div>
                        </div>
                        <DialogNormalDisplay title="Still Seeing?" data={selectedDate?.is_seeing ? 'Yes' : 'No'}/>
                        <DialogNormalDisplay title="Duration" data={`${selectedDate?.duration_of_dating} ${selectedDate?.duration_metric}`}/>
                        <DialogNormalDisplay title="Relationship Status" data={`${selectedDate?.relationship_status}`}/>
                        {selectedDate?.physical_attraction && <DialogNormalDisplay title="Physical Attraction" data={selectedDate?.physical_attraction}/>}
                        {selectedDate?.emotional_attraction && <DialogNormalDisplay title="Emotional Attraction" data={selectedDate?.emotional_attraction}/>}
                        {selectedDate?.date_schedule && <DialogNormalDisplay title="Future Date" data={scheduleFormat(selectedDate?.date_schedule)}/>}
                        <DialogNormalDisplay title="Rating" data={selectedDate?.rating}/>
                        {/* ICKS LIST */}
                        {selectedDate?.icks && selectedDate?.icks?.length ?
                          <div className="mb-4">
                            <div className="mb-2 flex justify-start">
                              <Header6 title={'Icks'}/>
                            </div>
                            <div className="flex justify-start">
                              <div>
                            {selectedDate?.icks?.map((data, i) => {
                              return (
                                <div key={data} className="flex gap-2">
                                  <p className="text-[14px]">{i + 1}.</p>
                                  <p className="text-[13px] text-left">{data}</p>
                                </div>
                                )
                              })}
                              </div>
                            </div>
                          </div>
                         :
                         null
                        }
                        {/* GREEN FLAGS LIST */}
                        {selectedDate?.green_flags && selectedDate?.green_flags?.length ?
                          <div className="mb-4">
                            <div className="mb-2 flex justify-start">
                              <Header6 title={'Green Flags'}/>
                            </div>
                            <div className="flex justify-start">
                              <div>
                            {selectedDate?.green_flags?.map((data, i) => {
                              return (
                                <div key={data} className="flex gap-2">
                                  <p className="text-[14px]">{i + 1}.</p>
                                  <p className="text-[13px] text-left">{data}</p>
                                </div>
                                )
                              })}
                              </div>
                            </div>
                          </div>
                         :
                         null
                        }
                        {/* RED FLAGS LIST */}
                        {selectedDate?.red_flags && selectedDate?.red_flags?.length ?
                          <div className="mb-4">
                            <div className="mb-2 flex items-end justify-start">
                              <Header6 title={'Red Flags'}/>
                            </div>
                            <div className="flex justify-start">
                              <div>
                            {selectedDate?.red_flags?.map((data, i) => {
                              return (
                                <div key={data} className="flex gap-2">
                                  <p className="text-[14px]">{i+1}.</p>
                                  <p className="text-[13px] text-left">{data}</p>
                                </div>
                                )
                              })}
                              </div>
                            </div>
                          </div>
                         :
                         null
                        }
                        {/* ADDITIONAL DESCRIPTION */}
                        {selectedDate?.additional_desc && selectedDate?.additional_desc?.length ?
                          <div className="mb-4">
                            <div className="mb-2 flex justify-start">
                              <Header6 title={'Additional Info'}/>
                            </div>
                            <div className="flex justify-start">
                              <p className="text-[13px] text-left">{selectedDate?.additional_desc}</p>
                            </div>
                          </div>
                         :
                         null
                        }
                        {/* NSFW SECTION */}
                        {selectedDate?.nsfw === true &&
                        <>
                          <div className="my-2">
                            <Header5 title="NSFW section"/>
                          </div>
                          <DialogNormalDisplay title="Kissing Skills" data={selectedDate?.nsfw_kissing_skills}/>
                          <DialogNormalDisplay title="Oral skills" data={selectedDate?.nsfw_oral_skills}/>
                          <DialogNormalDisplay title="Stroke Game" data={selectedDate?.nsfw_stroke_game}/>
                          <DialogNormalDisplay title="Dirty Talk" data={selectedDate?.nsfw_dirty_talk}/>
                          <DialogNormalDisplay title="Creativity" data={selectedDate?.nsfw_creativity}/>
                          <DialogNormalDisplay title="Kink Level" data={selectedDate?.nsfw_kink_level}/>
                          <DialogNormalDisplay title="Orgasm?" data={selectedDate?.nsfw_big_o ? 'Yes' : 'No'}/>
                        </>
                        }
                      </div>
                      <DialogFooter>
                        <div className="flex justify-end items-center gap-3">
                          <Link href={`/dashboard/edit/${selectedDate?.id}`}>
                          <button className="hover:opacity-70 duration-500 bg-myForeground text-darkText text-[13px] px-5 py-2 rounded-lg border-none outline-none">
                            Edit Date
                          </button>
                          </Link>
                          <DialogClose>
                            <button onClick={() => handleDelete(selectedDate?.id)} className="hover:opacity-70 duration-500 text-destructive-foreground bg-destructive text-[13px] px-5 py-2 rounded-lg border-none outline-none">
                              Delete Date
                            </button>
                          </DialogClose>
                        </div>
                      </DialogFooter>
                      </>
                      :
                      <div className="flex flex-col gap-4">
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[80%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[70%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[50%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[70%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[80%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[75%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="mt-5 h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[50%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[85%] bg-myBackground60 rounded-full"/>
                        </div>
                        <div className="h-4 w-full">
                          <Skeleton className="animate-skeleton h-full w-[40%] bg-myBackground60 rounded-full"/>
                        </div>
                      </div>

                    }
            </DialogContent>
            
          </div>
        </Card>
      </div>
      {/* UPCOMING DATES SCHEDULES */}
      <Card className="flex-[2]">
        <div className="mb-[4rem]">
          <Header4 title="Upcoming Dates" />
        </div>
        <div className="max-h-[35vh] overflow-y-auto scrollbar">
          {schedulesList && schedulesList.length ? 
          schedulesList?.map((date) => {
              return (
                // futureTimeFromNow(...) returns negative numbers so should be rendered 
                // when the output is less than 0 and not appear if greater than 0
                date.date_schedule && futureTimeFromNow(date.date_schedule) <= 0 ? (
                  <div className='mb-3 pr-3' key={date.id}>
                    <SingleDateList>
                    <p className='text-[15px]'>{date.date_name}</p>
                    <p className='italic text-[10px] text-darkText60'>in {date.date_schedule ? Math.round(Math.abs(futureTimeFromNow(date.date_schedule))) : '-'} days</p>
                    </SingleDateList>
                  </div>
                  )
                :
                null
              )
            })
          :
          [0, 1, 2, 3, 4, 5].map(skeleton => {
            return (
              <div key={skeleton} className="mb-3">
              <Skeleton className="w-full h-7 rounded-full bg-myBackground60 animate-skeleton"/>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
    </Dialog>
  );
}

export default BottomBar;

function DialogNormalDisplay({title, data}: {title: string, data: string | number | boolean | undefined | null}) {
  return (
    <div className="mb-2 flex justify-between items-center">
      <div className="mb-1">
        <Header6 title={title}/>
      </div>
      <p className="text-[13px] text-white">{data}</p>
    </div>
  )
}
