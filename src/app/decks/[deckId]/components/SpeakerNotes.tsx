
import React from "react";
import { EditorContent, Editor } from "@tiptap/react";

interface SpeakerNotesProps {
  speakerNotesEditor: Editor | null;
  onClose: () => void;
}

const SpeakerNotes: React.FC<SpeakerNotesProps> = ({
  speakerNotesEditor,
  onClose,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-between p-4 lg:p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          <h3 className="text-lg lg:text-xl font-bold text-white">
            Speaker Notes
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
        <div className="text-gray-300 text-sm lg:text-base leading-relaxed">
          <EditorContent
            editor={speakerNotesEditor}
            className="prose-invert max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px] text-white [&_.ProseMirror]:p-4 [&_.ProseMirror]:rounded-lg [&_.ProseMirror]:bg-gray-700 [&_.ProseMirror]:border [&_.ProseMirror]:border-gray-600 focus-within:[&_.ProseMirror]:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default SpeakerNotes;
