"use client";
import React, { useState, useEffect, Fragment } from "react";
import DetailPage from "@/components/links/the-corner/DetailPage";
import { PostProps, CommentProps } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import Comments from "@/components/links/the-corner/Comments";
import Header2 from "@/components/Header2";
import { Skeleton } from "@/components/ui/skeleton";
import { checkForS } from "@/utils/general/isS";
import PrimaryButton from "@/components/PrimaryButton";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import TextareaAutosize from "react-textarea-autosize";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Loading";

function TheCornerDetailPage() {
  const [cornerDetail, setCornerDetail] = useState<PostProps | undefined>();
  const [commentText, setCommentText] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [commentsData, setCommentsData] = useState<
    CommentProps[] | undefined
  >();

  const supabase = createClient();
  const { toast } = useToast();
  const { id } = useParams();

  async function getDetail() {
    const { data, error } = await supabase
      .from("corner")
      .select(
        `
      *, 
    saves(
        *),
    likes(
        *
    ),
    comments(
        *
    ) `
      )
      .eq("id", id);

    if (error) {
      console.log(error.message);
    } else {
      const { error: viewError } = await supabase
        .from("corner")
        .update({
          views: data[0]?.views + 1,
        })
        .eq("id", id);

      if (viewError) {
        console.log(viewError.message);
      } else {
        setCornerDetail(data[0]);
      }
    }
  }

  async function getComments() {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
      *,
      users (
        name,
        username,
        image
        ) `
      )
      .eq("corner_id", id);

    if (error) {
      console.log(error.message);
    } else {
      setCommentsData(data);
    }
  }

  async function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!commentText?.length) {
      toast({
        title: "Whoops!",
        description: "You cannot leave the comment field empty",
      });
    } else {
      setLoading(true);
      const { error } = await supabase.from("comments").insert({
        content: commentText,
        corner_id: id,
      });

      if (error) {
        toast({
          title: "Oh no! Something went wrong!",
          description: error.message,
        });
      } else {
        toast({
          title: "Success!",
          description: "Your comment was published successfully!",
        });

        setCommentText("");
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    getDetail();
    getComments();
  }, []);

  return (
    <div className="md:w-[70%] w-full mx-auto mb-[4rem]">
      {cornerDetail ? <DetailPage info={cornerDetail} /> : <div></div>}
      {commentsData ? (
        <div className="text-darkText mt-8">
          <Header2
            title={`${commentsData?.length} Comment${checkForS(
              commentsData?.length
            )}`}
          />
        </div>
      ) : (
        <div className="mt-8">
          <Skeleton className="w-[30%] h-10 rounded-xl animate-skeleton" />
        </div>
      )}
      <form className="my-4" onSubmit={handleCommentSubmit}>
        <div>
          <TextareaAutosize
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment"
            className="outline-none p-2 text-[14px] text-darkText w-full rounded-lg border-dark10 border-[1px] bg-[#ffffff30] min-h-[80px]"
          />
        </div>
        <div className="flex justify-end mt-2">
          <PrimaryButton className="flex gap-3 items-center">
            {loading ? (
              <Loading
                classNameColor="border-t-myForeground"
                classNameSize="w-6 h-6"
              />
            ) : (
              <>
                <PaperAirplaneIcon className="w-3 text-myForeground" />
                Publish
              </>
            )}
          </PrimaryButton>
        </div>
      </form>
      {commentsData
        ? commentsData?.map((com) => {
            return (
              <Fragment key={com?.id}>
                <Comments comment={com} />
              </Fragment>
            );
          })
        : null}
    </div>
  );
}

export default TheCornerDetailPage;
