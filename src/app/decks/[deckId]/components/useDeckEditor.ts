
"use client";

import { useState, useEffect, useCallback } from "react";
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
}

export const useDeckEditor = ({
  deck,
  selectedSlide,
  onSlideChange,
  onSave,
}: UseDeckEditorProps) => {
  const [slides, setSlides] = useState<SlideType[]>(deck.slides || []);

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
        alignments: ["left", "center", "right", "justify"],
      }),
      
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
      order: selectedSlide + 1,
    };
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides];
      updatedSlides.splice(selectedSlide + 1, 0, newSlide);
      return updatedSlides;
    });
    onSlideChange(selectedSlide + 1);
  }, [slides.length, onSlideChange, selectedSlide]);

  const deleteSlide = useCallback(() => {
    if (slides.length > 1) {
      setSlides((prevSlides) =>
        prevSlides.filter((_, index) => index !== selectedSlide)
      );
      const newSelectedSlide = Math.max(0, selectedSlide - 1);
      onSlideChange(newSelectedSlide);
    }
  }, [slides.length, selectedSlide, onSlideChange]);

  

  const regenerateSlideContent = useCallback(async (prompt: string) => {
    if (!slides[selectedSlide]) return;

    try {
      const response = await fetch(`/decks/${deck.id}/slides/regenerate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slideId: slides[selectedSlide].id,
          prompt: prompt,
          deckDescription: deck.description,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to regenerate slide: ${response.statusText}`);
      }

      const data = await response.json();
      setSlides((prevSlides) => {
        const newSlides = [...prevSlides];
        if (newSlides[selectedSlide]) {
          newSlides[selectedSlide].content = data.content; 
        }
        return newSlides;
      });
    } catch (error) {
      console.error("Error regenerating slide:", error);
      // Optionally, show an error message to the user
    }
  }, [deck.id, selectedSlide, slides]);

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
  };
};
