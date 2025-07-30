import React from 'react';

interface LinkedinIconProps {
  className?: string;
}

const LinkedinIcon: React.FC<LinkedinIconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    {/* Placeholder for lni-linkedin-original SVG path */}
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.951v5.662H9.559V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.06-.923-2.06-2.058 0-1.135.916-2.058 2.06-2.058s2.06.923 2.06 2.058c0 1.135-.916 2.058-2.06 2.058zm1.785 13.019H3.55v-11.63h3.572v11.63zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.208 0 22.225 0z" />
  </svg>
);

export default LinkedinIcon;
