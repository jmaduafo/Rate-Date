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
import CollectionCard from "../CollectionCard";

function LeftBar() {
  const supabase = createClient();

  const { toast } = useToast();

  const [userData, setUserData] = useState<UserDataProps[] | null>();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [pronounsText, setPronounsText] = useState<string | undefined>("");
  const [birthday, setBirthday] = useState<string | undefined>("");
  const [relationStatus, setRelationStatus] = useState<string | undefined>("");
  const [orientation, setOrientation] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  async function getUserInfo() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      router.push("/login");
      router.refresh();
    } else {
      // FINDS WHERE ID MATCHES
      const { data: dataInfo, error: errorMessage } = await supabase
        .from("users")
        .select()
        .eq("id", data?.user?.id);

      if (errorMessage) {
        toast({
          title: "Uh oh! Something went wrong",
          description: errorMessage.message,
        });
      }

      setUserData(dataInfo);

      if (dataInfo) {
        setName(dataInfo[0]?.name);
        setUsername(dataInfo[0]?.username);
        setPronounsText(
          dataInfo[0]?.pronouns ? dataInfo[0]?.pronouns : undefined
        );
        setBirthday(dataInfo[0]?.birthday ? dataInfo[0]?.birthday : undefined);
        setRelationStatus(dataInfo[0]?.relationship_status ?? undefined);
        setOrientation(dataInfo[0]?.sexual_orientation ?? undefined);
        setBio(dataInfo[0]?.bio ?? undefined);
        setIsPrivate(dataInfo[0]?.private ?? false);
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.length || !username.length) {
      toast({
        title: "Whoops!",
        description:
          "Name and username cannot be left empty. Please fill in these fields.",
      });
    } else {
      setLoading(true);
      if (userData) {
        const { error } = await supabase
          .from("users")
          .update({
            username,
            bio,
            pronouns: pronounsText,
            birthday,
            relationship_status:
              relationStatus === "" || relationStatus === "n/a"
                ? null
                : relationStatus,
            sexual_orientation:
              orientation === "" || orientation === "n/a" ? null : orientation,
            private: isPrivate,
          })
          .eq("id", userData[0]?.id);

        if (error) {
          toast({
            title: error.message,
          });
        } else {
          toast({
            title: "Profile updated successfully!",
          });
        }

        setLoading(false);
      }
    }
  }
  return (
    <section>
      <section>
        <Card className="w-full">
          <div className="p-3 flex md:flex-row flex-col items-start gap-8">
            <div className="md:block md:w-fit w-full flex items-center justify-center">
              {userData && userData[0]?.name && !userData[0].image ? (
                <div className="w-[10rem] h-[10rem] bg-background rounded-full flex justify-center items-center">
                  <h2 className="text-[3rem] text-foreground font-bold uppercase">
                    {getInitials(userData[0]?.name)}
                  </h2>
                </div>
              ) : userData && userData[0].image ? (
                <div></div>
              ) : (
                <Skeleton className="animate-skeleton w-[10rem] h-[10rem] rounded-full" />
              )}
            </div>
            <div className="flex-[1]">
              {userData && userData[0]?.name ? (
                <div>
                  <div className="flex justify-between items-start mb-8 px-3">
                    <div>
                      <Header2 title={userData[0]?.name} />
                      <p className="mt-[-10px] tracking-tighter text-darkText60">
                        @{userData[0]?.username}
                      </p>
                    </div>
                    <EditProfile
                      userData={userData}
                      loading={loading}
                      updateProfile={updateProfile}
                      setBio={setBio}
                      bio={bio}
                      setBirthday={setBirthday}
                      setOrientation={setOrientation}
                      setIsPrivate={setIsPrivate}
                      setUsername={setUsername}
                      setName={setName}
                      setPronounsText={setPronounsText}
                      setRelationStatus={setRelationStatus}
                      birthday={birthday}
                      orientation={orientation}
                      isPrivate={isPrivate}
                      username={username}
                      name={name}
                      pronounsText={pronounsText}
                      relationStatus={relationStatus}
                    />
                  </div>
                  <LineBreak />
                  <div className="mt-3 px-3">
                    <p className="text-[15px] text-darkText60 tracking-tight leading-tight">
                      {userData[0]?.bio}
                    </p>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </Card>
      </section>
      <section className="mt-6">
        <div className="flex items-center gap-2 text-darkText px-3">
          <PlusCircleIcon className="w-6" />
          <p className="text-[15px] tracking-tighter">Add collection</p>
        </div>
        <Card className="max-h-[60vh] w-full grid grid-cols-4 gap-4 mt-2 overflow-auto">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
            return (
              <Fragment key={col}>
                <CollectionCard
                  title="Steven McQueen"
                  classNameBgColor="bg-orange-400"
                />
              </Fragment>
            );
          })}
        </Card>
      </section>
    </section>
  );
}

export default LeftBar;
