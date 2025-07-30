import React from 'react';

interface LoaderIconProps {
  className?: string;
}

const LoaderIcon: React.FC<LoaderIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Placeholder for lni-spinner SVG path */}
    <path d="M12 2v4m0 14v-4m9-9h-4M3 12H7m14 0h-4M3 12h4m14 0h-4m-9 9v-4m0-14v4" />
  </svg>
);

export default LoaderIcon;
