
import React from "react";

interface DeckEditorActionsProps {
  onSave: () => void;
  onDeleteSlide: () => void;
  isDeleteDisabled: boolean;
  onOpenPromptModal: () => void;
  onToggleSpeakerNotes: () => void;
  showSpeakerNotes: boolean;
}

const DeckEditorActions: React.FC<DeckEditorActionsProps> = ({
  onSave,
  onDeleteSlide,
  isDeleteDisabled,
  onOpenPromptModal,
  onToggleSpeakerNotes,
  showSpeakerNotes,
}) => {
  return (
    <div className="flex-shrink-0 p-4 lg:p-6 border-t border-gray-700 bg-gray-900">
      <div className="flex flex-wrap gap-4 justify-center lg:justify-end items-center">
        <button
          onClick={onSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 text-sm shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span>Save</span>
        </button>
        <button
          onClick={onDeleteSlide}
          disabled={isDeleteDisabled}
          className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 text-sm shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Delete</span>
        </button>
        <button
          onClick={onOpenPromptModal}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden sm:inline">Regenerate Content</span>
          <span className="sm:hidden">Regenerate</span>
        </button>
        <button
          onClick={onToggleSpeakerNotes}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2m7 0V5a2 2 0 012-2h2a2 2 0 012 2v6m-4 0h.01"
            />
          </svg>
          <span className="hidden sm:inline">
            {showSpeakerNotes ? "Hide" : "Show"} Notes
          </span>
          <span className="sm:hidden">Notes</span>
        </button>
      </div>
    </div>
  );
};

export default DeckEditorActions;
