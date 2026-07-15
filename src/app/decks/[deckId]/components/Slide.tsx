"use client";

import React, { useState, useEffect } from "react";
import { Slide as SlideType, Theme } from "../types";
import { EditorContent, Editor } from "@tiptap/react";
import { resolveTheme } from "./deck-themes";

interface SlideProps {
  slide: SlideType;
  editor: Editor | null;
  onTitleChange: (newTitle: string) => void;
  theme: Theme;
}

const Slide: React.FC<SlideProps> = ({ slide, editor, onTitleChange, theme }) => {
  const resolved = resolveTheme(theme);
  const bg = `#${resolved.background}`;
  const textColor = `#${resolved.text}`;
  const accent = `#${resolved.accent}`;
  const [title, setTitle] = useState(slide.title);

  useEffect(() => {
    setTitle(slide.title);
  }, [slide]);

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      let editorContent = slide.content;

      if (!editorContent) {
        const headlineContent = slide.headline ? `${slide.headline}` : ''; // Use directly
        const hookContent = slide.hook ? `${slide.hook}` : ''; // Use directly
        const keyPointsContent = (slide.key_points && slide.key_points.length > 0) ? `${slide.key_points.join('')}` : ''; // Join directly, assuming each key_point is already <li>
        editorContent = `${headlineContent}${hookContent}${keyPointsContent}`.trim();
      }

      if (editor.getHTML() !== editorContent) {
        editor.commands.setContent(editorContent || '<p></p>', { emitUpdate: false });
      }
    }
  }, [slide, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  return (
    <div
      className="h-full w-full p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-xl border border-[#3A4553] flex flex-col font-sans transition-colors duration-200"
      style={{ backgroundColor: bg, color: textColor, fontFamily: resolved.fontFace }}
    >
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="font-bold mb-4 sm:mb-6 bg-transparent border-b-2 border-white/20 focus:border-current outline-none transition-colors duration-200 text-3xl"
        style={{ color: accent }}
        placeholder="Enter slide title..."
      />
      <div className="flex-grow overflow-y-auto" style={{ color: textColor }}>
        <EditorContent
          editor={editor}
          className="prose max-w-none [&_.ProseMirror]:outline-none text-lg"
        />
      </div>
    </div>
  );
};

export default Slide;