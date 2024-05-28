"use client";
import { CommentProps } from "@/types/type";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  BookmarkIcon,
  HeartIcon as HeartOutline,
  ChevronDownIcon,
  ChevronUpIcon,
  HandThumbDownIcon as ThumbsDownOutline,
  HandThumbUpIcon as ThumbsUpOutline,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as ThumbsDownSolid,
  HandThumbUpIcon as ThumbsUpSolid,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import { getInitials } from "@/utils/general/initials";
import { checkForS } from "@/utils/general/isS";
import DropDownMenu from "../DropDownMenu";

type Comment = {
  comment: CommentProps;
  userID?: string;
};

function Comments({ comment, userID }: Comment) {
  const [replyShow, setReplyShow] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="text-darkText py-2">
      <div className="flex justify-between items-start mt-5">
        <div className="flex items-center gap-2">
          {comment?.users?.image ? (
            <div className="cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
              <Image
                src={comment?.users?.image}
                alt={`${comment?.users?.name}'s profile`}
                width={500}
                height={500}
                className="w-full h-full rounded-full"
              />
            </div>
          ) : (
            <div className="flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
              {comment?.users?.name ? (
                <p>{getInitials(comment?.users?.name)}</p>
              ) : null}
            </div>
          )}
          <div className="">
            {comment?.users ? (
              <div className="flex items-center gap-1">
                <p className="text-[16px]">{comment?.users?.name}</p>
                <p className="text-[14px] text-darkText60">&#x2022;</p>
                <p className="text-[14px] text-darkText60">
                  @{comment?.users?.username}
                </p>
              </div>
            ) : null}
            <div className="mt-[-3px]">
              {comment?.created_at ? (
                <p className="italic text-[13px] text-darkText60">
                  {futureHoursFromNow(new Date(comment?.created_at)) >= 24
                    ? Math.round(
                        futureTimeFromNow(new Date(comment?.created_at))
                      )
                    : Math.round(
                        futureHoursFromNow(new Date(comment?.created_at))
                      )}{" "}
                  {futureHoursFromNow(new Date(comment?.created_at)) >= 24
                    ? `day${checkForS(
                        Math.round(
                          futureTimeFromNow(new Date(comment?.created_at))
                        )
                      )}`
                    : `hour${checkForS(
                        Math.round(
                          futureHoursFromNow(new Date(comment?.created_at))
                        )
                      )}`}{" "}
                  ago
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <DropDownMenu userID={userID} type='comment' id={comment?.id} postUser={comment?.user_id}/>
      </div>
      <div className="mt-2">
        {comment?.content ? (
          <p className="text-[14px]">{comment?.content}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-1">
          <div className="" onClick={() => setIsLiked((prev) => !prev)}>
            {isLiked ? (
              <ThumbsUpSolid
                strokeWidth={1}
                className="text-darkText w-4 cursor-pointer duration-500"
              />
            ) : (
              <ThumbsUpOutline
                strokeWidth={1}
                className="text-darkText w-4 cursor-pointer duration-500"
              />
            )}
            {/* <ThumbsDownSolid/> */}
          </div>
          <p className="text-[13px]">0</p>
        </div>
        <div className="flex items-center gap-1">
          <div onClick={() => setIsDisliked((prev) => !prev)}>
            {isDisliked ? (
              <ThumbsDownSolid
                strokeWidth={1}
                className="text-darkText w-4 cursor-pointer duration-500"
              />
            ) : (
              <ThumbsDownOutline
                strokeWidth={1}
                className="text-darkText w-4 cursor-pointer duration-500"
              />
            )}
          </div>
          <p className="text-[13px]">0</p>
        </div>
      </div>
      <div className="mt-2 flex gap-2 items-center">
        <div
          className="bg-darkText p-1 rounded-full cursor-pointer"
          onClick={() => setReplyShow((prev) => !prev)}
        >
          {replyShow ? (
            <ChevronUpIcon className="text-myForeground w-3" />
          ) : (
            <ChevronDownIcon className="text-myForeground w-3" />
          )}
        </div>
        <div onClick={() => setShowReply(true)}>
          <p className="text-[13px] font-medium cursor-pointer">Reply</p>
        </div>
      </div>
      {showReply ? (
        <div className="mt-3">
          <form>
            <div>
              <TextareaAutosize
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply"
                className="outline-none p-2 text-[14px] text-darkText w-full rounded-lg border-dark10 border-[1px] bg-[#ffffff30] min-h-[80px]"
              />
            </div>
            <div className="flex justify-end items-center gap-3">
              <button
                onClick={() => setShowReply(false)}
                type="button"
                className="text-[14px] px-4 py-[2px] rounded-full border-darkText border-[1px] text-darkText"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-[14px] px-4 py-[2px] rounded-full bg-darkText text-myForeground"
              >
                Reply
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Comments;
