'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  BookmarkIcon as BookmarkOutline,
  HeartIcon as HeartOutline,
} from "@heroicons/react/24/outline";
import {
  StarIcon,
  BookmarkIcon as BookmarkSolid,
  HeartIcon as HeartSolid,
} from "@heroicons/react/24/solid";
import Header5 from "./Header5";
import { PostProps } from "@/types/type";
import { getInitials } from "@/utils/general/initials";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import parse from "html-react-parser";
import { checkForS } from "@/utils/general/isS";
import Link from "next/link";
import Header4 from "./Header4";
import Header3 from "./Header3";
import DropDownMenu from "./links/DropDownMenu";

type PostTypeProps = {
  info: PostProps | undefined;
  handleLike?: () => void;
  handleSave?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
  userID?: string | undefined;
};

function CollectionCard({
  info,
  handleLike,
  handleSave,
  userID,
}: PostTypeProps) {
  const checkTags = [
    {
      category: "NSFW",
      name: info?.is_nsfw ? "NSFW" : null,
    },
    {
      category: "Date Type",
      name: info?.date_type ?? null,
    },
    {
      category: "Date Category",
      name: info?.category ?? null,
    },
  ];

  const [ isLiked, setIsLiked ] = useState(false)
  const [ isSaved, setIsSaved ] = useState(false)

  function checkLikesSaves() {
    const isLiked = info?.likes?.some(
        (like) =>
          like.user_id === info?.user?.id
      );

      if (isLiked) {
        setIsLiked(true);
      }

      const isSaved = info?.saves?.some(
        (save) =>
          save.user_id === info?.user?.id
      );

      if (isSaved) {
        setIsSaved(true);
      }
  }

  useEffect(() => {
    checkLikesSaves()
  }, [info])

  return (
    <div
      className={`text-darkText py-5 px-4 border-b-dark10 border-b-[1px] hover:bg-dark10 duration-500 rounded-xl`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {info?.user?.image && info?.user?.username ? (
            <Link
              href={
                info?.user_id === userID
                  ? "/profile"
                  : `/profile/${info?.user?.username}`
              }
            >
              <div className="cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
                <Image
                  src={info?.user?.image}
                  alt={`${info?.user?.name}'s profile`}
                  width={500}
                  height={500}
                  className="w-full h-full rounded-full"
                />
              </div>
            </Link>
          ) : (
            <Link
              href={
                info?.user_id === userID
                  ? "/profile"
                  : `/profile/${info?.user?.username}`
              }
            >
              <div className="flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
                {info?.user?.name ? (
                  <p>{getInitials(info?.user?.name)}</p>
                ) : null}
              </div>
            </Link>
          )}
          <div className="">
            {info?.user ? (
              <div className="flex items-center gap-1">
                <p className="text-[16px]">{info?.user?.name}</p>
                <p className="text-[14px] text-darkText60">&#x2022;</p>
                <p className="text-[14px] text-darkText60">
                  @{info?.user?.username}
                </p>
              </div>
            ) : null}
            <div className="mt-[-3px]">
              {info?.created_at ? (
                <p className="italic text-[13px] text-darkText60">
                  {futureHoursFromNow(new Date(info?.created_at)) >= 24
                    ? Math.round(futureTimeFromNow(new Date(info?.created_at)))
                    : Math.round(
                        futureHoursFromNow(new Date(info?.created_at))
                      )}{" "}
                  {futureHoursFromNow(new Date(info?.created_at)) >= 24
                    ? `day${checkForS(
                        Math.round(
                          futureTimeFromNow(new Date(info?.created_at))
                        )
                      )}`
                    : `hour${checkForS(
                        Math.round(
                          futureHoursFromNow(new Date(info?.created_at))
                        )
                      )}`}{" "}
                  ago
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <DropDownMenu userID={userID} id={info?.id} date_type={info?.date_type} type='post' postUser={info?.user_id}/>
      </div>
      {info?.image ? (
        <div className="w-full rounded object-cover mt-4">
          <Image
            src={info?.image}
            alt={`${info?.title} display`}
            width={500}
            height={500}
            className="w-full h-full rounded-xl"
          />
        </div>
      ) : null}
      <div className="mt-2">
        <div className="cursor-pointer">
          {info?.title ? (
            <Link href={`/the-corner/${info?.id}`}>
              <Header4 title={info?.title} />
            </Link>
          ) : null}
        </div>
        {info?.location ? (
          <p className="text-[12px] text-darkText60 mt-[-5px]">
            Located at {info?.location}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-2">
          {checkTags.map((tag) => {
            if (tag.name) {
              return (
                <div className="" key={tag.category}>
                  <p
                    className={`${
                      tag.name === "NSFW" ? "bg-myWarning" : "bg-myAccent"
                    } text-[13px] rounded-full px-3 py-[2px]`}
                  >
                    {tag.name}
                  </p>
                </div>
              );
            }
          })}
        </div>
        {info?.tags ? (
          <p className="text-[14px] text-darkText60">
            + {info?.tags?.length} tags
          </p>
        ) : null}
      </div>
      <div className="mt-3 text-[14px]">
        {
          // IF CONTENT HAS MORE THAN 200 CHARACTERS, RENDER ONLY 200 CHARACTERS WITH ELLIPSES
          info?.content && info?.content?.length > 200
            ? parse(info?.content?.substring(0, 200) + "...")
            : // IF CONTENT HAS 200 CHARACTERS OR LESS, RENDER ALL TEXT
            info?.content && info?.content?.length <= 200
            ? parse(info?.content)
            : null
        }
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {info?.comments ? (
              <>
                <CommentIcon className="w-5" strokeWidth={1.5} />
                <p className="text-[13px] font-medium whitespace-nowrap">
                  {info?.comments?.length} comment
                  {checkForS(info?.comments?.length)}
                </p>
              </>
            ) : null}
          </div>
          {info?.likes ? (
            <div className="flex items-center gap-1">
              <div onClick={handleLike} className="">
                {isLiked ? (
                  <HeartSolid className="w-5" strokeWidth={1.2} />
                ) : (
                  <HeartOutline className="w-5" strokeWidth={1.2} />
                )}
              </div>
              <p className="text-[13px] font-medium whitespace-nowrap">
                {info?.likes?.length} like
                {checkForS(info?.likes?.length)}
              </p>
            </div>
          ) : null}
          {info?.saves ? (
            <div className="flex items-center gap-1">
              <div onClick={handleSave} className="">
                {isSaved ? (
                  <BookmarkSolid className="w-5" strokeWidth={1.2} />
                ) : (
                  <BookmarkOutline className="w-5" strokeWidth={1.2} />
                )}
              </div>
              <p className="text-[13px] font-medium whitespace-nowrap">
                {info?.saves?.length} save
                {checkForS(info?.saves?.length)}
              </p>
            </div>
          ) : null}
        </div>
        {typeof info?.views === "number" ? (
          <div className="flex items-center gap-1">
            <EyeIcon className="w-5" strokeWidth={1.5} />
            <p className="text-[13px] font-medium whitespace-nowrap">
              {info?.views}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CollectionCard;
