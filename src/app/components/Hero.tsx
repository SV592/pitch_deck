import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Pitch<span className="text-orange-500">Deck</span>
            </h1>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-100">
            AI-Powered Pitch Deck Generator
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Transform your startup idea into a compelling pitch deck in minutes.
            Our AI analyzes your business concept and generates professional
            slides with content and design suggestions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
