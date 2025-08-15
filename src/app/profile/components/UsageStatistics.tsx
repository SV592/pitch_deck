'use client';

import React from 'react';

interface UsageStatisticsProps {
  usageData: {
    decksCreated: number;
    dataProcessed: string;
    totalSlides: number;
  };
}

const UsageStatistics: React.FC<UsageStatisticsProps> = ({ usageData }) => {
  const noData = Object.values(usageData).every(val => val === 0 || val === '0 GB');

  if (noData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold">No Usage Data</h3>
        <p className="text-gray-400 mt-2">Start using the app to see your stats here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-orange-500">{usageData.decksCreated}</div>
        <div className="text-sm text-gray-400 mt-2">Decks Created</div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-orange-500">{usageData.totalSlides}</div>
        <div className="text-sm text-gray-400 mt-2">Total Slides</div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg text-center">
        <div className="text-3xl font-bold text-orange-500">{usageData.dataProcessed}</div>
        <div className="text-sm text-gray-400 mt-2">Data Processed</div>
      </div>
    </div>
  );
};

export default UsageStatistics;