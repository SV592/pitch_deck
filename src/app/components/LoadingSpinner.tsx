'use client';

import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
};

export default LoadingSpinner;
