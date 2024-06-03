"use client";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ImageProps, UserDataProps } from "@/types/type";
import UserInfo from "./UserInfo";
import EditProfile from "./EditProfile";
import { useToast } from "@/components/ui/use-toast";
import SecondaryButton from "@/components/SecondaryButton";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";
import PrimaryButton from "@/components/PrimaryButton";
import { checkForS } from "@/utils/general/isS";

function RightBar({ username }: { username?: string | string[] }) {
  const [userData, setUserData] = useState<UserDataProps[] | undefined>();
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [changeImage, setChangeImage] = useState<ImageProps | undefined>(
    undefined
  );
  const [usernameText, setUsernameText] = useState<string>("");
  const [pronounsText, setPronounsText] = useState<string | undefined>("");
  const [birthday, setBirthday] = useState<string | undefined>("");
  const [relationStatus, setRelationStatus] = useState<string | undefined>("");
  const [orientation, setOrientation] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userID, setUserID] = useState<string | undefined>();
  const [notUserID, setNotUserID] = useState<string | undefined>();

  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();

  async function getUserProfile() {
    if (!username) {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

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

          getFollows(userData?.user?.id);

          if (dataInfo) {
            setName(dataInfo[0]?.name);
            setUsernameText(dataInfo[0]?.username);
            setPronounsText(
              dataInfo[0]?.pronouns ? dataInfo[0]?.pronouns : undefined
            );
            setProfileImage(dataInfo[0]?.image ? dataInfo[0]?.image : null);
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
  }

  async function getFollows(id: string) {
    const { data, error } = await supabase.from("followers").select();

    if (error) {
      console.error(error.message);
    } else {
      const followers = data?.filter((el) => el.follow_id === id);
      const followings = data?.filter((el) => el.user_id === id);

      setFollowerCount(followers?.length);
      setFollowingCount(followings?.length);
    }
  }

  async function getNotUserProfile() {
    // FINDS WHERE ID MATCHES
    if (username) {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      setUserID(userData?.user?.id);

      if (userError) {
        router.push("/login");
        router.refresh();
      } else {
        const { data: dataInfo, error: errorMessage } = await supabase
          .from("users")
          .select(`*, followers ( * )`)
          .eq("username", username);

        if (errorMessage) {
          toast({
            title: "Uh oh! Something went wrong",
            description: errorMessage.message,
          });
        } else {
          setUserData(dataInfo);
          setNotUserID(dataInfo[0]?.id);

          getFollows(dataInfo[0]?.id);

          const isFollow = dataInfo[0]?.followers?.some(
            (el: { user_id: string; follow_id: string }) =>
              el.user_id === userData?.user?.id &&
              el.follow_id === dataInfo[0]?.id
          );

          setIsFollowed(isFollow);
        }
      }
    }
  }

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.length || !usernameText.length) {
      toast({
        title: "Whoops!",
        description:
          "Name and username cannot be left empty. Please fill in these fields.",
      });
    } else {
      setLoading(true);
      if (userData && userID) {
        // console.log(profileImage?.imagePreview + ';' + profileImage?.file)
        if (changeImage) {
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
                image: changeImage
                  ? `https://oevsvjkpdlznvfenlttz.supabase.co/storage/v1/object/public/profile/${storageData?.path}`
                  : profileImage,
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
        }

        setLoading(false);
      }
    }
  }

  async function handleFollow() {
    if (notUserID && userID) {
      if (!isFollowed) {
        const { error } = await supabase.from("followers").insert({
          follow_id: notUserID,
        });

        if (error) {
          console.log(error.message);
        } else {
          setIsFollowed(true);
        }
      } else {
        const { error } = await supabase
          .from("followers")
          .delete()
          .eq("user_id", userID)
          .eq("follow_id", notUserID);

        if (error) {
          console.log(error.message);
        } else {
          setIsFollowed(false);
        }
      }
    }
  }

  function listen() {
    const channel = supabase
      .channel("follow changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "followers" },
        (payload) => {
          getNotUserProfile();
          getUserProfile();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  useEffect(() => {
    getNotUserProfile();
    getUserProfile();
    // getFollows();
  }, []);

  useEffect(() => {
    listen();
  }, [supabase, followerCount, followingCount, isFollowed]);

  return (
    <section className="md:sticky top-[20px]">
      <Card className="w-full flex justify-center items-center">
        {/* <DemographicChart ethnicData={ethnicData}/> */}
        {userData ? (
          <UserInfo
            user={userData && userData[0]}
            followerCount={followerCount}
            followingCount={followingCount}
          >
            <div className="flex justify-center items-center gap-3 flex-nowrap mb-3">
              {username ? (
                <div>
                  {isFollowed ? (
                    <PrimaryButton
                      className="bg-myAccent border-none"
                      actionFunction={handleFollow}
                    >
                      Following
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton actionFunction={handleFollow}>
                      Follow
                    </PrimaryButton>
                  )}
                </div>
              ) : (
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
                  setUsername={setUsernameText}
                  setName={setName}
                  setPronounsText={setPronounsText}
                  setRelationStatus={setRelationStatus}
                  birthday={birthday}
                  orientation={orientation}
                  isPrivate={isPrivate}
                  username={usernameText}
                  name={name}
                  pronounsText={pronounsText}
                  relationStatus={relationStatus}
                />
              )}
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
