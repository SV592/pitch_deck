import React from 'react';

interface ShieldIconProps {
  className?: string;
}

const ShieldIcon: React.FC<ShieldIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {/* Placeholder for lni-shield SVG path */}
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.7-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
);

export default ShieldIcon;
