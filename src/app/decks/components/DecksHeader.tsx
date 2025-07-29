import React from "react";

const DecksHeader = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Decks</h1>
      </div>
      <div>
        <p className="text-gray-400 mt-1">
          Create, manage, and collaborate on your presentation decks
        </p>
      </div>
    </div>
  );
};

export default DecksHeader;
