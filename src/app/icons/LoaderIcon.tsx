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
    </svg>
);

export default LoaderIcon;
