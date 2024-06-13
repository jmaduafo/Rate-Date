"use client";
import React, { Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useToast } from "../ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type MenuProp = {
  userID?: string;
  date_type?: string;
  id?: string;
  type?: string;
  postUser?: string;
};
function DropDownMenu({ userID, postUser, date_type, id, type }: MenuProp) {
  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

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

  async function handlePostDelete() {
    const { error } = await supabase.from("corner").delete().eq("id", id);

    if (error) {
      toast({
        title: "Sorry, had trouble enacting this request",
        description: error.message,
      });
    } else {
      toast({
        title: "Post deletion was successful!",
      });

      router.refresh();
    }
  }

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
                  <Link href={menu.link} key={menu.title}>
                    <div
                      className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                    >
                      <p>{menu.title}</p>
                    </div>
                  </Link>
                ) : (
                  // DELETE POST BUTTON
                  <AlertDialog key={menu.title}>
                    <AlertDialogTrigger asChild>
                      <div
                        className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                        key={menu.title}
                      >
                        <p>{menu.title}</p>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your post as well as comments, replies, likes,
                          and saves accompanied with it, and will remove your
                          data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePostDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
