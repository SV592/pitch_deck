"use client";

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Slide as SlideType } from "../types";

const ItemType = "SLIDE";

interface SlideThumbnailProps {
  slide: SlideType;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  moveSlide: (fromIndex: number, toIndex: number) => void;
  theme: any;
}

const SlideThumbnail: React.FC<SlideThumbnailProps> = ({
  slide,
  index,
  isSelected,
  onClick,
  moveSlide,
  theme,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveSlide(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const slideStyle = {
    backgroundColor: theme?.colorPalette?.secondary || '#1F2937',
    borderColor: isSelected ? theme?.colorPalette?.primary || '#F97316' : theme?.colorPalette?.secondary || '#3A4553',
    color: theme?.colorPalette?.accent || '#FFFFFF',
    fontFamily: theme?.typography?.fontFamily || 'sans-serif',
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ ...slideStyle, opacity: isDragging ? 0.5 : 1 }}
      className={`
        cursor-pointer border-2 rounded-lg lg:rounded-xl 
        p-2 sm:p-3 transition-all duration-200 hover:shadow-lg
      `}
    >
      <div
        className="h-16 sm:h-20 lg:h-24 w-full flex flex-col justify-center items-center text-xs p-2 sm:p-3 rounded-md lg:rounded-lg border"
        style={slideStyle}
      >
        <h4 className="font-semibold truncate text-center mb-1 text-xs sm:text-sm">
          {slide.title}
        </h4>
        <p className="text-gray-400 truncate text-center text-xs leading-tight hidden sm:block">
          {slide.content.replace(/<[^>]*>?/gm, "").substring(0, 30)}...
        </p>
      </div>
      <div className="flex justify-center mt-1 sm:mt-2">
        <span
          className="text-xs text-gray-400 px-2 py-1 rounded-full"
          style={{ backgroundColor: theme?.colorPalette?.accent || '#1F2937' }}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default SlideThumbnail;