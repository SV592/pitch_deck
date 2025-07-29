"use client";
import React from "react";

const ProgressSteps = ({ steps, currentStep }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                  currentStep >= step.number
                    ? "bg-orange-500 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {/* {currentStep > step.number ? (
                //   <CheckCircle className="w-6 h-6" />
                ) : (
                  step.number
                )} */}
              </div>
              <div className="mt-2 text-center">
                <div className="font-medium text-white">{step.title}</div>
                <div className="text-sm text-gray-400">
                  {step.description}
                </div>
              </div>
            </div>
            {/* {index < steps.length - 1 && (
            //   <ChevronRight
                className={`w-6 h-6 mx-4 ${
                  currentStep > step.number
                    ? "text-orange-500"
                    : "text-gray-600"
                }`}
              />
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;