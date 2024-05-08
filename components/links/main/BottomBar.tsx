"use client";

import React, { useState, useEffect, Fragment } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { FireIcon } from "@heroicons/react/24/solid";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
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
  DialogClose,
} from "@/components/ui/dialog";

import Header6 from "@/components/Header6";
import Header5 from "@/components/Header5";

import { UserProp, DateDataProps } from "@/types/type";
import {
  futureTimeFromNow,
  scheduleFormat,
} from "@/utils/general/dateTimeFile";
import Loading from "@/components/Loading";

function BottomBar() {
  // HANDLES GETTING THE DIALOG FOR ONE INDIVIDUAL DATE
  const [selectedDate, setSelectedDate] = useState<DateDataProps | undefined>();
  // GETS ALL THE DATES DATA AND RENDERS INTO A TABLE
  const [datesList, setDatesList] = useState<DateDataProps[] | undefined>();
  const [dateLoading, setDateLoading] = useState<boolean>(false);

  const [schedulesList, setSchedulesList] = useState<
    DateDataProps[] | undefined
  >();
  const [upcomingLoading, setUpcomingLoading] = useState<boolean>(false);

  // FOR SCHEDULING AN UPCOMING DATE
  const [scheduleName, setScheduleName] = useState<string | undefined>("");
  const [scheduleDate, setScheduleDate] = useState<string | undefined>("");
  const [scheduleID, setScheduleID] = useState<string | undefined>("");

  const [updateScheduleName, setUpdateScheduleName] = useState<
    string | undefined
  >("");
  const [updateScheduleDate, setUpdateScheduleDate] = useState<
    string | undefined
  >("");

  const [scheduleLoading, setScheduleLoading] = useState<boolean>(false);

  const [selectedSchedule, setSelectedSchedule] = useState<
    DateDataProps | undefined
  >();
  const [updateSchedule, setUpdateSchedule] = useState<boolean>(false);

  const [userID, setUserID] = useState<string | undefined>("");
  const [open, setOpen] = useState(false);

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

  async function getScheduleDates() {
    setUpcomingLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
    } else {
      // GETS THE SCHEDULE DATA
      const { data: scheduleData, error: scheduleError } = await supabase
        .from("schedules")
        .select()
        .eq("user_id", user?.id)
        .order("date_schedule", { ascending: true });

      // SCHEDULES DATE
      if (scheduleError) {
        console.log(scheduleError.message);
        setUpcomingLoading(false);
      } else {
        setSchedulesList(scheduleData);
        setUpcomingLoading(false);
      }
    }
  }

  async function getDates() {
    setDateLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
    } else {
      setUserID(user?.id);
      // GETS THE DATE LIST DATA
      const { data: dateData, error: dateError } = await supabase
        .from("dates")
        .select()
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (dateError) {
        console.log(dateError.message);
        setDateLoading(false);
      } else {
        setDatesList(dateData);
        setDateLoading(false);
      }
    }
  }

  async function schedulesInsertListen() {
    const channel = supabase
      .channel("schedule changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "schedules",
          // Only care about dates where the user_id matches the user's id
          filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          if (schedulesList) {
            setSchedulesList([...schedulesList, payload.new as DateDataProps]);
          }
          console.log(payload)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function schedulesDeleteListen() {
    const channel = supabase
      .channel("schedule changes")
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "schedules",
          // Only care about dates where the user_id matches the user's id
          filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          if (schedulesList) {
            const filter = schedulesList?.filter(sch => sch.id === scheduleID)
            setSchedulesList(filter);
            console.log(payload)
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function schedulesUpdateListen() {
    const channel = supabase
      .channel("schedule changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "schedules",
          // Only care about dates where the user_id matches the user's id
          filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          if (schedulesList) {
            setSchedulesList([...schedulesList, payload.old as DateDataProps]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  async function datesListen() {
    const channel = supabase
      .channel("date changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "dates",
          // Only care about dates where the user_id matches the user's id
          filter: `user_id=eq.${userID}`,
        },
        (payload) => {
          if (datesList) {
            setDatesList([...datesList, payload.new as DateDataProps]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  useEffect(() => {
    getDates();
    getScheduleDates();
  }, []);

  useEffect(() => {
    schedulesInsertListen();
    // schedulesUpdateListen();
    // schedulesDeleteListen();
    datesListen();
  }, [
    userID,
    supabase,
    datesList,
    schedulesList,
    setDatesList,
    setSchedulesList,
  ]);

  function checkOpen() {
    if (!open) {
      setUpdateSchedule(false);
    }
  }

  useEffect(() => {
    checkOpen();
  }, [open]);

  // INSERT, UPDATE, DELETE REQUESTS

  // MANAGES DELETION OF A DATE
  async function handleDateDelete(id: string) {
    const { error } = await supabase.from("dates").delete().eq("id", id);

    if (error) {
      toast({
        title: "Whoops! An error occurred",
        description: error.message,
      });
    } else {
      toast({
        title: "Success!",
        description: "Date was deleted successfully!",
      });
    }
  }

  async function handleAddDateSchedule(e: React.FormEvent) {
    e.preventDefault();

    if (!scheduleDate || !scheduleName) {
      toast({
        title: "Entries must not be left empty",
        description: "Please fill out all fields above",
      });
    } else {
      setScheduleLoading(true);
      const { error } = await supabase.from("schedules").insert({
        date_name: scheduleName,
        date_schedule: scheduleDate,
      });

      if (error) {
        toast({
          title: "Whoops! An error occurred",
          description: error.message,
        });
      } else {
        toast({
          title: "Success!",
          description: "Date was scheduled successfully!",
        });
      }

      setScheduleLoading(false);
    }
  }

  function updateScheduleTrue() {
    setUpdateSchedule(true);

    setUpdateScheduleName(selectedSchedule?.date_name);
    setUpdateScheduleDate(
      selectedSchedule?.date_schedule
        ? selectedSchedule?.date_schedule
            ?.toString()
            .split(" ")
            .join("T")
            .split("+")[0]
        : undefined
    );
  }
  
  async function handleDeleteSchedule() {
    
    setScheduleLoading(true);
    const { error } = await supabase
      .from("schedules")
      .delete()
      .eq("id", scheduleID);

    if (error) {
      toast({
        title: "Whoops! An error occurred",
        description: error.message,
      });
    } else {
      toast({
        title: "Success!",
        description: `Your date was deleted successfully!`,
      });
    }
  }

  async function handleUpdateSchedule(e: React.FormEvent) {
    e.preventDefault();

    if (!updateScheduleDate || !updateScheduleName) {
      toast({
        title: "Entries must not be left empty",
        description: "Please fill out all fields above",
      });
    } else {
      setScheduleLoading(true);
      const { error } = await supabase
        .from("schedules")
        .update({
          date_name: updateScheduleName,
          date_schedule: updateScheduleDate,
        })
        .eq("id", scheduleID);

      if (error) {
        toast({
          title: "Whoops! An error occurred",
          description: error.message,
        });
      } else {
        toast({
          title: "Success!",
          description: `Your date with ${selectedSchedule?.date_name} was updated successfully!`,
        });
      }

      setScheduleLoading(false);
    }
  }

  return (
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
        <Dialog>
          <Card className="mt-5 text-darkText">
            <div>
              {datesList && datesList?.length ? (
                <>
                  <div className="flex gap-3 py-2 px-3">
                    {listHeaders.map((header) => {
                      return (
                        <div
                          key={header.header}
                          className={`${header.className}`}
                        >
                          <p className="text-[12px] text-darkText60">
                            {header.header}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <LineBreak />
                </>
              ) : null}
              {dateLoading || !datesList ? (
                <div className="mt-2 text-darkText max-h-[45vh] overflow-y-auto">
                  {[0, 1, 2, 3, 4, 5].map((header, i) => {
                    return (
                      <div
                        className="flex items-center w-full mt-4"
                        key={`${header}`}
                      >
                        <div className="flex-[3] h-5">
                          <Skeleton className="animate-skeleton h-full w-[60%] rounded-full" />
                        </div>
                        <div className="flex-[3] h-5">
                          <Skeleton className="animate-skeleton h-full w-[60%] rounded-full" />
                        </div>
                        <div className="flex-[2] h-5">
                          <Skeleton className="animate-skeleton h-full w-[60%] rounded-full" />
                        </div>
                        <div className="flex-[2] h-5">
                          <Skeleton className="animate-skeleton h-full w-[60%] rounded-full" />
                        </div>
                        <div className="flex-[2] h-5">
                          <Skeleton className="animate-skeleton h-full w-[60%] rounded-full" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : datesList.length ? (
                <div className=" mt-2 text-darkText max-h-[45vh] overflow-y-auto">
                  {datesList.map((date) => {
                    return (
                      <DialogTrigger
                        key={date.id}
                        asChild
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="flex gap-3 duration-500 hover:bg-myBackgroundMuted cursor-pointer mt-1 py-3 px-3 rounded-xl w-full">
                          <div className="flex-[3] text-darkText">
                            <p className="text-[13.5px]">{date.date_name}</p>
                          </div>
                          <div className="flex-[3] text-darkText">
                            <p className="text-[13.5px]">{date.short_desc}</p>
                          </div>
                          <div className="flex-[2] text-darkText">
                            <p className="text-[13.5px]">
                              {date.duration_of_dating} {date.duration_metric}
                            </p>
                          </div>
                          <div className="flex-[2] text-darkText flex gap-1 items-center">
                            {date.rating && date.rating >= 8 ? (
                              <FireIcon className="w-4 text-orange-500" />
                            ) : null}
                            <p className="text-[13.5px]">
                              {date.rating?.toFixed(1)}
                            </p>
                          </div>
                          <div className="flex-[2] text-darkText">
                            <p className="text-[13.5px]">
                              {date.relationship_status}
                            </p>
                          </div>
                        </div>
                      </DialogTrigger>
                    );
                  })}
                </div>
              ) : (
                <div className="my-8 text-darkText">
                  <p className="text-center text-[14px]">No dates added yet</p>
                </div>
              )}
              {/* DATES INFORMATION DIALOG POP UP */}
              <DialogContent>
                <DialogHeader>
                  <div className="mb-5">
                    <DialogTitle>Full Info</DialogTitle>
                  </div>
                </DialogHeader>
                {selectedDate ? (
                  <>
                    <div className="max-h-[60vh] overflow-y-auto scrollbar pr-4">
                      <DialogNormalDisplay
                        title="Name"
                        data={selectedDate?.date_name}
                      />
                      <DialogNormalDisplay
                        title="Age"
                        data={selectedDate?.date_age}
                      />
                      <DialogNormalDisplay
                        title="Description"
                        data={selectedDate?.short_desc}
                      />
                      <div className="mb-4">
                        <div className="mb-2 flex justify-start">
                          <Header6 title={"First Meet"} />
                        </div>
                        <div className="flex justify-start">
                          <p className="text-[13px] text-left">
                            {selectedDate?.first_meet}
                          </p>
                        </div>
                      </div>
                      <DialogNormalDisplay
                        title="Still Seeing?"
                        data={selectedDate?.is_seeing ? "Yes" : "No"}
                      />
                      <DialogNormalDisplay
                        title="Duration"
                        data={`${selectedDate?.duration_of_dating} ${selectedDate?.duration_metric}`}
                      />
                      <DialogNormalDisplay
                        title="Relationship Status"
                        data={`${selectedDate?.relationship_status}`}
                      />
                      {selectedDate?.physical_attraction && (
                        <DialogNormalDisplay
                          title="Physical Attraction"
                          data={selectedDate?.physical_attraction}
                        />
                      )}
                      {selectedDate?.emotional_attraction && (
                        <DialogNormalDisplay
                          title="Emotional Attraction"
                          data={selectedDate?.emotional_attraction}
                        />
                      )}
                      {selectedDate?.date_schedule && (
                        <DialogNormalDisplay
                          title="Future Date"
                          data={scheduleFormat(selectedDate?.date_schedule)}
                        />
                      )}
                      <DialogNormalDisplay
                        title="Rating"
                        data={selectedDate?.rating}
                      />
                      {/* ICKS LIST */}
                      {selectedDate?.icks && selectedDate?.icks?.length ? (
                        <div className="mb-4">
                          <div className="mb-2 flex justify-start">
                            <Header6 title={"Icks"} />
                          </div>
                          <div className="flex justify-start">
                            <div>
                              {selectedDate?.icks?.map((data, i) => {
                                return (
                                  <div key={data} className="flex gap-2">
                                    <p className="text-[14px]">{i + 1}.</p>
                                    <p className="text-[13px] text-left">
                                      {data}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {/* GREEN FLAGS LIST */}
                      {selectedDate?.green_flags &&
                      selectedDate?.green_flags?.length ? (
                        <div className="mb-4">
                          <div className="mb-2 flex justify-start">
                            <Header6 title={"Green Flags"} />
                          </div>
                          <div className="flex justify-start">
                            <div>
                              {selectedDate?.green_flags?.map((data, i) => {
                                return (
                                  <div key={data} className="flex gap-2">
                                    <p className="text-[14px]">{i + 1}.</p>
                                    <p className="text-[13px] text-left">
                                      {data}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {/* RED FLAGS LIST */}
                      {selectedDate?.red_flags &&
                      selectedDate?.red_flags?.length ? (
                        <div className="mb-4">
                          <div className="mb-2 flex items-end justify-start">
                            <Header6 title={"Red Flags"} />
                          </div>
                          <div className="flex justify-start">
                            <div>
                              {selectedDate?.red_flags?.map((data, i) => {
                                return (
                                  <div key={data} className="flex gap-2">
                                    <p className="text-[14px]">{i + 1}.</p>
                                    <p className="text-[13px] text-left">
                                      {data}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {/* ADDITIONAL DESCRIPTION */}
                      {selectedDate?.additional_desc &&
                      selectedDate?.additional_desc?.length ? (
                        <div className="mb-4">
                          <div className="mb-2 flex justify-start">
                            <Header6 title={"Additional Info"} />
                          </div>
                          <div className="flex justify-start">
                            <p className="text-[13px] text-left">
                              {selectedDate?.additional_desc}
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {/* NSFW SECTION */}
                      {selectedDate?.nsfw === true && (
                        <>
                          <div className="my-2">
                            <Header5 title="NSFW section" />
                          </div>
                          <DialogNormalDisplay
                            title="Kissing Skills"
                            data={selectedDate?.nsfw_kissing_skills}
                          />
                          <DialogNormalDisplay
                            title="Oral skills"
                            data={selectedDate?.nsfw_oral_skills}
                          />
                          <DialogNormalDisplay
                            title="Stroke Game"
                            data={selectedDate?.nsfw_stroke_game}
                          />
                          <DialogNormalDisplay
                            title="Dirty Talk"
                            data={selectedDate?.nsfw_dirty_talk}
                          />
                          <DialogNormalDisplay
                            title="Creativity"
                            data={selectedDate?.nsfw_creativity}
                          />
                          <DialogNormalDisplay
                            title="Kink Level"
                            data={selectedDate?.nsfw_kink_level}
                          />
                          <DialogNormalDisplay
                            title="Orgasm?"
                            data={selectedDate?.nsfw_big_o ? "Yes" : "No"}
                          />
                        </>
                      )}
                    </div>
                    <DialogFooter>
                      <div className="flex justify-end items-center gap-3">
                        <Link href={`/dashboard/edit/${selectedDate?.id}`}>
                          <button className="hover:opacity-70 duration-500 bg-myForeground text-darkText text-[13px] px-5 py-2 rounded-lg border-none outline-none">
                            Edit Date
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDateDelete(selectedDate?.id)}
                          className="hover:opacity-70 duration-500 text-destructive-foreground bg-destructive text-[13px] px-5 py-2 rounded-lg border-none outline-none"
                        >
                          Delete Date
                        </button>
                      </div>
                    </DialogFooter>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[80%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[70%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[50%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[70%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[80%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[75%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="mt-5 h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[50%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[85%] bg-myBackground60 rounded-full" />
                    </div>
                    <div className="h-4 w-full">
                      <Skeleton className="animate-skeleton h-full w-[40%] bg-myBackground60 rounded-full" />
                    </div>
                  </div>
                )}
              </DialogContent>
            </div>
          </Card>
        </Dialog>
      </div>
      {/* UPCOMING DATES SCHEDULES */}
      <Card className="flex-[2]">
        <div className="mb-[4rem] flex justify-between items-center">
          <Header4 title="Upcoming Dates" />
          {/* TRIGGER DIALOG POPUP WHEN ADD BUTTON IS CLICKED */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="bg-darkText outline-none border-none py-1 px-2 rounded-md">
                <PlusIcon strokeWidth={2} className="w-4 text-myForeground" />
              </button>
            </DialogTrigger>
            {/* SCHEDULE / RECORD A FUTURE DATE DIALOG FOR NAME AND DATE*/}
            <DialogContent>
              <form onSubmit={handleAddDateSchedule}>
                <DialogHeader className="mb-5">
                  <Header4 title="Record a Future Date" />
                </DialogHeader>
                <div className="mb-3">
                  <label className="mb-2" htmlFor="dateName">
                    Name
                  </label>
                  <input
                    id="dateName"
                    type="text"
                    placeholder="John"
                    value={scheduleName}
                    onChange={(e) => setScheduleName(e.target.value)}
                    className="text-darkText px-3 py-1 w-full border-none outline-none rounded text-[14px]"
                  />
                </div>
                <div>
                  <label className="mb-2" htmlFor="schedule">
                    Select a Date
                  </label>
                  <input
                    id="schedule"
                    type="datetime-local"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="text-darkText px-3 py-1 w-full border-none outline-none rounded text-[14px]"
                  />
                </div>
                <DialogFooter className="mt-7">
                  <button
                    type="submit"
                    className="w-full text-myForeground bg-green-700 rounded border-none outline-none px-3 py-2 text-[15px]"
                  >
                    {scheduleLoading ? (
                      <Loading
                        classNameColor="border-t-myForeground"
                        classNameSize="w-[30px] h-[30px]"
                      />
                    ) : (
                      "Add Record"
                    )}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="max-h-[35vh] overflow-y-auto scrollbar">
          {/* FULL SCHEDULE INFO DISPLAYING NAME AND DATE */}
          <Dialog open={open} onOpenChange={setOpen}>
            {upcomingLoading || !schedulesList ? (
              [0, 1, 2, 3, 4, 5].map((skeleton) => {
                return (
                  <div key={skeleton} className="mb-3">
                    <Skeleton className="w-full h-7 rounded-full bg-myBackground60 animate-skeleton" />
                  </div>
                );
              })
            ) : schedulesList.length ? (
              schedulesList?.map((date) => {
                return (
                  // futureTimeFromNow(...) returns negative numbers so should be rendered
                  // when the output is less than 0 and not appear if greater than 0
                  date.date_schedule &&
                    futureTimeFromNow(date.date_schedule) <= 0 ? (
                    <div className="mb-3 pr-3" key={date.id} onClick={() => setScheduleID(date.id)}>
                      <DialogTrigger
                        onClick={() => setSelectedSchedule(date)}
                        asChild
                      >
                        <div className="flex justify-between items-center w-full px-4 py-3 shadow-md rounded-2xl hover:bg-myBackgroundMuted cursor-pointer duration-500">
                          <p className="text-[15px]">{date.date_name}</p>
                          <p className="italic text-[10px] text-darkText60">
                            in{" "}
                            {date.date_schedule
                              ? Math.round(
                                  Math.abs(
                                    futureTimeFromNow(date.date_schedule)
                                  )
                                )
                              : "-"}{" "}
                            days
                          </p>
                        </div>
                      </DialogTrigger>
                    </div>
                  ) : null
                );
              })
            ) : (
              <div className="">
                <p className="text-center text-[14px]">
                  No dates scheduled yet
                </p>
              </div>
            )}
            <DialogContent>
              <DialogHeader>
                <Header4 title="Schedule Info" />
              </DialogHeader>
              {!updateSchedule ? (
                <>
                  <div>
                    <DialogNormalDisplay
                      title="Name"
                      data={selectedSchedule?.date_name}
                    />
                    <DialogNormalDisplay
                      title="Scheduled for:"
                      data={
                        selectedSchedule?.date_schedule
                          ? scheduleFormat(selectedSchedule?.date_schedule)
                          : "No date scheduled"
                      }
                    />
                  </div>
                  <DialogFooter>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() =>
                          selectedSchedule?.id && updateScheduleTrue()
                        }
                        className="hover:opacity-70 duration-500 text-darkText bg-myForeground text-[13px] px-5 py-2 rounded-lg border-none outline-none"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleDeleteSchedule
                        }
                        className="hover:opacity-70 duration-500 text-destructive-foreground bg-destructive text-[13px] px-5 py-2 rounded-lg border-none outline-none"
                      >
                        Delete
                      </button>
                    </div>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <form onSubmit={handleUpdateSchedule}>
                    <div className="mb-3">
                      <label className="mb-2" htmlFor="dateName">
                        Name
                      </label>
                      <input
                        id="dateName"
                        type="text"
                        placeholder="John"
                        value={updateScheduleName}
                        onChange={(e) => setUpdateScheduleName(e.target.value)}
                        className="text-darkText px-3 py-1 w-full border-none outline-none rounded text-[14px]"
                      />
                    </div>
                    <div>
                      <label className="mb-2" htmlFor="schedule">
                        Select a Date
                      </label>
                      <input
                        id="schedule"
                        type="datetime-local"
                        value={updateScheduleDate}
                        onChange={(e) => setUpdateScheduleDate(e.target.value)}
                        className="text-darkText px-3 py-1 w-full border-none outline-none rounded text-[14px]"
                      />
                    </div>
                    <DialogFooter className="mt-7">
                      <div className="w-full">
                        <button
                          type="submit"
                          className="w-full hover:opacity-85 duration-500 text-myForeground bg-green-700 rounded border-none outline-none px-3 py-2 text-[15px]"
                        >
                          {/* {scheduleLoading ? (
                            <Loading
                              classNameColor="border-t-myForeground"
                              classNameSize="w-[30px] h-[30px]"
                            />
                          ) : (
                            "Add Record"
                          )} */}
                          Save
                        </button>
                        <button
                          onClick={() => setUpdateSchedule(false)}
                          className="w-full mt-2 hover:opacity-85 duration-500 text-darkText bg-myForeground rounded border-none outline-none px-3 py-2 text-[15px]"
                        >
                          Back
                        </button>
                      </div>
                    </DialogFooter>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}

export default BottomBar;

function DialogNormalDisplay({
  title,
  data,
}: {
  title: string;
  data: string | number | boolean | undefined | null;
}) {
  return (
    <div className="mb-2 flex justify-between items-center">
      <div className="mb-1">
        <Header6 title={title} />
      </div>
      <p className="text-[13px] text-white">{data}</p>
    </div>
  );
}
