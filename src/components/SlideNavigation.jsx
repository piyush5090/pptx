import React from 'react';

const SlideNavigation = ({ 
  currentSlide, 
  totalSlides, 
  onSlideChange, 
  onNext, 
  onPrevious 
}) => {
  const canGoNext = currentSlide < totalSlides - 1;
  const canGoPrevious = currentSlide > 0;

  return (
    <div className="flex items-center space-x-4 bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`p-2 rounded-lg transition-all duration-200 ${
          canGoPrevious
            ? 'bg-gray-700 hover:bg-gray-600 text-white transform hover:scale-110'
            : 'bg-gray-600 text-gray-500 cursor-not-allowed'
        }`}
        title="Previous slide (←)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Slide Counter */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-300 text-sm font-medium">
          {currentSlide + 1}
        </span>
        <span className="text-gray-500">/</span>
        <span className="text-gray-400 text-sm">
          {totalSlides}
        </span>
      </div>

      {/* Slide Dots */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: Math.min(totalSlides, 10) }, (_, index) => {
          // For presentations with more than 10 slides, show dots around current slide
          let slideIndex;
          if (totalSlides <= 10) {
            slideIndex = index;
          } else {
            const start = Math.max(0, Math.min(currentSlide - 5, totalSlides - 10));
            slideIndex = start + index;
          }

          const isActive = slideIndex === currentSlide;
          return (
            <button
              key={slideIndex}
              onClick={() => onSlideChange(slideIndex)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500 transform scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              title={`Go to slide ${slideIndex + 1}`}
            />
          );
        })}
        {totalSlides > 10 && (
          <span className="text-gray-500 text-xs ml-1">
            ...
          </span>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`p-2 rounded-lg transition-all duration-200 ${
          canGoNext
            ? 'bg-gray-700 hover:bg-gray-600 text-white transform hover:scale-110'
            : 'bg-gray-600 text-gray-500 cursor-not-allowed'
        }`}
        title="Next slide (→)"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Jump to Slide Input (for large presentations) */}
      {totalSlides > 10 && (
        <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-600">
          <span className="text-gray-400 text-xs">Go to:</span>
          <input
            type="number"
            min="1"
            max={totalSlides}
            className="w-12 h-8 bg-gray-700 border border-gray-600 rounded text-white text-xs text-center focus:outline-none focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = parseInt(e.target.value, 10);
                if (value >= 1 && value <= totalSlides) {
                  onSlideChange(value - 1);
                  e.target.blur();
                }
              }
            }}
            placeholder={String(currentSlide + 1)}
          />
        </div>
      )}
    </div>
  );
};

export default SlideNavigation;