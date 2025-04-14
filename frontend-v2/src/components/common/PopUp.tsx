// Popup.js
import { useState } from 'react';

const PopUp = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 left-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 z-50 transition-all duration-300 ease-in-out">
          {/* Logo */}
          <div className="flex items-center mb-4">
            <img
              src="https://via.placeholder.com/40" // Replace with xAI logo URL
              alt="Logo"
              className="w-10 h-10 mr-2"
            />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              SuperGrok
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Fewer rate limits, higher usage quotas, and priority access to new
            features.
          </p>

          {/* Button */}
          <button
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => {
              // Replace with your subscription link
              window.location.href = 'https://x.ai/grok';
            }}
          >
            Go Super
          </button>

          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={togglePopup}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PopUp;