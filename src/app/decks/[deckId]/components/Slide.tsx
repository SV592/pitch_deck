"use client";

import React, { useState, useEffect } from "react";
import { Slide as SlideType } from "../types";
import { EditorContent, Editor } from "@tiptap/react";

interface SlideProps {
  slide: SlideType;
  editor: Editor | null;
  onTitleChange: (newTitle: string) => void;
}

const Slide: React.FC<SlideProps> = ({ slide, editor, onTitleChange }) => {
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
        editor.commands.setContent(editorContent || '<p></p>', false);
      }
    }
  }, [slide, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  return (
    <div
      className="h-full w-full p-4 sm:p-6 lg:p-8 rounded-lg lg:rounded-xl border flex flex-col bg-[#1F2937] border-[#3A4553] text-white font-sans"
    >
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="font-bold mb-4 sm:mb-6 bg-transparent border-b-2 focus:border-primary outline-none placeholder-gray-400 transition-colors duration-200 text-white text-3xl"
        placeholder="Enter slide title..."
      />
      <div className="flex-grow overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose-invert max-w-none [&_.ProseMirror]:outline-none text-white text-lg"
        />
      </div>
    </div>
  );
};

export default Slide;