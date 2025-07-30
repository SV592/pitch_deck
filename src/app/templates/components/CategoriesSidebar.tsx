import React from "react";

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoriesSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="lg:w-64 flex-shrink-0">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                selectedCategory === category.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm">{category.name}</span>
              </div>
              <span className="text-xs opacity-75">{category.count}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSidebar;
