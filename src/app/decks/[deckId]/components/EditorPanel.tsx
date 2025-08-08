
import React from "react";
import { Editor } from "@tiptap/react";
import Slide from "./Slide";
import Toolbar from "./Toolbar";
import { Slide as SlideType } from "../types";

interface EditorPanelProps {
  editor: Editor | null;
  slides: SlideType[];
  selectedSlide: number;
  onTitleChange: (newTitle: string) => void;
  onAddSlide: () => void;
  onDeleteSlide: () => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  editor,
  slides,
  selectedSlide,
  onTitleChange,
  onAddSlide,
  onDeleteSlide,
}) => {
  return (
    <div
      className="flex-1 flex flex-col bg-gray-900 overflow-hidden"
      style={{ minWidth: 0 }}
    >
      <div className="flex-shrink-0 p-3 lg:p-4 border-b border-gray-700 bg-gray-900">
        <div className="max-w-full overflow-x-auto no-scrollbar">
          <Toolbar
            editor={editor}
            onAddSlide={onAddSlide}
            onDeleteSlide={onDeleteSlide}
          />
        </div>
      </div>
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
                onTitleChange={onTitleChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPanel;
