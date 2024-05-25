import React from "react";
import Header5 from "@/components/Header5";
import {
  EyeIcon,
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { PostProps } from "@/types/type";
import Link from "next/link";
import Image from "next/image";
import { getInitials } from "@/utils/general/initials";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import parse from "html-react-parser";
import { checkForS } from "@/utils/general/isS";

type Post = {
  info?: PostProps | undefined;
  userID?: string;
};

function RecommendedList({ info, userID }: Post) {
  const checkTags = [
    {
      category: "NSFW",
      name: info?.is_nsfw ? "NSFW" : info?.is_mature ? "21+" : null,
    },
    {
      category: "Date Type",
      name: info?.date_type,
    },
  ];

  return (
    <div
      className={`text-darkText py-3 px-2 border-b-dark10 border-b-[1px] hover:bg-dark10 duration-500 rounded-xl`}
    >
      <div className="">
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
      </div>
      <div className="mt-2">
      <div className="cursor-pointer">
          {info?.title ? (
            <Link href={`/the-corner/${info?.id}`}>
              <Header5 title={info?.title} />
            </Link>
          ) : null}
          {info?.location ? (
          <p className="text-[12px] text-darkText60 mt-[-5px]">
            Located at {info?.location}
          </p>
        ) : null}
        </div>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <div className="flex items-center gap-2">
          {checkTags.map((tag) => {
            return (
              <div className="" key={tag.category}>
                <p
                  className={`${
                    tag.name === "NSFW" || "21+" ? "bg-myWarning" : "bg-myAccent"
                  } text-[13px] rounded-full px-3 py-[2px]`}
                >
                  {tag.name}
                </p>
              </div>
            );
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
          info?.content && info?.content?.length > 80
            ? parse(info?.content?.substring(0, 80) + "...")
            : // IF CONTENT HAS 200 CHARACTERS OR LESS, RENDER ALL TEXT
            info?.content && info?.content?.length <= 80
            ? parse(info?.content)
            : null
        }
      </div>
      <div className="flex justify-between items-center gap-2 mt-2">
        <div className="flex items-center gap-2">
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

export default RecommendedList;
