"use client";
import React, { useState, useEffect, Fragment } from "react";
import DetailPage from "@/components/links/the-corner/DetailPage";
import { PostProps, CommentProps, OtherProps } from "@/types/type";
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
import CollectionCardSkeleton from "@/components/CollectionCardSkeleton";

function TheCornerDetailPage() {
  const [cornerDetail, setCornerDetail] = useState<PostProps | undefined>();
  const [commentText, setCommentText] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [commentsData, setCommentsData] = useState<
    CommentProps[] | undefined
  >();

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userID, setUserID] = useState<string | undefined>();
  const [viewCount, setViewCount] = useState<number | null>(null);

  const supabase = createClient();
  const { toast } = useToast();
  const { id } = useParams();

  async function getDetail() {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError.message);
    }

    setUserID(userData?.user?.id);

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
      setCornerDetail(data[0]);
      //   setViewCount(data[0]?.views);
      const isLiked = data[0]?.likes?.some(
        (like: { user_id: string | string[] }) =>
          like.user_id === userData?.user?.id
      );

      if (isLiked) {
        setIsLiked(true);
      }

      const isSaved = data[0]?.saves?.some(
        (save: { user_id: string | string[] }) =>
          save.user_id === userData?.user?.id
      );

      if (isSaved) {
        setIsSaved(true);
      }
    }
  }

  async function getViews() {
    const { data, error } = await supabase
      .from("corner")
      .select(
        "views"
      )
      .eq("id", id);

      if (error) {
        console.log(error.message)
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
            setViewCount(data[0]?.views);

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
      .eq("corner_id", id)
      .order("created_at", { ascending: false });

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

  async function handleLike() {
    if (!isLiked) {
      const { error } = await supabase.from("likes").insert({
        corner_id: id,
      });

      if (error) {
        console.log("Something wrong with like insert", error.message);
      }

      setIsLiked(true);
    } else if (userID && isLiked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("corner_id", id)
        .eq("user_id", userID);

      if (error) {
        console.log("Something wrong with like delete", error.message);
      }

      setIsLiked(false);
    }
  }

  async function handleSave() {
    if (!isSaved) {
      const { error } = await supabase.from("saves").insert({
        corner_id: id,
      });

      if (error) {
        console.log("Something wrong with like insert:", error.message);
      }

      //   setIsSaved(true);
    } else if (userID && isSaved) {
      const { error } = await supabase
        .from("saves")
        .delete()
        .eq("corner_id", id)
        .eq("user_id", userID);

      if (error) {
        console.log("Something wrong with like delete:", error.message);
      }

      setIsSaved(false);
    }
  }

  function listen() {
    const channel = supabase
      .channel("save_likes_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "likes" },
        (payload) => {
          getDetail();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "saves" },
        (payload) => {
          getDetail();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        (payload) => {
          getComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  useEffect(() => {
    getDetail();
    getComments();
    getViews();
  }, []);

  useEffect(() => {
    listen();
  }, [supabase, cornerDetail, commentsData]);

  useEffect(() => {}, [viewCount]);

  return (
    <div className="md:w-[70%] w-full mx-auto mb-[4rem]">
      {cornerDetail ? (
        <DetailPage
          info={cornerDetail}
          handleLike={handleLike}
          handleSave={handleSave}
          isLiked={isLiked}
          isSaved={isSaved}
          userID={userID}
        />
      ) : (
        <CollectionCardSkeleton />
      )}
      {/* COMMENT SECTION */}
      {commentsData ? (
        // COMMENT HEADER
        <div className="text-darkText mt-8">
          <Header2
            title={`${commentsData?.length} Comment${checkForS(
              commentsData?.length
            )}`}
          />
        </div>
      ) : (
        <div className="mt-8">
          <Skeleton className="w-[30%] h-7 rounded-xl animate-skeleton" />
        </div>
      )}
      {/* COMMENT TEXT AREA */}
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
                Comment
              </>
            )}
          </PrimaryButton>
        </div>
      </form>
      {/* RENDER COMMENTS */}
      {commentsData
        ? commentsData?.map((com) => {
            return (
              <Fragment key={com?.id}>
                <Comments comment={com} userID={userID}/>
              </Fragment>
            );
          })
        : null}
    </div>
  );
}

export default TheCornerDetailPage;
