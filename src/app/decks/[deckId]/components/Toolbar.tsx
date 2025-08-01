"use client";

import React from "react";
import { Editor } from "@tiptap/react";

interface ToolbarProps {
  editor: Editor | null;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
  onSaveSlide: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  onAddSlide,
  onDeleteSlide,
  onSaveSlide,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className="text-white p-3 sm:p-4 rounded-lg lg:rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0"
      style={{
        backgroundColor: "#111827",
        borderColor: "#3A4553",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="text-sm font-medium text-gray-400 hidden sm:block">
          Format:
        </div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("bold")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("bold") ? "#f97316" : "#1F2937",
          }}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("italic")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("italic") ? "#f97316" : "#1F2937",
          }}
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("strike")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("strike") ? "#f97316" : "#1F2937",
          }}
        >
          <s>S</s>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <button
          onClick={onAddSlide}
          className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
        >
          + New Slide
        </button>
        <button
          onClick={onSaveSlide}
          className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
        >
          Save
        </button>
        <button
          onClick={onDeleteSlide}
          className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
