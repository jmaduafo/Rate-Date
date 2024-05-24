"use client";
import React, { useState, useEffect, Fragment } from "react";
import Card from "@/components/Card";
import UsersList from "./UsersList";
import RecommendedList from "./RecommendedList";
import Header3 from "@/components/Header3";
import Header4 from "@/components/Header4";
import { createClient } from "@/utils/supabase/client";
import { UserDataProps } from "@/types/type";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function MainRightBar() {
  const [lateUsers, setLateUsers] = useState<UserDataProps[] | undefined>();
  const [ currentUser, setCurrentUser ] = useState<string | undefined>()

  const supabase = createClient();

  const latestUsers = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    setCurrentUser(userData?.user?.id)

    if (userError) {
        console.log(userError.message)
    } else {
        const { data, error } = await supabase
          .from("users")
          .select("id, name, username, image")
          .order("created_at", { ascending: false })
          .limit(4);
    
        if (error) {
          console.log(error.message);
        } else {
          setLateUsers(data);
        }

    }

  };

  useEffect(() => {
    latestUsers();
  }, []);

  return (
    <section className="md:sticky top-[20px]">
      <section>
        <Card>
          <div className="">
            <Header4 title={"Latest Users"} />
          </div>
          <div className="mt-2">
            {lateUsers && lateUsers?.length
              ? lateUsers?.map((user) => {
                  return (
                    <Fragment key={user.id}>
                      <Link href={user?.id === currentUser ? '/profile' : `/profile/${user.username}`}>
                        <UsersList user={user} />
                      </Link>
                    </Fragment>
                  );
                })
              : [0, 1, 2, 3].map((el) => {
                  return (
                    <div key={el} className="flex items-center gap-4 py-3 px-2">
                      <Skeleton className="w-[40px] h-[40px] rounded-full animate-skeleton" />
                      <div className="flex-[1]">
                        <Skeleton className="h-5 w-[65%] rounded-lg animate-skeleton" />
                        <Skeleton className="mt-1 h-4 w-[45%] rounded-lg animate-skeleton" />
                      </div>
                    </div>
                  );
                })}
          </div>
        </Card>
      </section>
      <section className="mt-4">
        <Card className="">
          <div className="">
            <Header4 title={"Recommended"} />
          </div>
          <div className="mt-2 max-h-[40vh] overflow-auto scrollbar pr-2">
            {[0, 1, 2, 3].map((el) => {
              return (
                <Fragment key={el}>
                  <RecommendedList />
                </Fragment>
              );
            })}
          </div>
        </Card>
      </section>
    </section>
  );
}

export default MainRightBar;
