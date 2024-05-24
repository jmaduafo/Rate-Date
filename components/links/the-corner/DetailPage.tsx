import React from "react";
import Image from "next/image";
import { PostProps } from "@/types/type";
import { getInitials } from "@/utils/general/initials";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import parse from "html-react-parser";
import { checkForS } from "@/utils/general/isS";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  BookmarkIcon as BookmarkOutline,
  HeartIcon as HeartOutline,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import Header5 from "@/components/Header5";
import Header1 from "@/components/Header1";
import LineBreak from "@/components/LineBreak";

type Post = {
  info: PostProps;
  handleLike?: () => void;
  handleSave?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
};

function DetailPage({ info, handleLike, handleSave, isLiked, isSaved }: Post) {
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
  return (
    <div className={`text-darkText`}>
      <div className="">
        {info?.title ? <Header1 title={info?.title} /> : null}
      </div>
      <div className="flex justify-between items-start mt-5">
        <div className="flex items-center gap-2">
          {info?.user?.image ? (
            <div className="cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
              <Image
                src={info?.user?.image}
                alt={`${info?.user?.name}'s profile`}
                width={500}
                height={500}
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
              {info?.user?.name ? <p>{getInitials(info?.user?.name)}</p> : null}
            </div>
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
        <div className="cursor-pointer z-[5]">
          <EllipsisVerticalIcon className="text-darkText w-6" strokeWidth={1} />
        </div>
      </div>
      <div className="mt-3">
        <LineBreak />
      </div>
      {/* <div className="mt-3">
        <HeartOutline className="w-7 text-darkText" strokeWidth={1} />
      </div> */}
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
        {info?.location ? (
          <p className="text-[12px] text-darkText60 mt-[-5px]">
            Located at {info?.location}
          </p>
        ) : null}
      </div>

      {/* <div className="text-darkText60 mt-1 flex items-center gap-1">
        <StarIcon className="w-3" />
        <p className="text-[12px]">4.6</p>
      </div> */}
      <div className="mt-5">{info?.content ? parse(info?.content) : null}</div>
      <div className="flex items-center gap-3 mt-5">
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
        {info?.tags
          ? info?.tags?.map((tag) => {
              return (
                <div className="" key={tag}>
                  <p
                    className={`bg-myAccent text-[13px] rounded-full px-3 py-[2px]`}
                  >
                    {tag}
                  </p>
                </div>
              );
            })
          : null}
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center gap-4">
          {info?.likes ? (
            <div className="flex items-center gap-1">
              <div onClick={handleLike} className="cursor-pointer">
                {isLiked ? <HeartSolid className="w-7" strokeWidth={1.2} /> : <HeartOutline className="w-7" strokeWidth={1.2} />}
              </div>

              <p className="text-[13px] font-medium whitespace-nowrap">
                {info?.likes?.length}
                {/* like{checkForS(info?.likes?.length)} */}
              </p>
            </div>
          ) : null}
          {info?.saves ? (
            <div className="flex items-center gap-1">
              <div onClick={handleSave} className="cursor-pointer">
                {isSaved ? <BookmarkSolid className="w-6" strokeWidth={1.2} /> : <BookmarkOutline className="w-6" strokeWidth={1.2} />}
              </div>
              <p className="text-[13px] font-medium whitespace-nowrap">
                {info?.saves?.length}
                {/* save{checkForS(info?.saves?.length)} */}
              </p>
            </div>
          ) : null}
        </div>
        {typeof info?.views === "number" ? (
          <div className="flex items-center gap-1">
            <EyeIcon className="w-6" strokeWidth={1.2} />
            <p className="text-[13px] font-medium whitespace-nowrap">
              {info?.views}
            </p>
          </div>
        ) : null}
      </div>
      <div className="mt-3">
        <LineBreak />
      </div>
    </div>
  );
}

export default DetailPage;
