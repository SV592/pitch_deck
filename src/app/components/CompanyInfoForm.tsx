"use client";
import React from "react";

type Props = {
  formData: {
    companyName: string;
    industry: string;
    stage: string;
    fundingGoal: string;
    problemStatement: string;
    solution: string;
    businessModel: string;
    targetMarket: string;
  };
  handleInputChange: (name: string, value: string) => void;
  industries: string[];
  stages: { value: string; label: string }[];
  setCurrentStep: (step: number) => void;
};

const CompanyInfoForm = ({
  formData,
  handleInputChange,
  industries,
  stages,
  setCurrentStep,
}: Props) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            Tell Us About Your Company
          </h3>
          <p className="text-gray-400">
            Provide some basic information to help our AI create your
            perfect pitch deck
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) =>
                handleInputChange("companyName", e.target.value)
              }
              placeholder="Enter your company name"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Industry *
            </label>
            <select
              value={formData.industry}
              onChange={(e) =>
                handleInputChange("industry", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select your industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Stage
            </label>
            <select
              value={formData.stage}
              onChange={(e) => handleInputChange("stage", e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Funding Goal
            </label>
            <input
              type="text"
              value={formData.fundingGoal}
              onChange={(e) =>
                handleInputChange("fundingGoal", e.target.value)
              }
              placeholder="e.g., $500K, $1M, $5M"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Problem Statement *
            </label>
            <textarea
              value={formData.problemStatement}
              onChange={(e) =>
                handleInputChange("problemStatement", e.target.value)
              }
              placeholder="Describe the problem your company solves. What pain points do your customers face?"
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Solution *
            </label>
            <textarea
              value={formData.solution}
              onChange={(e) =>
                handleInputChange("solution", e.target.value)
              }
              placeholder="Explain your solution. How does your product or service solve the problem?"
              rows={3}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Business Model
            </label>
            <input
              type="text"
              value={formData.businessModel}
              onChange={(e) =>
                handleInputChange("businessModel", e.target.value)
              }
              placeholder="e.g., SaaS, Marketplace, Subscription"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Market
            </label>
            <input
              type="text"
              value={formData.targetMarket}
              onChange={(e) =>
                handleInputChange("targetMarket", e.target.value)
              }
              placeholder="e.g., Small businesses, Enterprise, Consumers"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep(2)}
            disabled={
              !formData.companyName ||
              !formData.industry ||
              !formData.problemStatement ||
              !formData.solution
            }
            className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors font-semibold"
          >
            <span>Generate Pitch Deck</span>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoForm;