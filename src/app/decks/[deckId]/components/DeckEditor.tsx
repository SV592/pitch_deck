
'use client'

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Deck, Slide as SlideType } from '../types';
import Slide from './Slide';
import SlideThumbnail from './SlideThumbnail';
import Toolbar from './Toolbar';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface DeckEditorProps {
  deck: Deck;
}

const DeckEditor: React.FC<DeckEditorProps> = ({ deck }) => {
  const [slides, setSlides] = useState<SlideType[]>(deck.slides);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: slides[selectedSlide]?.content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const newSlides = [...slides];
      newSlides[selectedSlide].content = editor.getHTML();
      setSlides(newSlides);
    },
  });

  useEffect(() => {
    const savedSlides = localStorage.getItem('deck_slides');
    if (savedSlides) {
      setSlides(JSON.parse(savedSlides));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('deck_slides', JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(slides[selectedSlide]?.content || '');
    }
  }, [selectedSlide, slides, editor]);

  const handleTitleChange = (newTitle: string) => {
    const newSlides = [...slides];
    newSlides[selectedSlide].title = newTitle;
    setSlides(newSlides);
  };

  const addSlide = () => {
    const newSlide: SlideType = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: '<p>This is a new slide.</p>',
      order: slides.length + 1,
    };
    setSlides([...slides, newSlide]);
    setSelectedSlide(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.filter((_, index) => index !== selectedSlide);
      setSlides(newSlides);
      setSelectedSlide(Math.max(0, selectedSlide - 1));
    }
  };

  const regenerateContent = () => {
    const newSlides = [...slides];
    newSlides[selectedSlide].content = '<p>This is some AI-generated content!</p>';
    setSlides(newSlides);
  };

  const moveSlide = (fromIndex: number, toIndex: number) => {
    const updatedSlides = [...slides];
    const [movedSlide] = updatedSlides.splice(fromIndex, 1);
    updatedSlides.splice(toIndex, 0, movedSlide);
    setSlides(updatedSlides);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-[calc(100vh-10rem)] bg-gray-100">
        <div className="w-1/4 overflow-y-auto p-4 space-y-2 bg-gray-200">
          {slides.map((slide, index) => (
            <SlideThumbnail
              key={slide.id}
              slide={slide}
              index={index}
              isSelected={index === selectedSlide}
              onClick={() => setSelectedSlide(index)}
              moveSlide={moveSlide}
            />
          ))}
        </div>
        <div className="w-3/4 flex flex-col p-4">
          <Toolbar editor={editor} onAddSlide={addSlide} onDeleteSlide={deleteSlide} />
          <div className="flex-grow bg-gray-300 p-4 rounded-lg">
            {slides.length > 0 && (
              <Slide
                slide={slides[selectedSlide]}
                editor={editor}
                onTitleChange={handleTitleChange}
              />
            )}
          </div>
          <button
            onClick={regenerateContent}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mt-4 self-end"
          >
            Regenerate Content
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default DeckEditor;
