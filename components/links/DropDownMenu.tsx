import React, { Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useToast } from "../ui/use-toast";

type MenuProp = {
  userID?: string;
  date_type?: string;
  id?: string;
  type?: string;
  postUser?: string;
};
function DropDownMenu({ userID, postUser, date_type, id, type }: MenuProp) {
  const { toast } = useToast();

  const userMenu = [
    {
      title: `Edit ${type === "Post".toLowerCase() ? "Post" : ""}`,
      link:
        date_type === "Date Story"
          ? `/the-corner/stories/edit/${id}`
          : date_type === "Date Idea"
          ? `/the-corner/ideas/edit/${id}`
          : null,
    },
    {
      title: `Delete ${type === "Post".toLowerCase() ? "Post" : ""}`,
      link: null,
    },
  ];

  const otherMenu = [
    {
      title: "Share",
      link: `/the-corner/${id}`,
    },
    {
      title: "Block",
      link: null,
    },
    {
      title: "Report",
      link: null,
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <EllipsisVerticalIcon className="text-darkText w-6" strokeWidth={1} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="p-1">
          {userID === postUser ? (
            <div>
              {userMenu?.map((menu) => {
                return menu.link ? (
                  <Link href={menu.link}>
                    <div
                      className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                      key={menu.title}
                    >
                      <p>{menu.title}</p>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                    key={menu.title}
                  >
                    <p>{menu.title}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {otherMenu.map((menu) => {
                return menu.link ? (
                  type === "Post".toLowerCase() ? (
                    <div
                      className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                      key={menu.title}
                    >
                      <CopyToClipboard
                        onCopy={() => {
                          toast({
                            title: "Copied to clipboard",
                          });
                        }}
                        text={window.location.origin + menu.link}
                      >
                        <p>{menu.title}</p>
                      </CopyToClipboard>
                    </div>
                  ) : null
                ) : (
                  <div
                    key={menu.title}
                    className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                  >
                    <p>{menu.title}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenu;
