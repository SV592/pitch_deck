"use client";
import React from "react";

const GeneratedOutline = ({ generatedOutline }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">
              {generatedOutline.title}
            </h3>
            <p className="text-gray-400">
              Your AI-generated pitch deck outline is ready! Review and
              customize before creating your deck.
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              {/* <RefreshCw className="w-4 h-4" /> */}
              <span>Regenerate</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-semibold">
              {/* <Rocket className="w-4 h-4" /> */}
              <span>Create Deck</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {generatedOutline.slides.map((slide: any, index: number) => (
            <div
              key={slide.id}
              className="bg-gray-700 rounded-lg border border-gray-600 overflow-hidden hover:border-orange-500 transition-all duration-300 group"
            >
              {/* Slide Preview */}
              <div className="h-32 bg-gradient-to-br from-gray-600 to-gray-800 relative flex items-center justify-center">
                <div className="text-center p-4">
                  <h4 className="font-semibold text-white text-sm mb-1">
                    {slide.title}
                  </h4>
                  {slide.content.subtitle && (
                    <p className="text-xs text-gray-300">
                      {slide.content.subtitle}
                    </p>
                  )}
                </div>
                <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-2">
                    <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                      {/* <Eye className="w-4 h-4 text-white" /> */}
                    </button>
                    <button className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                      {/* <FileText className="w-4 h-4 text-white" /> */}
                    </button>
                  </div>
                </div>
              </div>

              {/* Slide Content */}
              <div className="p-4">
                <h4 className="font-semibold text-white mb-2">
                  {slide.title}
                </h4>

                {slide.content.bullets && (
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    {slide.content.bullets
                      .slice(0, 3)
                      .map((bullet: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="line-clamp-1">{bullet}</span>
                        </li>
                      ))}
                  </ul>
                )}

                {slide.content.description && (
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {slide.content.description}
                  </p>
                )}

                <div className="flex items-center space-x-2 text-xs text-gray-400 border-t border-gray-600 pt-3">
                  {/* <Image className="w-3 h-3" /> */}
                  <span className="line-clamp-1">
                    {slide.content.suggestedImage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-white mb-2">
              What's Next?
            </h4>
            <p className="text-gray-300 text-sm mb-4">
              Your pitch deck outline is ready! Click "Create Deck" to
              generate the full presentation with AI-suggested content and
              images.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                {/* <CheckCircle className="w-4 h-4 text-green-500" /> */}
                <span>AI-generated content</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <CheckCircle className="w-4 h-4 text-green-500" /> */}
                <span>Professional templates</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* <CheckCircle className="w-4 h-4 text-green-500" /> */}
                <span>Suggested images</span>
              </div>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors font-semibold mx-auto text-lg">
            {/* <Rocket className="w-6 h-6" /> */}
            <span>Create Full Deck</span>
            {/* <ArrowRight className="w-5 h-5" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedOutline;