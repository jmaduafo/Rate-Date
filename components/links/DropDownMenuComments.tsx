import React, { Fragment, SetStateAction } from "react";
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

type MenuProp = {
  userID?: string;
  date_type?: string;
  id?: string;
  type: string;
  postUser?: string;
  setDisplayTextarea?: React.Dispatch<SetStateAction<boolean>>
  setText?: React.Dispatch<SetStateAction<string>>
  content?: string;
};

function DropDownMenuComments({
  userID,
  postUser,
  date_type,
  setDisplayTextarea,
  setText,
  id,
  type,
  content
}: MenuProp) {
  const { toast } = useToast();
  const supabase = createClient();

  const userMenu = [
    {
      title: `Edit`,
    },
    {
      title: `Delete`,
    },
  ];

  const otherMenu = [
    {
      title: "Block",
      link: null,
    },
    {
      title: "Report",
      link: null,
    },
  ];

  async function handleDelete() {
    if (type === "comment") {
      const { error } = await supabase.from("comments").delete().eq("id", id);

      if (error) {
        toast({
          title: "Sorry, had trouble deleting your comment",
          description: error.message,
        });
      } else {
        toast({
          title: "Comment deletion was successful!",
        });
      }
    } else {
        const { error } = await supabase.from("replies").delete().eq("id", id);

      if (error) {
        toast({
          title: "Sorry, had trouble deleting your reply",
          description: error.message,
        });
      } else {
        toast({
          title: "Reply deletion was successful!",
        });
      }
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
                return menu.title.includes("Edit") ? (
                  <div
                    onClick={() => {setText && setText(content as string); setDisplayTextarea && setDisplayTextarea(true)}}
                    className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                    key={menu.title}
                  >
                    <p>{menu.title}</p>
                  </div>
                ) : (
                  // DELETE DROPDOWN
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div
                        className="py-1 px-1 text-[14px] cursor-pointer hover:bg-[#ffffff10] duration-500 rounded"
                        key={menu.title}
                      >
                        <p>{menu.title}</p>
                      </div>
                    </AlertDialogTrigger>
                    {/* DISPLAYS ALERT BEFORE DELETION TO MAKE CONFIRM USER'S CHOICE */}
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your {type} as well as likes accompanied with
                          it, and will remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
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

export default DropDownMenuComments;
