"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import LineBreak from "./LineBreak";
import { createClient } from "@/utils/supabase/client";
import { greetings } from "@/utils/general/greeting";
import { getInitials } from "@/utils/general/initials";
import {
  HomeIcon,
  ChartBarIcon,
  QueueListIcon,
  UserCircleIcon,
  ArrowRightEndOnRectangleIcon as LogoutIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Skeleton } from "@/components/ui/skeleton";
import ScreenLoading from "./ScreenLoading";
import Image from "next/image";
import Loading from "./Loading";
import Settings from "./Settings";

type User = {
  name: string;
  image: string | null;
};

function SideBar() {
  const [userData, setUserData] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [logOutLoading, setLogOutLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const supabase = createClient();
  const router = useRouter();

  const { toast } = useToast();

  const navigations = [
    {
      name: "Dashboard",
      icon: (
        <HomeIcon className="xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]" />
      ),
      link: "/dashboard",
    },
    // {
    //     name: 'Charts',
    //     icon: <ChartBarIcon className='xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]'/>,
    //     link: '/charts'
    // },
    {
      name: "The Corner",
      icon: (
        <QueueListIcon className="xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]" />
      ),
      link: "/the-corner",
    },
    {
      name: "Profile",
      icon: (
        <UserCircleIcon className="xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]" />
      ),
      link: "/profile",
    },
  ];

  async function signOut() {
    setLogOutLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLogOutLoading(false);
    } else {
      setLogOutLoading(false);
      router.push("/");
      router.refresh();
    }
  }

  async function getUserInfo() {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } else {
      // GET ONLY THE NAME IN USERS COLLECTION WHERE THE ID MATCHES THE CURRENT LOGGED IN USER
      const { data: dataName, error: errorMessage } = await supabase
        .from("users")
        .select("name, image")
        .eq("id", data?.user?.id);

      if (errorMessage) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: errorMessage.message,
        });
      } else {
        setUserData(dataName[0]);
      }

      setLoading(false);
    }
  }

  function listen() {
    const channel = supabase.channel("user listen").on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "users",
      },
      () => {
        getUserInfo();
      }
    ).subscribe()

    return () => {
        supabase.removeChannel(channel)
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    listen();
  }, [supabase, userData, setUserData]);

  return (
    <>
      <Link href="/profile">
        <div className="hover:bg-dark10 p-3 rounded-xl cursor-pointer duration-500 gap-4 items-center md:flex hidden">
          {/* PROFILE IMAGE */}
          {userData && !userData?.image ? (
            <div className="w-[50px] h-[50px] bg-myForeground rounded-full flex justify-center items-center">
              <h5 className="text-[18px] text-darkText60 font-bold uppercase">
                {getInitials(userData?.name)}
              </h5>
            </div>
          ) : userData && userData?.image && userData?.name ? (
            <div className="w-[50px] h-[50px] object-cover rounded-full">
              <Image
                src={userData?.image}
                alt={userData?.name}
                width={500}
                height={500}
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <Skeleton className="animate-skeleton w-[50px] h-[50px] rounded-full" />
          )}
          {/* GREETING WITH USER'S NAME */}
          <div>
            {userData ? (
              <>
                <p className="text-[14px] md:mb-[-5px]">Good {greetings()},</p>
                <p className="text-[14px]">{userData?.name}</p>
              </>
            ) : (
              <>
                <Skeleton className="animate-skeleton w-[70px] mb-2 h-4 rounded" />
                <Skeleton className="animate-skeleton w-[100px] h-4 rounded" />
              </>
            )}
          </div>
        </div>
      </Link>
      <nav className="md:mt-[10rem] md:block w-full flex flex-row justify-evenly items-center z-[100]">
        {navigations.map((nav) => {
          return (
            <Link key={nav.name} href={nav.link}>
              <div
                className={`${
                  pathname.slice(1).split("/")[0] === nav.name.toLowerCase() ||
                  (pathname.slice(1).split("/")[0] === "the-corner" &&
                    nav.name === "The Corner")
                    ? "md:bg-myBackground md:shadow-3xl rounded-2xl"
                    : "md:bg-transparent text-text60"
                } group duration-500 md:py-3 md:px-8 md:mb-2 flex md:flex-row md:items-center md:justify-start md:gap-6 flex-col justify-center items-center`}
              >
                {/* CHANGES ICON COLOR BASED ON PATHNAME */}
                <div
                  className={`${
                    pathname.slice(1).split("/")[0] ===
                      nav.name.toLowerCase() ||
                    (pathname.slice(1).split("/")[0] === "the-corner" &&
                      nav.name === "The Corner")
                      ? "md:text-darkText text-lightText"
                      : "group-hover:text-lightText group-hover:md:text-darkText md:text-darkText60 text-lightText60 duration-500"
                  }`}
                >
                  {nav.icon}
                </div>
                {/* CHANGES TEXT COLOR BASED ON PATHNAME */}
                <div className="">
                  <p
                    className={`${
                      pathname.slice(1).split("/")[0] ===
                        nav.name.toLowerCase() ||
                      (pathname.slice(1).split("/")[0] === "the-corner" &&
                        nav.name === "The Corner")
                        ? "md:text-darkText text-lightText"
                        : "group-hover:md:text-darkText group-hover:text-lightText md:text-darkText60 text-lightText60"
                    } duration-500 md:text-[15px] text-[9px]`}
                  >
                    {nav.name}
                  </p>
                  {pathname.slice(1).split("/")[0] === nav.name.toLowerCase() ||
                    (pathname.slice(1).split("/")[0] === "the-corner" &&
                      nav.name === "The Corner" && (
                        <div className="md:hidden w-[40%] mx-auto h-[1.5px] rounded-full bg-myForeground mt-1"></div>
                      ))}
                </div>
              </div>
            </Link>
          );
        })}
        {/* LOGOUT BUTTON */}
        <div
          onClick={signOut}
          className={`group duration-500 md:py-3 md:px-8 md:mb-2 flex md:flex-row md:items-center md:justify-start md:gap-6 flex-col justify-center items-center cursor-pointer`}
        >
          <div
            className={`'md:text-darkText group-hover:text-lightText group-hover:md:text-darkText md:text-darkText60 text-lightText60 duration-500'}`}
          >
            {logOutLoading ? (
              <Loading
                classNameColor="border-t-darkText60"
                classNameSize="w-3 h-3"
              />
            ) : (
              <LogoutIcon className="xs:w-[5.5vw] sm:w-[4vw] md:w-[20px] w-[7vw]" />
            )}
          </div>
          <div className="">
            <p
              className={`md:text-darkText text-lightText group-hover:md:text-darkText group-hover:text-lightText md:text-darkText60 text-lightText60 duration-500 md:text-[15px] text-[9px]`}
            >
              Logout
            </p>
          </div>
        </div>
      </nav>
      <div className="md:mt-[8rem]">
        <LineBreak />
        {/* SETTINGS BUTTON */}
        <Settings />
      </div>
    </>
  );
}

export default SideBar;
