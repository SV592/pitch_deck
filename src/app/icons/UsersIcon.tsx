import React from 'react';

interface UsersIconProps {
  className?: string;
}

const UsersIcon: React.FC<UsersIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {/* Placeholder for lni-users SVG path */}
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S13.66 5 12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm8 4c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4zm-8 0c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4zm-8 0c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" />
  </svg>
);

export default UsersIcon;
