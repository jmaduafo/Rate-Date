"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Code, TextQuote } from "lucide-react";

type Props = {
  editor: Editor | null;
  title: string;
};
function ToolBar({ editor, title }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 border-dark10 border-[1px] p-1 rounded-xl mb-5">
      <div
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Bold className="w-5 text-darkText" />
      </div>      
      <div
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Italic className="w-5 text-darkText" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Strikethrough className="w-5 text-darkText" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`${
          editor.isActive("code") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Code className="w-5 text-darkText" />
      </div>
      <div
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${
          editor.isActive("blockquote") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <TextQuote className="w-5 text-darkText" strokeWidth={1.5} />
      </div>
    
    </div>
  );
}

export default ToolBar;