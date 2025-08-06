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
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("underline")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("underline") ? "#f97316" : "#1F2937",
          }}
        >
          <u>U</u>
        </button>
        <select
          onChange={(e) => editor.chain().focus().setTextAlign(e.target.value).run()}
          value={editor.active_? editor.active_.textAlign : 'left'}
          className="bg-[#1F2937] text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <input
          type="color"
          onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
          value={editor.getAttributes('textStyle').color}
          className="w-8 h-8 p-1 bg-[#1F2937] rounded-lg"
        />
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontFamily}
          className="bg-[#1F2937] text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
        >
          <option value="">Default</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
        <select
          onChange={(e) => editor.chain().focus().setHeading({ level: parseInt(e.target.value) }).run()}
          value={editor.getAttributes('heading').level}
          className="bg-[#1F2937] text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
        >
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            editor.isActive("bulletList")
              ? "bg-orange-500 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          style={{
            backgroundColor: editor.isActive("bulletList") ? "#f97316" : "#1F2937",
          }}
        >
          Bullets
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
