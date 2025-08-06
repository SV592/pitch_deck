"use client";

import React, { useState, useEffect } from "react";
import { Slide as SlideType } from "../types";
import { EditorContent, Editor } from "@tiptap/react";

interface SlideProps {
  slide: SlideType;
  editor: Editor | null;
  onTitleChange: (newTitle: string) => void;
  theme: any;
}

const Slide: React.FC<SlideProps> = ({ slide, editor, onTitleChange, theme }) => {
  const [title, setTitle] = useState(slide.title);

  useEffect(() => {
    setTitle(slide.title);
  }, [slide]);

  useEffect(() => {
    if (editor && !editor.isDestroyed && slide.content !== editor.getHTML()) {
      editor.commands.setContent(slide.content);
    }
  }, [slide, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  const slideStyle = {
    backgroundColor: theme?.colorPalette?.secondary || '#1F2937',
    borderColor: theme?.colorPalette?.secondary || '#3A4553',
    color: theme?.colorPalette?.accent || '#FFFFFF',
    fontFamily: theme?.typography?.fontFamily || 'sans-serif',
  };

  const titleStyle = {
    color: theme?.colorPalette?.primary || '#FFFFFF',
  };

  return (
    <div
      className="h-full w-full p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-xl border flex flex-col"
      style={slideStyle}
    >
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-transparent border-b-2 focus:border-primary outline-none placeholder-gray-400 transition-colors duration-200"
        placeholder="Enter slide title..."
        style={titleStyle}
      />
      <div className="flex-grow overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-invert max-w-none text-sm sm:text-base [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full"
        />
      </div>
    </div>
  );
};

export default Slide;