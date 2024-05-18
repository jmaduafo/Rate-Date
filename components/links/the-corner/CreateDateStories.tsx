"use client";
import React, { useState } from "react";
import Tiptap from "@/components/TipTap";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import Link from "next/link";

function CreateDateStories() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");

  function handleSubmit() {

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
      <Tiptap
        title={title}
        description={description}
        setDescription={setDescription}
      />
      <div className="flex justify-end gap-3 items-center mt-6 px-6">
        <PrimaryButton type="submit">Publish</PrimaryButton>
        <Link href={"/the-corner"}>
          <SecondaryButton type="button">Back</SecondaryButton>
        </Link>
      </div>
    </form>
  );
}

export default CreateDateStories;
