"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { useToast } from "@/components/ui/use-toast";
import { getInitials } from "@/utils/general/initials";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  pronouns,
  sexualOrientation,
  relationshipStatus,
} from "@/utils/general/userFormData";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Switch } from "@/components/ui/switch"

import Header4 from "@/components/Header4";
import Loading from "@/components/Loading";

type User = {
  name: string;
  username: string;
  image: string | null;
  bio: string | null;
  pronouns: string | null;
  birthday: string | null;
  relationship_status: string | null;
  sexual_orientation: string | null;
  private: boolean;
  id: string;
};

function TopBar() {
  const supabase = createClient();

  const { toast } = useToast();

  const [userData, setUserData] = useState<User[] | null>();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [pronounsText, setPronounsText] = useState<
    string | undefined 
  >("");
  const [birthday, setBirthday] = useState<
    string | undefined
  >("");
  const [relationStatus, setRelationStatus] = useState<
    string | undefined
  >("");
  const [orientation, setOrientation] = useState<
    string | undefined
  >("");
  const [bio, setBio] = useState<
    string | undefined
  >("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function getUserInfo() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      toast({
        title: "Uh oh! Something went wrong",
        description: error.message,
      });
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
        setPronounsText(dataInfo[0]?.pronouns);
        setBirthday(dataInfo[0]?.birthday);
        setRelationStatus(dataInfo[0]?.relationship_status);
        setOrientation(dataInfo[0]?.sexual_orientation);
        setBio(dataInfo[0]?.bio);
        setIsPrivate(dataInfo[0]?.private);
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!name.length || !username.length) {
      toast({
        title: "Whoops!",
        description:
          "Name and username cannot be left empty. Please fill in these fields.",
      });
    } else {
        setLoading(true)
        if (userData) {
            const { error } = await supabase
            .from("users")
            .update({
                username,
                bio,
                pronouns: pronounsText,
                birthday,
                relationship_status: relationStatus === '' || relationStatus === 'n/a' ? null : relationStatus,
                sexual_orientation: orientation === '' || orientation === 'n/a' ? null : orientation,
                private: isPrivate
            })
            .eq("id", userData[0]?.id);

            if (error) {
            toast({
                title: error.message,
            });
            } else {
                toast({
                    title: "Profile updated successfully!"
                });
                
            }
            
            setLoading(false)
        }
    }
  }

  return (
    <div>
      <Card className="">
        <div className="flex justify-between items-center">
          <div>
            {/*  */}
            {userData && !userData[0].image ? (
              <div className="w-[60px] h-[60px] bg-background rounded-full flex justify-center items-center">
                <h5 className="text-[18px] text-foreground font-bold uppercase">
                  {getInitials(userData[0]?.name)}
                </h5>
              </div>
            ) : userData && userData[0].image ? (
              <div></div>
            ) : (
              <Skeleton className="animate-skeleton w-[60px] h-[60px] rounded-full" />
            )}
            {/* USER'S NAME, USERNAME, GENDER, BIRTHDAY */}
            {userData ? <div></div> : <div></div>}
          </div>
          {/* EDIT PROFILE MENU POP UP SLIDE */}
          <div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="border-[1px] duration-500 hover:opacity-80 border-darkText text-lightText rounded-xl py-2 px-5 bg-darkText outline-none">
                  Edit Profile
                </button>
              </SheetTrigger>
              <SheetContent className="scrollbar border-l-[1px] border-mutedBorder overflow-y-auto">
                <SheetHeader>
                  <Header4 title="Edit Profile" />
                </SheetHeader>
                {/* EDIT PROFILE FORM */}
                <div className="mt-8">
                  {userData ? (
                    <form className="" onSubmit={updateProfile}>
                        {/* NAME INPUT */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          id="name"
                          type="text"
                          className="text-darkText w-full py-1 px-3 rounded-lg outline-none border-none"
                        />
                      </div>
                      {/* USERNAME INPUT */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="username">Username</label>
                        <input
                          onChange={(e) => setUsername(e.target.value)}
                          value={username}
                          id="username"
                          type="text"
                          className="text-darkText w-full py-1 px-3 rounded-lg outline-none border-none"
                        />
                      </div>
                      {/* PRONOUNS INPUT */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="pronouns">Pronouns</label>
                        <select
                          onChange={(e) => setPronounsText(e.target.value)}
                          value={pronounsText}
                          name="pronouns"
                          id="pronouns"
                          className="text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                        >
                          {pronouns.map((noun) => {
                            return (
                              <option key={noun.value} value={noun.value}>
                                {noun.innerText}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {/* BIO INPUT */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                          onChange={(e) => setBio(e.target.value)}
                          value={bio}
                          placeholder="Tell us about yourself"
                          id="bio"
                          rows={6}
                          maxLength={250}
                          className="text-darkText tracking-tight py-2 px-3 rounded-lg outline-none border-none"
                        ></textarea>
                        <div className="flex justify-end">
                          <p className="text-[12px]">
                            {typeof bio === "string" ? bio.length : 0}/250
                          </p>
                        </div>
                      </div>
                      {/* RELATIONSHIP STATUS SELECTOR */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="name">Relationship Status</label>
                        <select
                          onChange={(e) => setRelationStatus(e.target.value)}
                          value={relationStatus}
                          name="relationStatus"
                          id="relationStatus"
                          className="text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                        >
                          {relationshipStatus.map((noun) => {
                            return (
                              <option
                                key={noun.value}
                                value={noun.value}
                                className=""
                              >
                                {noun.innerText}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {/* SEXUAL ORIENTATION SELECTOR */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="name">Sexual Orientation</label>
                        <select
                          onChange={(e) => setOrientation(e.target.value)}
                          value={orientation}
                          name="relationStatus"
                          id="relationStatus"
                          className="text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                        >
                          {sexualOrientation.map((noun) => {
                            return (
                              <option
                                key={noun.value}
                                value={noun.value}
                                className=""
                              >
                                {noun.innerText}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      {/* BIRTHDAY INPUT */}
                      <div className="flex flex-col gap-2 mb-3">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                          onChange={(e) => setBirthday(e.target.value)}
                          value={birthday}
                          id="birthday"
                          type="date"
                          className="w-full text-darkText tracking-tight py-1 px-3 rounded-lg outline-none border-none"
                        />
                      </div>
                      <div className="mt-8">
                        <SheetDescription>
                            If private is checked, your wishlists will be hidden from other viewers. Your birthday will also not be shown whether checked or not.
                        </SheetDescription>
                        <div className="flex justify-end gap-3 items-center mt-4">
                            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} id='private'/>
                            <label>Private</label>
                        </div>
                      </div>
                      <div className="mt-5">
                        <button type='submit' className="w-full bg-green-700 rounded py-2">
                          {loading ? <Loading/> : 'Save'}
                        </button>
                      </div>                    
                    </form>
                  ) : (
                    <div></div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TopBar;
