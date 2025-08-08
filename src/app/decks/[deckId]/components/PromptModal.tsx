import React, { useState, useEffect, useRef } from "react";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prompt: string, action: "generate" | "enhance") => void;
  initialPrompt?: string;
  isLoading?: boolean;
  slideTitle?: string;
}

const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialPrompt = "",
  isLoading = false,
  slideTitle = "Current Slide",
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [showTemplates, setShowTemplates] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pitch deck slide generation templates
  const promptTemplates = [
    {
      category: "Opening & Vision",
      prompts: [
        "Create a compelling title slide with company name, tagline, and founder information",
        "Design a problem statement slide that clearly defines the pain point we're solving",
        "Present our solution overview with key features and unique value proposition",
        "Craft a vision statement slide showing our long-term impact and mission",
      ],
    },
    {
      category: "Market & Opportunity",
      prompts: [
        "Show market size analysis with TAM, SAM, and SOM breakdown",
        "Present target customer segments with personas and pain points",
        "Display market validation through research, surveys, and early feedback",
        "Demonstrate market timing and why now is the right moment",
      ],
    },
    {
      category: "Product & Traction",
      prompts: [
        "Showcase product demo with key features and user interface",
        "Present current traction metrics: users, revenue, growth rates",
        "Display customer testimonials and case studies with measurable results",
        "Show product roadmap with upcoming features and development timeline",
      ],
    },
    {
      category: "Business Model & Competition",
      prompts: [
        "Outline revenue model with pricing strategy and unit economics",
        "Present competitive landscape analysis with positioning matrix",
        "Show go-to-market strategy with customer acquisition channels",
        "Display business model canvas with key partnerships and resources",
      ],
    },
    {
      category: "Team & Financials",
      prompts: [
        "Introduce founding team with relevant experience and expertise",
        "Present financial projections with 3-5 year revenue forecasts",
        "Show funding requirements with use of funds breakdown",
        "Display key advisors, investors, and strategic partnerships",
      ],
    },
    {
      category: "Investment & Next Steps",
      prompts: [
        "Present investment opportunity with valuation and equity offering",
        "Show milestones and what success looks like in next 12-24 months",
        "Display exit strategy and potential acquisition/IPO scenarios",
        "Create compelling closing slide with clear call-to-action for investors",
      ],
    },
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowTemplates(false);
    }
  }, [isOpen]);

  // Sync with initialPrompt changes
  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    onSubmit(prompt.trim(), "generate");
    setPrompt("");
    onClose();
  };

  const handleEnhance = () => {
    if (!prompt.trim()) return;
    onSubmit(prompt.trim(), "enhance");
    // Keep prompt in input for further editing after enhancement
  };

  const handleTemplateSelect = (template: string) => {
    setPrompt(template);
    setShowTemplates(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const isPromptEmpty = !prompt.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                AI Content Generator
              </h2>
              <p className="text-sm text-gray-400">For: {slideTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Prompt Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">
                Describe your content
              </label>
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span>{showTemplates ? "Hide" : "Show"} Templates</span>
              </button>
            </div>
            <textarea
              ref={textareaRef}
              className="w-full p-4 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none min-h-[120px] max-h-[200px] overflow-y-auto"
              placeholder="Be specific about what you want to include in your slide. For example: 'Create a slide about quarterly sales performance showing a 25% increase, include charts and key metrics, highlight top performing regions...'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                Press{" "}
                <kbd className="px-1 py-0.5 bg-gray-600 rounded text-xs">
                  Ctrl/Cmd + Enter
                </kbd>{" "}
                to generate
              </p>
              <span className="text-xs text-gray-500">
                {prompt.length} characters
              </span>
            </div>
          </div>

          {/* Templates Section */}
          {showTemplates && (
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-600">
              <h3 className="text-sm font-medium text-gray-300 mb-3">
                Quick Templates
              </h3>
              <div className="space-y-3">
                {promptTemplates.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-xs font-medium text-gray-400 mb-2">
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {category.prompts.map((template, index) => (
                        <button
                          key={index}
                          onClick={() => handleTemplateSelect(template)}
                          className="text-left p-2 text-xs text-gray-300 bg-gray-700 hover:bg-gray-600 rounded transition-colors border border-transparent hover:border-gray-500"
                          disabled={isLoading}
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <svg
                className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-blue-300 mb-1">
                  Tips for better results:
                </h4>
                <ul className="text-xs text-blue-200 space-y-1">
                  <li>• Be specific about data, numbers, and key points</li>
                  <li>
                    • Mention your target audience and presentation context
                  </li>
                  <li>
                    • Include preferred visual elements (charts, images, bullet
                    points)
                  </li>
                  <li>
                    • Use "Enhance" to improve existing prompts with AI
                    suggestions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-700 bg-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            Cancel
          </button>

          <div className="flex space-x-3">
            <button
              onClick={handleEnhance}
              disabled={isPromptEmpty || isLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              )}
              <span>AI Enhance</span>
            </button>

            <button
              onClick={handleGenerate}
              disabled={isPromptEmpty || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              )}
              <span>Generate Content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
