"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Code, TextQuote, List, MessageSquareCode, ListOrdered } from "lucide-react";

type Props = {
  readonly editor: Editor | null;
};
function ToolBar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-dark10 border-[1px] p-1 rounded-xl mb-5">
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Bold className="w-5 text-darkText" />
      </button>      
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Italic className="w-5 text-darkText" />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded cursor-pointer`}
      >
        <Strikethrough className="w-5 text-darkText" />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`${
          editor.isActive("code") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounbutton`}
      >
        <Code className="w-5 text-darkText" />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
      >
        <MessageSquareCode className="w-5 text-darkText" strokeWidth={1.5} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
      >
        <List className="w-5 text-darkText" strokeWidth={1.5} />
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
      >
        <ListOrdered className="w-5 text-darkText" strokeWidth={1.5} />
      </button>
    
    </div>
  );
}

export default ToolBar;
