"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Deck, Slide as SlideType } from "../types";
import Slide from "./Slide";
import SlideThumbnail from "./SlideThumbnail";
import Toolbar from "./Toolbar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface DeckEditorProps {
  deck: Deck;
  selectedSlide: number;
  onSlideChange: (slideIndex: number) => void;
}

const DeckEditor: React.FC<DeckEditorProps> = ({
  deck,
  selectedSlide,
  onSlideChange,
}) => {
  const [slides, setSlides] = useState<SlideType[]>(deck.slides || []);
  const [showSidebar, setShowSidebar] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: slides[selectedSlide]?.content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newSlides = [...slides];
      if (newSlides[selectedSlide]) {
        newSlides[selectedSlide].content = editor.getHTML();
        setSlides(newSlides);
      }
    },
  });

  // Load saved slides on mount
  useEffect(() => {
    const savedSlides = localStorage.getItem("deck_slides");
    if (savedSlides) {
      try {
        setSlides(JSON.parse(savedSlides));
      } catch (error) {
        console.error("Error loading saved slides:", error);
      }
    }
  }, []);

  // Save slides to localStorage
  useEffect(() => {
    localStorage.setItem("deck_slides", JSON.stringify(slides));
  }, [slides]);

  // Update editor content when slide changes
  useEffect(() => {
    if (editor && !editor.isDestroyed && slides[selectedSlide]) {
      const slideContent = slides[selectedSlide].content || "";
      if (editor.getHTML() !== slideContent) {
        editor.commands.setContent(slideContent);
      }
    }
  }, [selectedSlide, editor]); // Removed slides dependency to prevent loop

  const handleSlideSelect = useCallback(
    (slideIndex: number) => {
      onSlideChange(slideIndex);
      setShowSidebar(false); // Hide sidebar on mobile after selection
    },
    [onSlideChange]
  );

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setSlides((prevSlides) => {
        const newSlides = [...prevSlides];
        if (newSlides[selectedSlide]) {
          newSlides[selectedSlide].title = newTitle;
        }
        return newSlides;
      });
    },
    [selectedSlide]
  );

  const addSlide = useCallback(() => {
    const newSlide: SlideType = {
      id: Date.now().toString(),
      title: "New Slide",
      content: "<p>This is a new slide.</p>",
      order: slides.length + 1,
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
    onSlideChange(slides.length); // Select the new slide
  }, [slides.length, onSlideChange]);

  const deleteSlide = useCallback(() => {
    if (slides.length > 1) {
      setSlides((prevSlides) =>
        prevSlides.filter((_, index) => index !== selectedSlide)
      );
      const newSelectedSlide = Math.max(0, selectedSlide - 1);
      onSlideChange(newSelectedSlide);
    }
  }, [slides.length, selectedSlide, onSlideChange]);

  const regenerateContent = useCallback(() => {
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      if (newSlides[selectedSlide]) {
        newSlides[selectedSlide].content =
          "<p>This is some AI-generated content!</p>";
      }
      return newSlides;
    });
  }, [selectedSlide]);

  const moveSlide = useCallback((fromIndex: number, toIndex: number) => {
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      const [movedSlide] = updatedSlides.splice(fromIndex, 1);
      updatedSlides.splice(toIndex, 0, movedSlide);
      return updatedSlides;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)]">
        {/* Mobile Sidebar Toggle */}
        <div
          className="lg:hidden p-4 border-b"
          style={{ borderColor: "#3A4553" }}
        >
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center space-x-2 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>{showSidebar ? "Hide" : "Show"} Slides</span>
            <span className="text-sm bg-orange-600 px-2 py-1 rounded-full">
              {slides.length}
            </span>
          </button>
        </div>

        {/* Sidebar with thumbnails */}
        <div
          className={`
            ${showSidebar ? "block" : "hidden"} lg:block
            w-full lg:w-1/4 xl:w-1/5
            overflow-y-auto p-3 sm:p-4 lg:p-6 
            space-y-2 sm:space-y-3 
            border-b lg:border-b-0 lg:border-r
            max-h-60 lg:max-h-none
          `}
          style={{
            backgroundColor: "#111827",
            borderColor: "#3A4553",
          }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Slides
            </h3>
            <span className="text-xs text-gray-400 bg-[#1F2937] px-2 py-1 rounded-full">
              {slides.length}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3">
            {slides.map((slide, index) => (
              <SlideThumbnail
                key={slide.id}
                slide={slide}
                index={index}
                isSelected={index === selectedSlide}
                onClick={() => handleSlideSelect(index)}
                moveSlide={moveSlide}
                theme={deck.theme}
              />
            ))}
          </div>
        </div>

        {/* Main editor area */}
        <div
          className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4"
          style={{ backgroundColor: "#1F2937" }}
        >
          <Toolbar
            editor={editor}
            onAddSlide={addSlide}
            onDeleteSlide={deleteSlide}
          />

          <div
            className="flex-grow p-3 sm:p-4 lg:p-6 rounded-lg lg:rounded-xl border overflow-hidden"
            style={{
              backgroundColor: "#111827",
              borderColor: "#3A4553",
            }}
          >
            {slides.length > 0 && slides[selectedSlide] && (
              <Slide
                slide={slides[selectedSlide]}
                editor={editor}
                onTitleChange={handleTitleChange}
                theme={deck.theme}
              />
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-end">
            <button
              onClick={regenerateContent}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center space-x-2"
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
              <span>Regenerate Content</span>
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default DeckEditor;
