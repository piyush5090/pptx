import React from 'react';
import { useNavigate } from 'react-router-dom';

const PresentationMeta = ({ title, currentSlide, totalSlides }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg pointer-events-auto">
      <div className="flex items-center space-x-4">
        {/* Back to Upload Button */}
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded"
          title="Back to upload"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Presentation Title */}
        <div className="flex flex-col">
          <h1 className="text-white font-medium text-sm truncate max-w-xs">
            {title}
          </h1>
          <p className="text-gray-400 text-xs">
            Slide {currentSlide} of {totalSlides}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PresentationMeta;