
'use client'

import React from 'react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor | null;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, onAddSlide, onDeleteSlide }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="bg-gray-800 text-white p-2 rounded-t-lg shadow-md mb-0 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-2 rounded-lg ${editor.isActive('bold') ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-2 rounded-lg ${editor.isActive('italic') ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-2 rounded-lg ${editor.isActive('strike') ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          Strike
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onAddSlide}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          New Slide
        </button>
        <button
          onClick={onDeleteSlide}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Delete Slide
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
