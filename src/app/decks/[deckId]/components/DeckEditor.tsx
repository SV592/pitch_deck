"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Deck, Slide as SlideType } from "../types";
import Slide from "./Slide";
import SlideThumbnail from "./SlideThumbnail";
import Toolbar from "./Toolbar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { FontSize } from "@tiptap/extension-font-size";
import FontFamily from "@tiptap/extension-font-family";

interface DeckEditorProps extends EditorProviderProps {
  deck: Deck;
  selectedSlide: number;
  onSlideChange: (slideIndex: number) => void;
  onSave: (updatedDeck: Deck) => void;
}

const DeckEditor: React.FC<DeckEditorProps> = ({
  deck,
  selectedSlide,
  onSlideChange,
  onSave,
}) => {
  console.log("Deck data in DeckEditor:", deck);
  const [slides, setSlides] = useState<SlideType[]>(deck.slides || []);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
    ],
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

  const speakerNotesEditor = useEditor({
    extensions: [StarterKit],
    content: slides[selectedSlide]?.speaker_notes || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newSlides = [...slides];
      if (newSlides[selectedSlide]) {
        newSlides[selectedSlide].speaker_notes = editor.getHTML();
        setSlides(newSlides);
      }
    },
  });

  useEffect(() => {
    setSlides(deck.slides || []);
  }, [deck]);

  // Update editor content when slide changes
  useEffect(() => {
    if (editor && !editor.isDestroyed && slides[selectedSlide]) {
      const slideContent = slides[selectedSlide].content || "";
      if (editor.getHTML() !== slideContent) {
        editor.commands.setContent(slideContent, false);
        // If the content is not a list, ensure bulletList is not active
        if (!slideContent.includes("<ul>") && editor.isActive("bulletList")) {
          editor.commands.toggleBulletList();
        }
      }
    }
    if (
      speakerNotesEditor &&
      !speakerNotesEditor.isDestroyed &&
      slides[selectedSlide]
    ) {
      const speakerNotesContent = slides[selectedSlide].speaker_notes || "";
      if (speakerNotesEditor.getHTML() !== speakerNotesContent) {
        speakerNotesEditor.commands.setContent(speakerNotesContent);
      }
    }
  }, [selectedSlide, editor, speakerNotesEditor]);

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
          "<p>This is placeholder content.</p>";
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

  const handleSave = () => {
    const updatedDeck = { ...deck, slides };
    onSave(updatedDeck);
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
        }

        .speaker-notes-exit-active {
          transform: translateX(100%);
          transition: transform 300ms ease-in-out;
        }
      `}</style>
      <div className="flex flex-col lg:flex-row h-screen max-h-screen overflow-hidden bg-gray-900">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden flex-shrink-0 p-3 sm:p-4 border-b border-gray-700 bg-gray-900">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center justify-center space-x-2 w-full text-white bg-orange-500 hover:bg-orange-600 px-4 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="text-sm sm:text-base">
              {showSidebar ? "Hide" : "Show"} Slides
            </span>
            <span className="text-xs bg-orange-600 px-2 py-1 rounded-full font-semibold">
              {slides.length}
            </span>
          </button>
        </div>

        {/* Slides Sidebar */}
        <div
          className={`
            ${showSidebar ? "flex" : "hidden"} lg:flex
            flex-col w-full lg:w-80 xl:w-96
            border-b lg:border-b-0 lg:border-r border-gray-700
            bg-gray-800
          `}
        >
          {/* Sidebar Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 lg:p-6 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-3">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <h3 className="text-lg lg:text-xl font-bold text-white">
                Slides
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-300 bg-gray-700 px-3 py-1 rounded-full font-medium">
                {slides.length} slides
              </span>
              {/* Mobile close button */}
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
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
          </div>

          {/* Scrollable Slides Area */}
          <div
            className="flex-1 overflow-y-auto border-b border-gray-700 bg-gray-800 custom-scrollbar"
            style={{
              height: "calc(100vh - 200px)",
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <div className="p-3 lg:p-4 space-y-3">
              {slides.map((slide, index) => (
                <div key={slide.id} className="relative">
                  <SlideThumbnail
                    slide={slide}
                    index={index}
                    isSelected={index === selectedSlide}
                    onClick={() => handleSlideSelect(index)}
                    moveSlide={moveSlide}
                  />
                </div>
              ))}
              {/* Bottom spacer for better scrolling */}
              <div className="h-6"></div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="flex-shrink-0 p-4 lg:p-6 bg-gray-800">
            <button
              onClick={addSlide}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add New Slide</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col bg-gray-900 overflow-hidden"
          style={{ minWidth: 0 }}
        >
          {/* Toolbar */}
          <div className="flex-shrink-0 p-3 lg:p-4 border-b border-gray-700 bg-gray-900">
            <div className="max-w-full overflow-x-auto no-scrollbar">
              <Toolbar
                editor={editor}
                onAddSlide={addSlide}
                onDeleteSlide={deleteSlide}
              />
            </div>
          </div>

          {/* Main Slide Editor */}
          <div
            className="flex-1 flex items-center justify-center p-4 lg:p-6 xl:p-8 bg-gray-900 overflow-hidden"
            style={{ minHeight: 0 }}
          >
            <div
              className="w-full h-full p-6 lg:p-8 rounded-2xl border-2 border-gray-700 shadow-2xl bg-gray-800 flex items-center justify-center overflow-hidden"
              style={{
                maxWidth: "min(100%, 80vh * 16/9)",
                maxHeight: "70vh",
                aspectRatio: "16/9",
              }}
            >
              <div className="w-full h-full overflow-y-auto custom-scrollbar">
                {slides.length > 0 && slides[selectedSlide] && (
                  <Slide
                    slide={slides[selectedSlide]}
                    editor={editor}
                    onTitleChange={handleTitleChange}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 p-4 lg:p-6 border-t border-gray-700 bg-gray-900">
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end items-center">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base shadow-lg hover:shadow-xl flex items-center space-x-2"
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
                onClick={deleteSlide}
                disabled={slides.length <= 1}
                className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 text-sm lg:text-base shadow-lg hover:shadow-xl flex items-center space-x-2"
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
                onClick={regenerateContent}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm lg:text-base"
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
                onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm lg:text-base"
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
        </div>

        {/* Speaker Notes Panel - Animated */}
        {showSpeakerNotes && (
          <div className="w-full lg:w-80 xl:w-96 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-700 bg-gray-800 overflow-hidden flex-shrink-0">
            {/* Notes Header */}
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
                onClick={() => setShowSpeakerNotes(false)}
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

            {/* Notes Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
              {slides.length > 0 && slides[selectedSlide] && (
                <div className="text-gray-300 text-sm lg:text-base leading-relaxed">
                  <EditorContent
                    editor={speakerNotesEditor}
                    className="prose-invert max-w-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[300px] text-white [&_.ProseMirror]:p-4 [&_.ProseMirror]:rounded-lg [&_.ProseMirror]:bg-gray-700 [&_.ProseMirror]:border [&_.ProseMirror]:border-gray-600 focus-within:[&_.ProseMirror]:border-blue-500 transition-colors"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default DeckEditor;
