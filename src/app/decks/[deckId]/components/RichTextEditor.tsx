"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { FontSize } from "@tiptap/extension-font-size";
import { TextStyle } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, readOnly }) => {
  const editor = useEditor({
    editable: !readOnly,
    immediatelyRender: false, // Added this line
    extensions: [
      TextStyle,
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Color.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontFamily,
      FontSize,
    ],
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
