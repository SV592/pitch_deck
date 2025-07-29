
'use client'

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Slide as SlideType } from '../types';

const ItemType = 'SLIDE';

interface SlideThumbnailProps {
  slide: SlideType;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  moveSlide: (fromIndex: number, toIndex: number) => void;
}

const SlideThumbnail: React.FC<SlideThumbnailProps> = ({ slide, index, isSelected, onClick, moveSlide }) => {
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

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className={`cursor-pointer border-2 rounded-lg p-2 ${isSelected ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300`}
    >
      <div className="bg-white h-24 w-40 flex flex-col justify-center items-center text-xs p-1 shadow-md">
        <h4 className="font-bold truncate">{slide.title}</h4>
        <p className="text-gray-600 truncate">{slide.content.replace(/<[^>]*>?/gm, '')}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">{index + 1}</span>
    </div>
  );
};

export default SlideThumbnail;
