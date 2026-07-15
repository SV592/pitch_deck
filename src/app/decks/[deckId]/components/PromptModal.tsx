import React, { useState, useEffect, useRef } from "react";
import RichTextEditor from "./RichTextEditor";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateContent: (prompt: string) => Promise<void>;
  initialPrompt?: string;
  isLoading?: boolean;
  isGeneratingContent?: boolean;
  slideTitle?: string;
  originalContent?: string | null;
  generatedContent?: string | null;
  onAcceptGeneratedContent?: (content: string) => void;
  onDiscardGeneratedContent?: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onGenerateContent,
  initialPrompt = "",
  isLoading = false,
  isGeneratingContent = false,
  slideTitle = "Current Slide",
  originalContent,
  generatedContent,
  onAcceptGeneratedContent,
  onDiscardGeneratedContent,
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [showContentReview, setShowContentReview] = useState(false);
  const [editableGeneratedContent, setEditableGeneratedContent] = useState<
    string | null
  >(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Sync with initialPrompt changes
  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  // Show content review when generatedContent is available
  useEffect(() => {
    if (generatedContent) {
      setEditableGeneratedContent(generatedContent); // Copy generated content to editable state
      setShowContentReview(true);
    } else {
      setEditableGeneratedContent(null); // Clear editable state if no generated content
      setShowContentReview(false);
    }
  }, [generatedContent]);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    // Made async
    if (!prompt.trim()) return;
    await onGenerateContent(prompt.trim()); // Call new prop
    setPrompt(""); // Clear prompt after submission
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
          {/* Always render Prompt Input and Tips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-300">
                Describe your content
              </label>
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
                  <li>• Specify right tone for your audience</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Review Section - always rendered but conditionally visible */}
          {showContentReview && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                Review Generated Content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-semibold text-gray-300 mb-1">
                    Original
                  </h4>
                  <RichTextEditor
                    value={originalContent || ""}
                    onChange={() => {}}
                    readOnly={true}
                  />
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-300 mb-1">
                    Generated
                  </h4>
                  <RichTextEditor
                    value={editableGeneratedContent || ""}
                    onChange={setEditableGeneratedContent}
                    readOnly={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-700 bg-gray-800">
          {showContentReview ? (
            <>
              <button
                onClick={onDiscardGeneratedContent}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGeneratingContent}
              >
                Close
              </button>
              <button
                onClick={async () => {
                  if (editableGeneratedContent) {
                    try {
                      const blob = new Blob([editableGeneratedContent], { type: 'text/html' });
                      const data = [new ClipboardItem({ 'text/html': blob })];
                      await navigator.clipboard.write(data);
                      // You can add a toast notification here to inform the user
                    } catch (err) {
                      console.error('Failed to copy: ', err);
                      navigator.clipboard.writeText(editableGeneratedContent);
                    }
                  }
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Copy Content
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isGeneratingContent} // Use isGeneratingContent here
              >
                Cancel
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleGenerate}
                  disabled={isPromptEmpty || isGeneratingContent} // Use isGeneratingContent here
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isGeneratingContent ? ( // Use isGeneratingContent here
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
                  <span>
                    {isGeneratingContent ? "Generating..." : "Generate Content"}
                  </span>{" "}
                  {/* Update text */}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
