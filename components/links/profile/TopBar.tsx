"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { useToast } from "@/components/ui/use-toast";
import { getInitials } from "@/utils/general/initials";
import { getZodiac } from "@/utils/general/zodiacSign";
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

import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

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
  const [pronounsText, setPronounsText] = useState<string | undefined>("");
  const [birthday, setBirthday] = useState<string | undefined>("");
  const [relationStatus, setRelationStatus] = useState<string | undefined>("");
  const [orientation, setOrientation] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter()

  async function getUserInfo() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      toast({
        title: "Uh oh! Something went wrong",
        description: error.message,
      });
      
      router.push('/login')
      router.refresh()
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
        setPronounsText(dataInfo[0]?.pronouns ? dataInfo[0]?.pronouns : undefined)
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
            
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TopBar;
