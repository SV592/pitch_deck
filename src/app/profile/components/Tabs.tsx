import React from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="bg-[#1E2939] rounded-xl mb-6">
      <div className="flex border-b border-gray-700 h-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === tab.id
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
