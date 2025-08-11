"use client";

import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Deck, Slide as SlideType } from "../types";
import { UseDeckEditorProps } from "./useDeckEditor"; // Import UseDeckEditorProps
import SlideList from "./SlideList";
import EditorPanel from "./EditorPanel";
import SpeakerNotes from "./SpeakerNotes";
import DeckEditorActions from "./DeckEditorActions";
import MobileSidebarToggle from "./MobileSidebarToggle";
import PromptModal from "./PromptModal";

// Define the new props interface for DeckEditor
interface DeckEditorProps {
  deck: Deck;
  selectedSlide: number;
  onSlideChange: (slideIndex: number) => void;
  slides: SlideType[];
  editor: any; // Tiptap Editor instance
  speakerNotesEditor: any; // Tiptap Editor instance for speaker notes
  handleTitleChange: (newTitle: string) => void;
  addSlide: () => void;
  deleteSlide: () => void;
  onSave: () => void;
  regenerateSlideContent: (prompt: string) => Promise<void>;
  isSaving: boolean;
  saveSuccess: boolean | null;
  moveSlide: (fromIndex: number, toIndex: number) => void;
  isGeneratingContent: boolean;
  generatedContent: string | null;
  originalContent: string | null;
  onAcceptGeneratedContent: (content: string) => void;
  onDiscardGeneratedContent: () => void;
  accessToken: string;
}

const DeckEditor: React.FC<DeckEditorProps> = ({
  deck,
  selectedSlide,
  onSlideChange,
  slides,
  editor,
  speakerNotesEditor,
  handleTitleChange,
  addSlide,
  deleteSlide,
  onSave,
  regenerateSlideContent,
  isSaving,
  saveSuccess,
  moveSlide,
  isGeneratingContent,
  generatedContent,
  originalContent,
  onAcceptGeneratedContent,
  onDiscardGeneratedContent,
  accessToken,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [showSlideList, setShowSlideList] = useState(true); // New state for slide list toggle

  const handleDownload = async () => {
    const { generatePptx } = await import("./pptx-generator");
    const updatedDeck = { ...deck, slides };
    generatePptx(updatedDeck);
  };

  const handlePromptSubmit = async (prompt: string) => {
    await regenerateSlideContent(prompt);
    // Do NOT close modal here, wait for user to accept/discard
  };

  const handleSlideSelect = useCallback(
    (slideIndex: number) => {
      onSlideChange(slideIndex);
      setShowSidebar(false); // Hide sidebar on mobile after selection
    },
    [onSlideChange]
  );

  const toggleSlideList = () => {
    setShowSlideList(!showSlideList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <style jsx global>{`
        /* Custom Scrollbars */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6b7280 0%, #4b5563 100%);
          border-radius: 4px;
          border: 1px solid #374151;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9ca3af 0%, #6b7280 100%);
        }

        .custom-scrollbar::-webkit-scrollbar-corner {
          background: #374151;
        }

        /* Firefox scrollbar styling */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6b7280 #374151;
        }

        /* Hide scrollbars on specific elements */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Speaker notes animation */
        .speaker-notes-enter {
          transform: translateX(100%);
        }

        .speaker-notes-enter-active {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }

        .speaker-notes-exit {
          transform: translateX(0);
          transition: transform 300ms ease-in-out;
        }

        .speaker-notes-exit-active {
          transform: translateX(100%);
          transition: transform 300ms ease-in-out;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden bg-gray-900">
        <MobileSidebarToggle
          isOpen={showSidebar}
          onToggle={() => setShowSidebar(!showSidebar)}
          slideCount={slides?.length || 0}
        />

        {/* Slide List Panel with Toggle */}
        <div
          className={`
            ${showSidebar ? "flex" : "hidden"} lg:flex flex-col
            transition-all duration-300 ease-in-out
            bg-gray-800
            ${showSlideList ? "w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-gray-700" : "w-0 border-transparent"}
          `}
        >
          {/* Slide List Content */}
          <div
            className={`flex-1 transition-opacity duration-300 ease-in-out ${
              showSlideList ? "opacity-100" : "opacity-0"
            } overflow-hidden`}
          >
            <SlideList
              slides={slides}
              selectedSlide={selectedSlide}
              onSlideSelect={handleSlideSelect}
              moveSlide={moveSlide}
            />
          </div>
        </div>

        <div
          className="flex-1 flex flex-col bg-gray-900 overflow-hidden"
          style={{ minWidth: 0 }}
        >
          <EditorPanel
            editor={editor}
            slides={slides}
            selectedSlide={selectedSlide}
            onTitleChange={handleTitleChange}
            onDeleteSlide={deleteSlide}
          />
          <DeckEditorActions
            onDownload={handleDownload}
            onSave={onSave}
            onAddSlide={addSlide}
            onDeleteSlide={deleteSlide}
            isDeleteDisabled={(slides?.length || 0) <= 1}
            onOpenPromptModal={() => setIsPromptModalOpen(true)} // Added back
            onToggleSpeakerNotes={() => setShowSpeakerNotes(!showSpeakerNotes)}
            showSpeakerNotes={showSpeakerNotes}
            onToggleSlideList={toggleSlideList}
            showSlideList={showSlideList}
            isGeneratingContent={isGeneratingContent} // Added back
            isSaving={isSaving}
            saveSuccess={saveSuccess}
          />
        </div>

        {/* Speaker Notes Panel */}
        <div
          className={`
            flex flex-col
            transition-all duration-300 ease-in-out
            bg-gray-800
            ${showSpeakerNotes ? "w-full lg:w-80 xl:w-96 border-l border-gray-700" : "w-0 border-transparent"}
          `}
        >
          <SpeakerNotes
            speakerNotesEditor={speakerNotesEditor}
            onClose={() => setShowSpeakerNotes(false)}
          />
        </div>

        <PromptModal
          isOpen={isPromptModalOpen}
          onClose={() => setIsPromptModalOpen(false)}
          onSubmit={handlePromptSubmit} // This will be removed later
          initialPrompt={currentPrompt}
          originalContent={originalContent}
          generatedContent={generatedContent}
          onAcceptGeneratedContent={onAcceptGeneratedContent}
          onDiscardGeneratedContent={onDiscardGeneratedContent}
          onGenerateContent={regenerateSlideContent} // New prop
          isGeneratingContent={isGeneratingContent} // New prop
        />
      </div>
    </DndProvider>
  );
};

export default DeckEditor;