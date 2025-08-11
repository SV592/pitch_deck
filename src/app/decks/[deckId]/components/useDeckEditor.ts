
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";

import { Deck, Slide as SlideType } from "../types";



export interface UseDeckEditorProps {
  deck: Deck;
  selectedSlide: number;
  onSlideChange: (slideIndex: number) => void;
  onSave: (updatedDeck: Deck) => void;
  accessToken: string;
  onClosePromptModal: () => void;
}

export const useDeckEditor = ({
  deck,
  selectedSlide,
  onSlideChange,
  onSave,
  accessToken,
  onClosePromptModal,
}: UseDeckEditorProps) => {
  const [slides, setSlides] = useState<SlideType[]>([]);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState<string | null>(null);

  useEffect(() => {
    if (deck && deck.slides) {
      setSlides(deck.slides);
    }
  }, [deck]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      // Bold.configure(),
      // Italic.configure(),
      // Underline.configure(),
      // BulletList.configure(),
      // OrderedList.configure(),
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),

    ],
    content: slides[selectedSlide]?.content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newSlides = [...(slides || [])];
      if (newSlides[selectedSlide]) {
        newSlides[selectedSlide].content = editor.getHTML();
        setSlides(newSlides);
      }
    },
  });

  const speakerNotesEditor = useEditor({
    extensions: [
      StarterKit.configure(),
      // Add other extensions here as needed, configured
    ],
    content: slides[selectedSlide]?.speaker_notes || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newSlides = [...(slides || [])];
      if (newSlides[selectedSlide]) {
        newSlides[selectedSlide].speaker_notes = editor.getHTML();
        setSlides(newSlides);
      }
    },
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed && slides[selectedSlide]) {
      const slideContent = slides[selectedSlide].content || "";
      if (editor.getHTML() !== slideContent) {
        editor.commands.setContent(slideContent, false);
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
  }, [selectedSlide, editor, speakerNotesEditor, slides]);

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      setSlides((prevSlides) => {
        const newSlides = [...(prevSlides || [])];
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
      order: 0, // Temporary value, will be re-indexed
    };
    setSlides((prevSlides) => {
      const updatedSlides = [...(prevSlides || [])];
      updatedSlides.splice(selectedSlide + 1, 0, newSlide);
      // Re-index all slides
      return updatedSlides.map((slide, index) => ({ ...slide, order: index }));
    });
    onSlideChange(selectedSlide + 1);
  }, [slides?.length, onSlideChange, selectedSlide]);

  const deleteSlide = useCallback(() => {
    if ((slides?.length || 0) > 1) {
      setSlides((prevSlides) => {
        const updatedSlides = (prevSlides || []).filter((_, index) => index !== selectedSlide);
        // Re-index all slides
        return updatedSlides.map((slide, index) => ({ ...slide, order: index }));
      });
      const newSelectedSlide = Math.max(0, selectedSlide - 1);
      onSlideChange(newSelectedSlide);
    }
  }, [slides?.length, selectedSlide, onSlideChange]);

  

  const regenerateSlideContent = useCallback(async (prompt: string) => {
    if (!slides?.[selectedSlide] || !deck) return;

    setIsGeneratingContent(true);
    setOriginalContent(slides[selectedSlide].content); // Store original content
    setGeneratedContent(null); // Clear previous generated content
    try {
      const response = await fetch(`http://localhost:3001/decks/slides/regenerate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          deckId: deck.id,
          slideId: slides[selectedSlide].id,
          prompt: prompt,
          deckDescription: deck.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to regenerate slide: ${response.statusText}`);
      }

      const data = await response.json();
      setGeneratedContent(data.content); // Store newly generated content
      // Do NOT update slides here, wait for user to accept

    } catch (error) {
      console.error("Error regenerating slide:", error);
      // Optionally, show an error message to the user
    } finally {
      setIsGeneratingContent(false);
    }
  }, [deck?.id, selectedSlide, slides]);

  const moveSlide = useCallback((fromIndex: number, toIndex: number) => {
    setSlides((prevSlides) => {
      const updatedSlides = [...(prevSlides || [])];
      const [movedSlide] = updatedSlides.splice(fromIndex, 1);
      updatedSlides.splice(toIndex, 0, movedSlide);
      // Re-index all slides
      return updatedSlides.map((slide, index) => ({ ...slide, order: index }));
    });
  }, []);

  const handleSave = useCallback(() => {
    const updatedDeck = { ...deck, slides: slides || [] };
    onSave(updatedDeck);
  }, [deck, slides, onSave]);

  const isInitialMount = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleSave();
    }, 60000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [slides, handleSave]);

  const onAcceptGeneratedContent = useCallback((content: string) => {
    setSlides((prevSlides) => {
      const newSlides = [...(prevSlides || [])];
      if (newSlides[selectedSlide]) {
        newSlides[selectedSlide].content = content;
      }
      return newSlides;
    });
    setGeneratedContent(null);
    setOriginalContent(null);
    onClosePromptModal();
  }, [selectedSlide, slides, onClosePromptModal]);

  const onDiscardGeneratedContent = useCallback(() => {
    setGeneratedContent(null);
    setOriginalContent(null);
    onClosePromptModal();
  }, [onClosePromptModal]);

  return {
    slides,
    editor,
    speakerNotesEditor,
    handleTitleChange,
    addSlide,
    deleteSlide,
    regenerateSlideContent,
    moveSlide,
    handleSave,
    isGeneratingContent,
    generatedContent,
    originalContent,
    onAcceptGeneratedContent,
    onDiscardGeneratedContent,
  };
};
