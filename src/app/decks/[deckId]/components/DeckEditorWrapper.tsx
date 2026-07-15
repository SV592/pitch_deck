"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import DeckEditor from "./DeckEditor";
import { Deck, Theme } from "../types";
import { useDeckEditor } from "./useDeckEditor"; // Import useDeckEditor
import { getPresetById, matchPresetId, DEFAULT_THEME_ID } from "./deck-themes";

interface DeckEditorWrapperProps {
  deck: Deck;
  accessToken: string;
}

const DeckEditorWrapper: React.FC<DeckEditorWrapperProps> = ({ deck, accessToken }) => {
  const router = useRouter();
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null); // null: no save attempt, true: success, false: error
  const [theme, setTheme] = useState<Theme>(
    deck.theme ?? getPresetById(DEFAULT_THEME_ID).theme
  );

  // Single persistence path, shared by autosave, the Save button, and theme
  // changes so no writer can clobber another's fields.
  const saveDeck = useCallback(
    async (updatedDeck: Deck) => {
      setIsSaving(true);
      setSaveSuccess(null); // Reset status on new save attempt
      try {
        const response = await fetch(`/api/decks/${deck.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedDeck),
        });

        if (!response.ok) {
          throw new Error("Failed to save deck");
        }
        setSaveSuccess(true);
      } catch (error) {
        console.error("Error saving deck:", error);
        setSaveSuccess(false);
      } finally {
        setIsSaving(false);
        // Reset save success/error message after a few seconds
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    },
    [deck.id, accessToken]
  );

  // Consume useDeckEditor hook
  const {
    slides,
    editor,
    speakerNotesEditor,
    handleTitleChange,
    addSlide,
    deleteSlide,
    regenerateSlideContent,
    moveSlide,
    handleSave, // This is the handleSave from useDeckEditor
    isGeneratingContent,
    generatedContent,
    originalContent,
    onAcceptGeneratedContent,
    onDiscardGeneratedContent,
  } = useDeckEditor({
    deck,
    theme,
    selectedSlide,
    onSlideChange: setSelectedSlide,
    onSave: saveDeck,
    accessToken,
    onClosePromptModal: () => setIsPromptModalOpen(false), // Assuming setIsPromptModalOpen is defined
  });

  const themeId = matchPresetId(theme);

  const handleThemeChange = useCallback(
    (id: string) => {
      const next = getPresetById(id).theme;
      setTheme(next);
      saveDeck({ ...deck, slides, theme: next });
    },
    [deck, slides, saveDeck]
  );

  const totalSlides = slides.length; // Use slides from useDeckEditor

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');


  const handleNavigateBack = () => {
    router.push("/decks");
  };

  const goToPreviousSlide = () => {
    setSelectedSlide((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setSelectedSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  


  return (
    <div className="flex flex-col h-screen bg-[#111827]">
      {/* Header */}
      <div className="bg-[#111827] border-b border-gray-700 px-6 py-6">
        <div className="container mx-auto ">
          {/* Navigation and Title Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              <button
                onClick={handleNavigateBack}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">Back to Decks</span>
              </button>
            </div>
          </div>

          {/* Title and Slide Navigation */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {deck.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Auto-saved</span>
                </div>
                <span>{totalSlides} slides</span>
              </div>
            </div>

            {/* Slide Navigation */}
            <div className="flex items-center space-x-3">
              <button
                onClick={goToPreviousSlide}
                disabled={selectedSlide === 0}
                className="flex items-center space-x-2 bg-[#1F2937] hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center space-x-2 text-white bg-[#1F2937] px-4 py-2 rounded-lg">
                <span className="text-sm">{selectedSlide + 1}</span>
                <span className="text-gray-400">/</span>
                <span className="text-sm">{totalSlides}</span>
              </div>

              <button
                onClick={goToNextSlide}
                disabled={selectedSlide === totalSlides - 1}
                className="flex items-center space-x-2 bg-[#1F2937] hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <DeckEditor
        deck={deck}
        selectedSlide={selectedSlide}
        onSlideChange={setSelectedSlide}
        // Pass all necessary props from useDeckEditor
        slides={slides}
        editor={editor}
        speakerNotesEditor={speakerNotesEditor}
        handleTitleChange={handleTitleChange}
        addSlide={addSlide}
        deleteSlide={deleteSlide}
        onSave={handleSave}
        regenerateSlideContent={regenerateSlideContent}
        moveSlide={moveSlide}
        isGeneratingContent={isGeneratingContent}
        generatedContent={generatedContent}
        originalContent={originalContent}
        onAcceptGeneratedContent={onAcceptGeneratedContent}
        onDiscardGeneratedContent={onDiscardGeneratedContent}
        accessToken={accessToken}
        isSaving={isSaving}
        saveSuccess={saveSuccess}
        theme={theme}
        themeId={themeId}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
};

export default DeckEditorWrapper;
