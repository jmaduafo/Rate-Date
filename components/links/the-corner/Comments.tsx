"use client";
import { CommentProps, ReplyProps } from "@/types/type";
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
import React, { SetStateAction, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  futureHoursFromNow,
  futureTimeFromNow,
} from "@/utils/general/dateTimeFile";
import { getInitials } from "@/utils/general/initials";
import { checkForS } from "@/utils/general/isS";
import DropDownMenu from "../DropDownMenu";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

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
  const [allReplies, setAllReplies] = useState<ReplyProps[] | undefined>();

  const supabase = createClient();
  const { toast } = useToast();

  async function createReply(e: React.FormEvent) {
    e.preventDefault();

    if (!replyText.length) {
      return;
    } else {
      const { error } = await supabase.from("replies").insert({
        content: replyText,
        comment_id: comment?.id,
        reply_username: comment?.users?.username ?? null,
        corner_id: comment?.corner_id ?? null
      })

      if (error) {
        toast({
          title: "Something went wrong",
          description: error.message,
        });
      } else {
        toast({
          title: "Reply published successfully!",
        });

        setReplyText("");
        setShowReply(false);
      }
    }
  }

  async function getReplies() {
    const { data, error } = await supabase
      .from("replies")
      .select(
        `*,
        users (
            *
        )`
      )
      .eq("comment_id", comment?.id);

    if (error) {
      console.log(error.message);
    } else {
      setAllReplies(data);
    }
  }

  function listen() {
    const channel = supabase
      .channel("reply listener")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "replies" },
        (payload) => {
          getReplies();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  useEffect(() => {
    getReplies();
  }, []);

  useEffect(() => {
    listen();
  }, [supabase, allReplies]);

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
                <p className="text-[15px]">{comment?.users?.name}</p>
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
        <DropDownMenu
          userID={userID}
          type="comment"
          id={comment?.id}
          postUser={comment?.user_id}
        />
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
          <p className="text-[12px] font-medium cursor-pointer">Reply</p>
        </div>
      </div>
      {showReply ? (
        <div className="mt-3">
          <form onSubmit={createReply}>
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
      {allReplies && allReplies?.length
        ? allReplies?.map((data) => {
            return (
              <div key={data.id} className={`${replyShow ? 'block' : 'hidden'} pl-10`}>
                <Reply
                  reply_username={comment?.users?.username}
                  comment_id={comment.id}
                  user_reply={data}
                  userID={userID}
                  corner_id={comment?.corner_id}
                  createReply={createReply}
                  setReplyText={setReplyText}
                />
              </div>
            );
          })
        : null}
      <div></div>
    </div>
  );
}

export default Comments;

type RepProp = {
  reply_username?: string | undefined;
  user_reply?: ReplyProps;
  userID?: string | undefined;
  comment_id?: string | undefined;
  corner_id?: string | undefined;
  createReply?: (e: React.FormEvent) => void;
  setReplyText?: React.Dispatch<SetStateAction<string>>
};

function Reply({ reply_username, user_reply, userID, createReply, setReplyText }: RepProp) {
  const [isDisliked, setIsDisliked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div>
      <div className="text-darkText py-1">
        <div className="flex justify-between items-start mt-5">
          <div className="flex items-center gap-2">
            {user_reply?.users?.image ? (
              <div className="cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
                <Image
                  src={user_reply?.users?.image}
                  alt={`${user_reply?.users?.name}'s profile`}
                  width={500}
                  height={500}
                  className="w-full h-full rounded-full"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center cursor-pointer w-[40px] h-[40px] rounded-full bg-white object-cover">
                {user_reply?.users?.name ? (
                  <p>{getInitials(user_reply?.users?.name)}</p>
                ) : null}
              </div>
            )}
            <div className="">
              {user_reply?.users ? (
                <div className="flex items-center gap-1">
                  <p className="text-[15px]">{user_reply?.users?.name}</p>
                  <p className="text-[14px] text-darkText60">&#x2022;</p>
                  <p className="text-[14px] text-darkText60">
                    @{user_reply?.users?.username}
                  </p>
                </div>
              ) : null}
              <div className="mt-[-3px]">
                {user_reply?.created_at ? (
                  <p className="italic text-[13px] text-darkText60">
                    {futureHoursFromNow(new Date(user_reply?.created_at)) >= 24
                      ? Math.round(
                          futureTimeFromNow(new Date(user_reply?.created_at))
                        )
                      : Math.round(
                          futureHoursFromNow(new Date(user_reply?.created_at))
                        )}{" "}
                    {futureHoursFromNow(new Date(user_reply?.created_at)) >= 24
                      ? `day${checkForS(
                          Math.round(
                            futureTimeFromNow(new Date(user_reply?.created_at))
                          )
                        )}`
                      : `hour${checkForS(
                          Math.round(
                            futureHoursFromNow(new Date(user_reply?.created_at))
                          )
                        )}`}{" "}
                    ago
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <DropDownMenu
            userID={userID}
            type="comment"
            id={user_reply?.id}
            postUser={user_reply?.user_id}
          />
        </div>
        <div className="mt-2">
          {user_reply?.content ? (
            user_reply?.reply_username ? (
                <p className="text-[14px]">
                <Link href={userID === user_reply?.user_id ? '/profile' : `/profile/${reply_username}`}>
                <span className="font-medium text-orange-800">
                  @{user_reply?.reply_username}
                </span>{" "}
                </Link>
                {user_reply?.content}
              </p>
            ) : (
              <p className="text-[14px]">{user_reply?.content}</p>
            )
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
        <div className="mt-2">
          <div onClick={() => setShowReply(true)}>
            <p className="text-[12px] font-medium cursor-pointer">Reply</p>
          </div>
        </div>
        {showReply ? (
          <div className="mt-3">
            <form onSubmit={createReply}>
              <div>
                <TextareaAutosize
                  onChange={(e) => setReplyText && setReplyText(e.target.value)}
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
    </div>
  );
}
