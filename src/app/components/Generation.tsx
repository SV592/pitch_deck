"use client";
import React from "react";

type Props = {
  isGenerating: boolean;
  generatePitchDeck: () => void;
};

const Generation = ({ isGenerating, generatePitchDeck }: Props) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-12">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            {/* {isGenerating ? (
              // <RefreshCw className="w-12 h-12 text-white animate-spin" />
            ) : (
              // <Brain className="w-12 h-12 text-white" />
            )} */}
          </div>

          <h3 className="text-2xl font-bold mb-4">
            {isGenerating
              ? "Generating Your Pitch Deck..."
              : "Ready to Generate"}
          </h3>

          <p className="text-gray-400 mb-8">
            {isGenerating
              ? "Our AI is analyzing your business information and creating a customized pitch deck outline with slide suggestions."
              : "Click the button below to start the AI generation process."}
          </p>

          {isGenerating && (
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                {/* <Wand2 className="w-4 h-4 text-orange-500" /> */}
                <span>Analyzing business model...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                {/* <FileText className="w-4 h-4 text-orange-500" /> */}
                <span>Creating slide structure...</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                {/* <Image className="w-4 h-4 text-orange-500" /> */}
                <span>Suggesting visual content...</span>
              </div>
            </div>
          )}
        </div>

        {!isGenerating && (
          <button
            onClick={generatePitchDeck}
            className="flex items-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-semibold mx-auto"
          >
            {/* <Brain className="w-6 h-6" /> */}
            <span>Generate Pitch Deck</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Generation;