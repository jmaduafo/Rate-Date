import { UserDataProps } from "@/types/type";
import React from "react";
import Header6 from "./Header6";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  ChatBubbleOvalLeftEllipsisIcon as CommentIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Header5 from "./Header5";
import LineBreak from "./LineBreak";

type PostProps = {
  user: UserDataProps | undefined;
};

function CollectionCard({}: // title,
// classNameBgColor,
{
  // title: string;
  // classNameBgColor: string;
}) {
  const checkTags = [
    {
      category: "NSFW",
      name: "NSFW",
    },
    {
      category: "Date Idea",
      name: "Date Idea",
    },
    {
      category: "Location",
      name: "Outdoors",
    },
  ];

  return (
    <div className={`cursor-pointer text-darkText py-5 px-4 border-b-dark10 border-b-[1px] hover:bg-dark10 duration-500 rounded-xl`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] rounded-full bg-white"></div>
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
        <div className="cursor-pointer z-[5]">
          <EllipsisVerticalIcon className="text-darkText w-6" strokeWidth={1} />
        </div>
      </div>
      <div className="mt-2">
        <Header5 title="Winter at Barbados" />
        <p className="text-[12px] text-darkText60 mt-[-5px]">
          Located at Bridgetown, Barbados
        </p>
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
      <div className="text-darkText60 mt-1 flex items-center gap-1">
        <StarIcon className="w-3" />
        <p className="text-[12px]">4.6</p>
      </div>
      <div className="mt-3">
        <p className="text-[14px]">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis e...
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
  );
}

export default CollectionCard;
