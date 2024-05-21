"use client";

import React, { useState } from "react";
import Tiptap from "@/components/TipTap";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function CreateDateStories() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState("");
  const [isNSFW, setIsNSFW] = useState(false);

  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.length || !content.length) {
      toast({
        title: "Whoops!",
        description: "All entries must not be left empty",
      });
    } else {
      const { error } = await supabase.from("stories").insert({
        title,
        content,
        is_nsfw: isNSFW ?? false,
      });

      if (error) {
        toast({
          title: "Oh no! Something went wrong",
          description: error.message,
        });
      } else {
        toast({
          title: "Success!",
          description: "Your story was posted successfully!",
        });

        setTitle("");
        setContent("");
        setIsNSFW(false);

        goBack();
      }
    }
  }

  function goBack() {
    router.back()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="placeholder-dark30 text-[30px] tracking-tight text-darkText font-medium px-4 py-2 rounded-xl outline-none border-none bg-transparent mb-2 w-full"
        />
      </div>
      <Tiptap placeholder='Write your story...' title={title} description={content} setDescription={setContent} />
      <div className="flex items-center justify-end gap-3 my-6 px-6">
        <p className="text-darkText">Mature?</p>
        <Switch checked={isNSFW} onCheckedChange={setIsNSFW} />
      </div>
      <div className="flex justify-end gap-3 items-center mt-10 px-6">
        <PrimaryButton type="submit">Publish</PrimaryButton>
        <SecondaryButton actionFunction={goBack} type="button">Back</SecondaryButton>
      </div>
    </form>
  );
}

export default CreateDateStories;
