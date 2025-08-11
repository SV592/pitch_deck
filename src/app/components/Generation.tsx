"use client";
import React, { useState, useEffect } from "react";
import LoaderIcon from "../icons/LoaderIcon";
import BrainIcon from "../icons/BrainIcon";

type Props = {
  isGenerating: boolean;
  generatePitchDeck: () => void;
};

const Generation = ({ isGenerating, generatePitchDeck }: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: "Analyzing business model...", duration: 2000 },
    { text: "Creating slide structure...", duration: 3000 },
    { text: "Generating content ideas...", duration: 2500 },
    { text: "Optimizing visual layout...", duration: 2000 },
    { text: "Finalizing your pitch deck...", duration: 1500 },
  ];

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepTimeout: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) return;

      setCurrentStep(stepIndex);
      const stepDuration = steps[stepIndex].duration;
      const startProgress = (stepIndex / steps.length) * 100;
      const endProgress = ((stepIndex + 1) / steps.length) * 100;

      let currentProgress = startProgress;
      const progressIncrement =
        (endProgress - startProgress) / (stepDuration / 50);

      progressInterval = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= endProgress) {
          currentProgress = endProgress;
          clearInterval(progressInterval);
        }
        setProgress(currentProgress);
      }, 50);

      stepTimeout = setTimeout(() => {
        clearInterval(progressInterval);
        runStep(stepIndex + 1);
      }, stepDuration);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimeout);
      clearInterval(progressInterval);
    };
  }, [isGenerating]);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        {isGenerating && (
          <div className="h-1 bg-gray-700 relative">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 w-4 h-full bg-white/30 rounded-r animate-pulse"></div>
            </div>
          </div>
        )}

        <div className="p-12">
          <div className="mb-8">
            {/* Animated Icon Container */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div
                className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isGenerating
                    ? "scale-110 shadow-lg shadow-orange-500/25"
                    : "scale-100"
                }`}
              >
                {isGenerating ? (
                  <LoaderIcon className="w-12 h-12 text-white animate-spin" />
                ) : (
                  <BrainIcon className="w-12 h-12 text-white" />
                )}
              </div>

              {/* Pulsing rings for loading state */}
              {isGenerating && (
                <>
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 bg-orange-500/10 rounded-full animate-pulse scale-125"></div>
                </>
              )}
            </div>

            {/* Dynamic Title */}
            <h3 className="text-2xl font-bold mb-4 transition-all duration-300">
              {isGenerating
                ? "Generating Your Pitch Deck..."
                : "Ready to Generate"}
            </h3>

            {/* Dynamic Description */}
            <p className="text-gray-400 mb-8 transition-all duration-300 min-h-[3rem] flex items-center justify-center">
              {isGenerating
                ? "Our AI is crafting a customized pitch deck tailored to your business needs."
                : "Transform your business idea into a compelling presentation with AI-powered insights and professional design suggestions."}
            </p>

            {/* Enhanced Step Indicators */}
            {isGenerating && (
              <div className="space-y-4 mb-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center space-x-3 text-sm transition-all duration-500 ${
                      index === currentStep
                        ? "text-orange-400 scale-105"
                        : index < currentStep
                          ? "text-green-400"
                          : "text-gray-500"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "bg-orange-400 animate-pulse"
                          : index < currentStep
                            ? "bg-green-400"
                            : "bg-gray-600"
                      }`}
                    ></div>
                    <span className="font-medium">{step.text}</span>
                    {index < currentStep && (
                      <svg
                        className="w-4 h-4 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Progress Percentage */}
            {isGenerating && (
              <div className="text-center mb-6">
                <span className="text-2xl font-bold text-orange-400">
                  {Math.round(progress)}%
                </span>
                <p className="text-xs text-gray-500 mt-1">Complete</p>
              </div>
            )}
          </div>

          {/* Enhanced Generate Button */}
          {!isGenerating && (
            <button
              onClick={generatePitchDeck}
              className="group relative overflow-hidden flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-300 font-semibold mx-auto shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <BrainIcon className="w-5 h-5 text-white transition-transform group-hover:rotate-12" />
              <span className="relative z-10">Generate Pitch Deck</span>
              <svg
                className="w-4 h-4 text-white transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          )}

          {/* Loading State Message */}
          {isGenerating && (
            <div className="mt-8 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                This usually takes 30-60 seconds. Please don't refresh the page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generation;
