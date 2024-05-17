"use client";
import React, { useState } from "react";
import Tiptap from "@/components/TipTap";

function CreateDateStories() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState("");
  return (
    <div>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="placeholder-dark30 text-[30px] tracking-tight text-darkText font-medium px-4 py-2 rounded-xl outline-none border-none bg-transparent mb-2 w-full"
        />
      </div>
      <Tiptap title={title} description={description} setDescription={setDescription} />
    </div>
  );
}

export default CreateDateStories;
