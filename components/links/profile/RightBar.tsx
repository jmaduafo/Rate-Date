"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import DemographicChart from "./DemographicChart";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { EthnicDataProps, ImageProps, UserDataProps } from "@/types/type";
import UserInfo from "./UserInfo";
import EditProfile from "./EditProfile";
import { useToast } from "@/components/ui/use-toast";
import SecondaryButton from "@/components/SecondaryButton";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";

function RightBar() {
  const [userData, setUserData] = useState<UserDataProps[] | undefined>();
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [changeImage, setChangeImage] = useState<ImageProps | undefined>(
    undefined
  );
  const [username, setUsername] = useState<string>("");
  const [pronounsText, setPronounsText] = useState<string | undefined>("");
  const [birthday, setBirthday] = useState<string | undefined>("");
  const [relationStatus, setRelationStatus] = useState<string | undefined>("");
  const [orientation, setOrientation] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | undefined>();

  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  async function getUserProfile() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    setUserID(userData?.user?.id);

    if (userError) {
      router.push("/login");
      router.refresh();
    } else {
      // FINDS WHERE ID MATCHES
      const { data: dataInfo, error: errorMessage } = await supabase
        .from("users")
        .select()
        .eq("id", userData?.user?.id);

      if (errorMessage) {
        toast({
          title: "Uh oh! Something went wrong",
          description: errorMessage.message,
        });
      } else {
        setUserData(dataInfo);

        if (dataInfo) {
          setName(dataInfo[0]?.name);
          setUsername(dataInfo[0]?.username);
          setPronounsText(
            dataInfo[0]?.pronouns ? dataInfo[0]?.pronouns : undefined
          );
          setProfileImage(dataInfo[0]?.image ? dataInfo[0]?.image : undefined);
          setBirthday(
            dataInfo[0]?.birthday ? dataInfo[0]?.birthday : undefined
          );
          setRelationStatus(dataInfo[0]?.relationship_status ?? undefined);
          setOrientation(dataInfo[0]?.sexual_orientation ?? undefined);
          setBio(dataInfo[0]?.bio ?? undefined);
          setIsPrivate(dataInfo[0]?.private ?? false);
        }
      }
    }
  }

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
      if (userData && userID) {
        // console.log(profileImage?.imagePreview + ';' + profileImage?.file)
        const { data: storageData, error: storageError } =
          await supabase.storage
            .from("profile")
            .upload(userID + "/" + uuidv4(), changeImage?.file as File);

        if (storageError) {
          console.log(storageError.message);
        } else {
          const { error } = await supabase
            .from("users")
            .update({
              username,
              bio,
              pronouns: pronounsText,
              birthday,
              image: profileImage
                ? `https://oevsvjkpdlznvfenlttz.supabase.co/storage/v1/object/public/profile/${storageData?.path}`
                : null,
              relationship_status:
                relationStatus === "" || relationStatus === "n/a"
                  ? null
                  : relationStatus,
              sexual_orientation:
                orientation === "" || orientation === "n/a"
                  ? null
                  : orientation,
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
        }

        setLoading(false);
      }
    }
  }

  useEffect(() => {
    // getEthnicities();
    getUserProfile();
  }, []);

  return (
    <section className="relative">
      <Card className="md:sticky top-0 w-full flex justify-center items-center">
        {/* <DemographicChart ethnicData={ethnicData}/> */}
        {userData ? (
          <UserInfo
            user={userData && userData[0]}
            followerCount={followerCount}
            followingCount={followingCount}
          >
            <div className="flex justify-center items-center gap-3 flex-nowrap mb-3">
              <EditProfile
                userData={userData}
                loading={loading}
                updateProfile={updateProfile}
                setImage={setProfileImage}
                image={profileImage}
                setChangeImage={setChangeImage}
                changeImage={changeImage}
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
              <div>
                <SecondaryButton>Share</SecondaryButton>
              </div>
            </div>
          </UserInfo>
        ) : (
          <div className="w-full">
            <div className="flex justify-center">
              <Skeleton className="animate-skeleton w-[9rem] h-[9rem] rounded-full" />
            </div>
            <div className="mt-2 flex justify-center">
              <Skeleton className="h-5 w-[50%] animate-skeleton rounded" />
            </div>
            <div className="mt-1 flex justify-center">
              <Skeleton className="h-5 w-[30%] animate-skeleton rounded" />
            </div>
            <div className="my-5 flex justify-center gap-2">
              <Skeleton className="h-9 w-[50%] animate-skeleton rounded-xl" />
              <Skeleton className="h-9 w-[40%] animate-skeleton rounded-xl" />
            </div>
            <div className="mt-3">
              <div>
                <Skeleton className="h-5 w-full animate-skeleton rounded mb-2" />
                <Skeleton className="h-5 w-full animate-skeleton rounded mb-2" />
                <Skeleton className="h-5 w-[85%] animate-skeleton rounded mb-2" />
                <Skeleton className="h-5 w-[30%] animate-skeleton rounded mb-2" />
              </div>
            </div>
          </div>
        )}
      </Card>
    </section>
  );
}

export default RightBar;
