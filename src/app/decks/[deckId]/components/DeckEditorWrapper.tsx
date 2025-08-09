"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeckEditor from "../components/DeckEditor";
import { Deck } from "../types";

interface DeckEditorWrapperProps {
  deck: Deck;
}

const DeckEditorWrapper: React.FC<DeckEditorWrapperProps> = ({ deck }) => {
  const router = useRouter();
  const [selectedSlide, setSelectedSlide] = useState(0);
  const totalSlides = deck.slides.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't interfere with typing in inputs or when editor is focused
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement)?.closest('[contenteditable="true"]')
      ) {
        return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          setSelectedSlide((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          event.preventDefault();
          setSelectedSlide((prev) => Math.min(totalSlides - 1, prev + 1));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSlides]);

  const handleNavigateBack = () => {
    router.push("/decks");
  };

  const goToPreviousSlide = () => {
    setSelectedSlide((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setSelectedSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

  const handleSave = async (updatedDeck: Deck) => {
    try {
      const response = await fetch(`/api/decks/${deck.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDeck),
      });

      if (!response.ok) {
        throw new Error("Failed to save deck");
      }
    } catch (error) {
      // Optionally, you can show an error message to the user
    }
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
        onSave={handleSave}
        className="flex-grow"
      />
    </div>
  );
};

export default DeckEditorWrapper;
