"use client";

import React from "react";
import { Editor } from "@tiptap/react";

interface ToolbarProps {
  editor: Editor | null;
  onDeleteSlide: () => void;
  onSaveSlide: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  editor,
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
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <div className="text-sm font-medium text-gray-400 hidden sm:block">
          Format:
        </div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
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
          className={`px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
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
          className={`px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
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
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("underline")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("underline")
              ? "#f97316"
              : "#1F2937",
          }}
        >
          <u>U</u>
        </button>
        <div className="relative">
          <select
            onChange={(e) =>
              editor.chain().focus().setTextAlign(e.target.value).run()
            }
            value={
              editor.isActive({ textAlign: "left" })
                ? "left"
                : editor.isActive({ textAlign: "center" })
                  ? "center"
                  : editor.isActive({ textAlign: "right" })
                    ? "right"
                    : editor.isActive({ textAlign: "justify" })
                      ? "justify"
                      : "left"
            }
            className="bg-[#1F2937] text-white pl-4 py-1.5 rounded-lg font-medium transition-all duration-200 text-sm appearance-none pr-12 border border-gray-600"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("bulletList")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("bulletList")
              ? "#f97316"
              : "#1F2937",
          }}
        >
          Bullets
        </button>
        
      </div>
    </div>
  );
};

export default Toolbar;
