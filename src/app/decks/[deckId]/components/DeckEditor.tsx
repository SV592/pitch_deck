
"use client";

import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Deck } from "../types";
import { useDeckEditor, UseDeckEditorProps } from "./useDeckEditor";
import SlideList from "./SlideList";
import EditorPanel from "./EditorPanel";
import SpeakerNotes from "./SpeakerNotes";
import DeckEditorActions from "./DeckEditorActions";
import MobileSidebarToggle from "./MobileSidebarToggle";
import PromptModal from "./PromptModal";

interface DeckEditorProps extends UseDeckEditorProps {}

const DeckEditor: React.FC<DeckEditorProps> = (props) => {
  const {
    slides,
    editor,
    speakerNotesEditor,
    handleTitleChange,
    addSlide,
    deleteSlide,
    aiEnhanceContent,
    moveSlide,
    handleSave,
  } = useDeckEditor(props);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleDownload = async () => {
    const { generatePptx } = await import("./pptx-generator");
    const updatedDeck = { ...props.deck, slides };
    generatePptx(updatedDeck);
  };

  const handlePromptSubmit = async (prompt: string) => {
    await aiEnhanceContent(prompt);
    setIsPromptModalOpen(false);
  };

  const handleSlideSelect = useCallback(
    (slideIndex: number) => {
      props.onSlideChange(slideIndex);
      setShowSidebar(false); // Hide sidebar on mobile after selection
    },
    [props.onSlideChange]
  );

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
          slideCount={slides.length}
        />

        <div
          className={`
            ${
              showSidebar ? "flex" : "hidden"
            } lg:flex flex-col w-full lg:w-80 xl:w-96
            border-b lg:border-b-0 lg:border-r border-gray-700
            bg-gray-800
          `}
        >
          <SlideList
            slides={slides}
            selectedSlide={props.selectedSlide}
            onSlideSelect={handleSlideSelect}
            moveSlide={moveSlide}
          />
        </div>

        <div
          className="flex-1 flex flex-col bg-gray-900 overflow-hidden"
          style={{ minWidth: 0 }}
        >
          <EditorPanel
            editor={editor}
            slides={slides}
            selectedSlide={props.selectedSlide}
            onTitleChange={handleTitleChange}
            onDeleteSlide={deleteSlide}
          />
          <DeckEditorActions
            onDownload={handleDownload}
            onAddSlide={addSlide}
            onDeleteSlide={deleteSlide}
            isDeleteDisabled={slides.length <= 1}
            onOpenPromptModal={() => setIsPromptModalOpen(true)}
            onToggleSpeakerNotes={() => setShowSpeakerNotes(!showSpeakerNotes)}
            showSpeakerNotes={showSpeakerNotes}
          />
        </div>

        {showSpeakerNotes && (
          <SpeakerNotes
            speakerNotesEditor={speakerNotesEditor}
            onClose={() => setShowSpeakerNotes(false)}
          />
        )}

        <PromptModal
          isOpen={isPromptModalOpen}
          onClose={() => setIsPromptModalOpen(false)}
          onSubmit={handlePromptSubmit}
          initialPrompt={currentPrompt}
        />
      </div>
    </DndProvider>
  );
};

export default DeckEditor;
