
'use client'

import React, { useState, useEffect } from 'react';
import { Slide as SlideType } from '../types';
import { EditorContent, Editor } from '@tiptap/react';

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
    if (editor && !editor.isDestroyed && slide.content !== editor.getHTML()) {
      editor.commands.setContent(slide.content);
    }
  }, [slide, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange(e.target.value);
  };

  return (
    <div className="bg-white h-full w-full p-8 rounded-lg shadow-lg flex flex-col">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="text-4xl font-bold mb-4 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
      />
      <EditorContent editor={editor} className="flex-grow overflow-y-auto" />
    </div>
  );
};

export default Slide;
