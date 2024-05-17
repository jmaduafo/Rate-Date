"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import { Bold, Italic, Strikethrough, Heading2 } from "lucide-react";

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
      {/* <ToolBarButton
        editorClick={editor.chain().focus().toggleBold().run()}
        assign={editor.isActive("bold") ? "is-active" : ""}
      >
        <Heading2 className="w-5 text-darkText"/>
        
      </ToolBarButton> */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${
          editor.isActive("bold") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
      >
        <Bold className="w-5 text-darkText" />
      </button>      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
      >
        <Italic className="w-5 text-darkText" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "bg-dark10" : ""
        } p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
      >
        <Strikethrough className="w-5 text-darkText" />
      </button>
    </div>
  );
}

export default ToolBar;

function ToolBarButton({
  editorClick,
  assign,
  children,
}: {
  editorClick: boolean;
  assign: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => editorClick}
      className={`${assign} p-2 outline-none border-none duration-500 hover:bg-dark10 rounded`}
    >
      {children}
    </button>
  );
}
