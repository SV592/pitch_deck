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
    </svg>
);

export default ShieldIcon;
