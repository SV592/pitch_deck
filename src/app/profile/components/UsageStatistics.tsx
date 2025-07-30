import React from "react";

interface UsageStatisticsProps {
  usageData: any;
}

const UsageStatistics: React.FC<UsageStatisticsProps> = ({ usageData }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Usage Statistics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">{usageData.chatMessages}</div>
          <div className="text-sm text-gray-400">Chat Messages</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">{usageData.templatesUsed}</div>
          <div className="text-sm text-gray-400">Templates Used</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">{usageData.decksCreated}</div>
          <div className="text-sm text-gray-400">Projects Created</div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold">{usageData.dataProcessed}</div>
          <div className="text-sm text-gray-400">Data Processed</div>
        </div>
      </div>
    </div>
  );
};

export default UsageStatistics;
