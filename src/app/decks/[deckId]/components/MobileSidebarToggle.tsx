
import React from "react";

interface MobileSidebarToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  slideCount: number;
}

const MobileSidebarToggle: React.FC<MobileSidebarToggleProps> = ({
  isOpen,
  onToggle,
  slideCount,
}) => {
  return (
    <div className="lg:hidden flex-shrink-0 p-3 sm:p-4 border-b border-gray-700 bg-gray-900">
      <button
        onClick={onToggle}
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
          {isOpen ? "Hide" : "Show"} Slides
        </span>
        <span className="text-xs bg-orange-600 px-2 py-1 rounded-full font-semibold">
          {slideCount}
        </span>
      </button>
    </div>
  );
};

export default MobileSidebarToggle;
