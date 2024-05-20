"use client";

import React, { useState, useEffect, Fragment } from "react";
import Card from "@/components/Card";
import { useToast } from "@/components/ui/use-toast";
import { getInitials } from "@/utils/general/initials";
import { getZodiac } from "@/utils/general/zodiacSign";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

import { useRouter } from "next/navigation";

import Header4 from "@/components/Header4";
import Loading from "@/components/Loading";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { UserDataProps } from "@/types/type";
import Header2 from "@/components/Header2";
import EditProfile from "./EditProfile";
import LineBreak from "@/components/LineBreak";
import CollectionCard from "../../CollectionCard";
import SelectedBanner from "@/components/SelectedBanner";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function LeftBar() {
  const supabase = createClient();

  const { toast } = useToast();
  const [userSelect, setUserSelect] = useState<string | undefined>(
    "Date Ideas"
  );

  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <section>
      {/* USER'S STORIES AND DATE IDEAS SECTION */}
      <section className="">
        <div className="">
          {userSelect === "Date Ideas" ? (
            <Link href="/the-corner/ideas/create">
              <div className="flex items-center gap-2 text-darkText mb-3">
                <PlusCircleIcon className="w-6" />
                <p className="text-[15px] tracking-tighter">
                  Create a date idea
                </p>
              </div>
            </Link>
          ) : (
            userSelect === "Date Stories" && (
              <Link href='/the-corner/stories/create'>
                <div className="flex items-center gap-2 text-darkText mb-3">
                  <PlusCircleIcon className="w-6" />
                  <p className="text-[15px] tracking-tighter">
                    Create a date story
                  </p>
                </div>
              </Link>
            )
          )}
        </div>
        <div className="flex justify-center items-center gap-3 mb-10">
          <SelectedBanner
            title="Date Ideas"
            setSelect={setUserSelect}
            select={userSelect}
          />
          <SelectedBanner
            title="Date Stories"
            setSelect={setUserSelect}
            select={userSelect}
          />
          <SelectedBanner
            title="My Saves"
            setSelect={setUserSelect}
            select={userSelect}
          />
        </div>
        <div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
            return (
              <Fragment key={col}>
                <CollectionCard />
              </Fragment>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default LeftBar;
