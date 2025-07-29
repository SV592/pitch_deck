import React from "react";

const NoResults = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-400 mb-2">
        No templates found
      </h3>
      <p className="text-gray-500">
        Try adjusting your search or filter criteria
      </p>
    </div>
  );
};

export default NoResults;
