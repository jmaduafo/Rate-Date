"use client";
import React, { useState, useEffect } from "react";
import DetailPage from "@/components/links/the-corner/DetailPage";
import { PostProps } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { useParams } from "next/navigation";

function TheCornerDetailPage() {
  const [cornerDetail, setCornerDetail] = useState<PostProps | undefined>();

  const supabase = createClient();
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
      setCornerDetail(data[0]);
    }
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>{cornerDetail ? <DetailPage info={cornerDetail} /> : <div></div>}</div>
  );
}

export default TheCornerDetailPage;
