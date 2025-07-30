import React from 'react';

interface ZapIconProps {
  className?: string;
}

const ZapIcon: React.FC<ZapIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {/* Placeholder for lni-bolt SVG path */}
    <path d="M11 15H6l7-14v8h5l-7 14z" />
  </svg>
);

export default ZapIcon;
