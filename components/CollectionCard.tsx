import React from "react";
import Image from "next/image";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  BookmarkIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Header5 from "./Header5";
import { PostProps } from "@/types/type";
import { getInitials } from "@/utils/general/initials";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import parse from 'html-react-parser';

type PostTypeProps = {
  info: PostProps | undefined;
};

function CollectionCard({ info }: PostTypeProps) {
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
    <div
      className={`text-darkText py-5 px-4 border-b-dark10 border-b-[1px] hover:bg-dark10 duration-500 rounded-xl`}
    >
      <div className="flex justify-between items-start">
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
                    : Math.round(futureHoursFromNow(new Date(info?.created_at)))}{" "}
                  {futureHoursFromNow(new Date(info?.created_at)) >= 24
                    ? "days"
                    : "hours"}{" "}
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
          {info?.title ? <Header5 title={info?.title} /> : null}
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
      <div className="text-darkText60 mt-1 flex items-center gap-1">
        <StarIcon className="w-3" />
        <p className="text-[12px]">4.6</p>
      </div>
      <div className="mt-3">
        {info?.content ? (
          <p className="text-[14px]">
            {parse(info?.content)}
          </p>
        ) : null}
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CommentIcon className="w-5" strokeWidth={1.5} />
            <p className="text-[13px] font-medium whitespace-nowrap">
              3 comments
            </p>
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="w-5" strokeWidth={1.5} />
            <p className="text-[13px] font-medium whitespace-nowrap">3 likes</p>
          </div>
          <div className="flex items-center gap-1">
            <BookmarkIcon className="w-5" strokeWidth={1.5} />
            <p className="text-[13px] font-medium whitespace-nowrap">2 saves</p>
          </div>
        </div>
        {typeof info?.views === 'number' ? (
          <div className="flex items-center gap-1">
            <EyeIcon className="w-5" strokeWidth={1.5} />
            <p className="text-[13px] font-medium whitespace-nowrap">{info?.views}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CollectionCard;
