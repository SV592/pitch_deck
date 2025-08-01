"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none text-gray-300 bg-[#1F2937] p-4 rounded-xl border border-gray-700 min-h-[200px]",
      },
    },
  });

  return (
    <div className="bg-[#111827] rounded-xl border border-gray-700">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
