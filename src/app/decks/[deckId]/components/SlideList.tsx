import React from "react";
import { Slide as SlideType } from "../types";
import SlideThumbnail from "./SlideThumbnail";

interface SlideListProps {
  slides: SlideType[];
  selectedSlide: number;
  onSlideSelect: (index: number) => void;
  moveSlide: (fromIndex: number, toIndex: number) => void;
}

const SlideList: React.FC<SlideListProps> = ({
  slides,
  selectedSlide,
  onSlideSelect,
  moveSlide,
}) => {
  return (
    <div className="flex flex-col w-full lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-gray-700 bg-gray-800">
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
          <h3 className="text-lg lg:text-xl font-bold text-white">Slides</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-300 bg-gray-700 px-3 py-1 rounded-full font-medium">
            {slides?.length || 0} slides
          </span>
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto border-b border-gray-700 bg-gray-800 custom-scrollbar"
        style={{
          height: "calc(100vh - 200px)",
          maxHeight: "calc(100vh - 200px)",
        }}
      >
        <div className="p-3 lg:p-4 space-y-3">
          {slides &&
            slides.map((slide, index) => (
              <div key={slide.id} className="relative">
                <SlideThumbnail
                  slide={slide}
                  index={index}
                  isSelected={index === selectedSlide}
                  onClick={() => onSlideSelect(index)}
                  moveSlide={moveSlide}
                />
              </div>
            ))}
          <div className="h-6"></div>
        </div>
      </div>
    </div>
  );
};

export default SlideList;
