"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "./ToolBar";

const Tiptap = ({
  setDescription,
  description,
  title,
}: {
  setDescription?: (value: React.SetStateAction<string>) => void;
  description: string;
  title: string;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write your story …",
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: "py-2 px-3 rounded text-darkText border-none outline-none",
      },
    },
    onUpdate({ editor }) {
      setDescription && setDescription(editor.getHTML());
    },
  });

  return (
    <>
      <ToolBar editor={editor} title={title} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
