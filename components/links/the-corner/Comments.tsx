import { PostProps, CommentProps } from '@/types/type'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import {
    EllipsisVerticalIcon,
    EyeIcon,
    ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
    BookmarkIcon,
    HeartIcon as HeartOutline,
  } from "@heroicons/react/24/outline";
import Image from 'next/image'
import React from 'react'
import { futureHoursFromNow, futureTimeFromNow } from '@/utils/general/dateTimeFile'
import { getInitials } from '@/utils/general/initials'
import { checkForS } from '@/utils/general/isS'

type Comment = {
    comment: CommentProps
}

function Comments({ comment }: Comment) {
  return (
    <div>
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
              {comment?.users?.name ? <p>{getInitials(comment?.users?.name)}</p> : null}
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
                    ? Math.round(futureTimeFromNow(new Date(comment?.created_at)))
                    : Math.round(
                        futureHoursFromNow(new Date(comment?.created_at))
                      )}{" "}
                  {futureHoursFromNow(new Date(comment?.created_at)) >= 24
                    ? `day${checkForS(Math.round(futureTimeFromNow(new Date(comment?.created_at))))}`
                    : `hour${checkForS(Math.round(futureHoursFromNow(new Date(comment?.created_at))))}`}{" "}
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
        <div>
            {comment?.content ? <p>{comment?.content}</p>: null}
        </div>
        <div>

        </div>
    </div>
  )
}

export default Comments