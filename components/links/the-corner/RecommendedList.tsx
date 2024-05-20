import React from 'react'
import Header5 from '@/components/Header5';
import {
    EyeIcon,
    ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
    BookmarkIcon,
  } from "@heroicons/react/24/outline";

function RecommendedList() {
    const checkTags = [
        {
          category: "NSFW",
          name: "NSFW",
        },
        {
          category: "Date Idea",
          name: "Date Idea",
        },
      ];

  return (
    <div
      className={`text-darkText py-3 px-2 border-b-dark10 border-b-[1px] hover:bg-dark10 duration-500 rounded-xl`}
    >
      <div className="">
        <div className="flex items-center gap-2">
          <div className="cursor-pointer w-[40px] h-[40px] rounded-full bg-white"></div>
          <div className="">
            <div className="flex items-center gap-1">
              <p className="text-[16px]">Gianna</p>
              <p className="text-[14px] text-darkText60">&#x2022;</p>
              <p className="text-[14px] text-darkText60">@gia87</p>
            </div>
            <div className="mt-[-3px]">
              <p className="italic text-[13px] text-darkText60">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="cursor-pointer">
          <Header5 title="Winter at Barbados" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center gap-2">
          {checkTags.map((tag) => {
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
          })}
        </div>
        <p className="text-[14px] text-darkText60">+ 4 tags</p>
      </div>
      <div className="mt-3">
        <p className="text-[14px]">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean...
        </p>
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
            <BookmarkIcon className="w-5" strokeWidth={1.5} />
            <p className="text-[13px] font-medium whitespace-nowrap">2 saves</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <EyeIcon className="w-5" strokeWidth={1.5} />
          <p className="text-[13px] font-medium whitespace-nowrap">300</p>
        </div>
      </div>
    </div>
  )
}

export default RecommendedList