import React from 'react';

interface ArrowRightIconProps {
  className?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {/* Placeholder for lni-arrow-right SVG path */}
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
  </svg>
);

export default ArrowRightIcon;
