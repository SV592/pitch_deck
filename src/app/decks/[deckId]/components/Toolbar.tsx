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
            className="bg-[#1F2937] text-white pl-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm appearance-none pr-12 border border-gray-600"
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
        <input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={
            editor.isActive("textStyle")
              ? editor.getAttributes("textStyle").color
              : "#000000"
          }
          className="w-8 h-8 p-1 bg-[#1F2937] rounded-lg"
        />
        <div className="relative">
          <select
            onChange={(e) =>
              editor.chain().focus().setFontFamily(e.target.value).run()
            }
            value={
              editor.isActive("textStyle")
                ? editor.getAttributes("textStyle").fontFamily
                : ""
            }
            className="bg-[#1F2937] text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm appearance-none pr-12 border border-gray-600"
          >
            <option value="">Default</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
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
        <div className="relative">
          <select
            onChange={(e) => {
              const level = parseInt(e.target.value, 10) as 1 | 2 | 3 | 4;
              editor.chain().focus().toggleHeading({ level }).run();
            }}
            value={
              editor.isActive("heading", { level: 1 })
                ? "1"
                : editor.isActive("heading", { level: 2 })
                  ? "2"
                  : editor.isActive("heading", { level: 3 })
                    ? "3"
                    : editor.isActive("heading", { level: 4 })
                      ? "4"
                      : ""
            }
            className="bg-[#1F2937] text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm appearance-none pr-12 border border-gray-600"
          >
            <option value="">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
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
        <div className="relative">
          <select
            onChange={(e) =>
              editor.chain().focus().setFontSize(`${e.target.value}px`).run()
            }
            value={
              editor.getAttributes("textStyle").fontSize?.replace("px", "") ||
              ""
            }
            className="bg-[#1F2937] text-white pl-3 sm:pr-8 py-2 rounded-lg font-medium transition-all duration-200 text-sm appearance-none border border-gray-600"
          >
            <option value="">Size</option>
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
            <option value="24">24px</option>
            <option value="32">32px</option>
            <option value="48">48px</option>
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
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
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
