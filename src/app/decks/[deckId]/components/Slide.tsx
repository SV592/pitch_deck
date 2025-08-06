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
  console.log("Slide data received:", slide);
  const [title, setTitle] = useState(slide.title);

  useEffect(() => {
    setTitle(slide.title);
  }, [slide]);

  // The Tiptap editor will now only manage the main content area if needed, or can be removed if not used for editing these fields
  useEffect(() => {
    // If you still want to use the editor for some editable content, you'd set it here.
    // For now, we're rendering headline, hook, key_points directly.
    // If speaker_notes is editable, it would be a separate editor instance.
    if (editor && !editor.isDestroyed && slide.speaker_notes !== editor.getHTML()) {
      // editor.commands.setContent(slide.speaker_notes || ""); // Removed as speaker notes are now separate
    }
  }, [slide, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  const slideStyle = {
    backgroundColor: theme?.colorPalette?.background || '#1F2937',
    borderColor: theme?.colorPalette?.secondary || '#3A4553',
    color: theme?.colorPalette?.text || '#FFFFFF',
    fontFamily: theme?.typography?.fontFamily || 'sans-serif',
  };

  const titleStyle = {
    color: theme?.colorPalette?.primary || '#FFFFFF',
    fontSize: theme?.typography?.titleSize || '3rem',
  };

  const bodyStyle = {
    color: theme?.colorPalette?.text || '#FFFFFF',
    fontSize: theme?.typography?.bodySize || '1.5rem',
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
        className="font-bold mb-4 sm:mb-6 bg-transparent border-b-2 focus:border-primary outline-none placeholder-gray-400 transition-colors duration-200"
        placeholder="Enter slide title..."
        style={titleStyle}
      />

      {slide.headline && <h2 className="text-2xl font-bold mb-2" style={bodyStyle}>{slide.headline}</h2>}
      {slide.hook && <p className="text-lg italic mb-4" style={bodyStyle}>{slide.hook}</p>}
      {slide.key_points && slide.key_points.length > 0 && (
        <ul className="list-disc list-inside mb-4">
          {slide.key_points.map((point, index) => (
            <li key={index} className="text-base" style={bodyStyle}>{point}</li>
          ))}
        </ul>
      )}

      {/* Speaker Notes Section */}
      {slide.speaker_notes && (
        <div className="mt-4 p-3 border-t border-gray-600 bg-gray-700 rounded-md text-gray-300 text-sm">
          <h3 className="font-semibold mb-2 text-white">Speaker Notes:</h3>
          <p>{slide.speaker_notes}</p>
        </div>
      )}
    </div>
  );
};

export default Slide;