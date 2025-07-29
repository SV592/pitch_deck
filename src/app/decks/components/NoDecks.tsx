import React from "react";

const NoDecks = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        No decks found
      </h3>
      <p className="text-gray-500 mb-4">
        Try adjusting your search or filter criteria
      </p>
      <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors mx-auto">
        <span>Create Your First Deck</span>
      </button>
    </div>
  );
};

export default NoDecks;
