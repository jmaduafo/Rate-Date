import React from "react";
import { UserDataProps } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/utils/general/initials";
import Header5 from "@/components/Header5";
import LineBreak from "@/components/LineBreak";
import Header4 from "@/components/Header4";

type UserInfoProps = {
  user: UserDataProps;
  followingCount?: number;
  followerCount?: number;
  children?: React.ReactNode;
};

function UserInfo({
  user,
  followerCount,
  followingCount,
  children,
}: UserInfoProps) {
  return (
    <div>
      {/* PROFILE PICTURE */}
      <div className="flex justify-center items-center">
        {user && user?.image ? (
          <div className="w-[9rem] h-[9rem] object-cover">
            <Image
              src={user?.image}
              alt={`${user?.username}'s profile`}
              className="w-full h-full rounded-full"
              width={500}
              height={500}
            />
          </div>
        ) : user && !user?.image && user?.name && (
          <div className="w-[9rem] h-[9rem] bg-background rounded-full flex justify-center items-center">
            <h5 className="text-[3rem] text-foreground font-bold uppercase">
              {getInitials(user?.name)}
            </h5>
          </div>
        )}
      </div>
      {/* USER'S NAME */}
      <div className="mt-3 flex justify-center">
        {user && user?.name && (
          <Header4 title={user?.name} />
        )}
      </div>
      {/* USERNAME */}
      <div className="mt-[-5px] flex justify-center">
        {user && user?.username && (
          <p className="text-darkText60 tracking-tight text-[14px]">@{user?.username}</p>
        )}
      </div>
      {/* FOLLOWING AND FOLLOWERS */}
      <div className="my-2 flex justify-center">
        {user && (
          <div className="flex justify-center items-center gap-1">
            <p className="text-[15px] tracking-tighter">{followerCount} Followers</p>
            <p className="text-[15px] tracking-tighter">&#x2022;</p>
            <p className="text-[15px] tracking-tighter">{followingCount} Following</p>
          </div>
        )}
      </div>
      {/* IF NOT PRIVATE, SHOW ADDITIONAL USER INFO LIKE SEXUALITY, STATUS, ETC. */}
      {user && (
        !user?.private ? (
          <div className="mb-1">
            <p className="text-[11px] text-darkText60">
              {user?.sexual_orientation ||
              user?.sexual_orientation !== "Prefer not to say"
                ? user?.sexual_orientation
                : null}{" "}
              {user?.sexual_orientation && user?.pronouns ? "/" : null}{" "}
              {user?.pronouns || user?.pronouns !== "Prefer not to say"
                ? user?.pronouns
                : null}
            </p>
          </div>
        ) : null
      )}
      {/* EDIT PROFILE AND SHARE BUTTON */}
      {children}
      {/* LINE BREAK */}
      <LineBreak />
      {/* BIO */}
      <div className="mt-2">
        {user && user?.bio && (
          <div className="">
            <p className="text-darkText60 text-[14px]">{user?.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
