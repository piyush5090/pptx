import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  selectPresentationData,
  selectCurrentSlide,
  selectCurrentSlideIndex,
  selectTotalSlides,
  selectPresentationTitle,
  setCurrentSlide,
  nextSlide,
  previousSlide,
} from '../store/slices/presentationSlice';
import SlideRenderer from '../components/SlideRenderer';
import SlideNavigation from '../components/SlideNavigation';
import ExportControls from '../components/ExportControls';
import PresentationMeta from '../components/PresentationMeta';

const PresentationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slideIndex } = useParams();
  
  const presentationData = useSelector(selectPresentationData);
  const currentSlide = useSelector(selectCurrentSlide);
  const currentSlideIndex = useSelector(selectCurrentSlideIndex);
  const totalSlides = useSelector(selectTotalSlides);
  const presentationTitle = useSelector(selectPresentationTitle);

  // Redirect to upload if no presentation data
  useEffect(() => {
    if (presentationData.length === 0) {
      navigate('/');
    }
  }, [presentationData, navigate]);

  // Handle URL-based slide navigation
  useEffect(() => {
    if (slideIndex) {
      const index = parseInt(slideIndex, 10) - 1; // Convert to 0-based index
      if (index >= 0 && index < totalSlides && index !== currentSlideIndex) {
        dispatch(setCurrentSlide(index));
      }
    }
  }, [slideIndex, totalSlides, currentSlideIndex, dispatch]);

  // Update URL when slide changes
  useEffect(() => {
    const newSlideNumber = currentSlideIndex + 1;
    const currentPath = `/presentation/${newSlideNumber}`;
    if (window.location.pathname !== currentPath) {
      window.history.replaceState(null, '', currentPath);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return; // Don't handle if user is typing
      }

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'n':
        case 'N':
          e.preventDefault();
          dispatch(nextSlide());
          break;
        case 'ArrowLeft':
        case 'p':
        case 'P':
          e.preventDefault();
          dispatch(previousSlide());
          break;
        case 'Home':
          e.preventDefault();
          dispatch(setCurrentSlide(0));
          break;
        case 'End':
          e.preventDefault();
          dispatch(setCurrentSlide(totalSlides - 1));
          break;
        case 'Escape':
          navigate('/');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, navigate, totalSlides]);

  // Don't render if no data
  if (presentationData.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Presentation Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
        <div className="flex justify-between items-start">
          {/* Presentation Info */}
          <PresentationMeta 
            title={presentationTitle}
            currentSlide={currentSlideIndex + 1}
            totalSlides={totalSlides}
          />
          
          {/* Export Controls */}
          <div className="pointer-events-auto">
            <ExportControls />
          </div>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="relative">
        {currentSlide && <SlideRenderer slideData={currentSlide} />}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <SlideNavigation 
          currentSlide={currentSlideIndex}
          totalSlides={totalSlides}
          onSlideChange={(index) => dispatch(setCurrentSlide(index))}
          onNext={() => dispatch(nextSlide())}
          onPrevious={() => dispatch(previousSlide())}
        />
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-gray-800 bg-opacity-75 text-gray-300 px-3 py-2 rounded-lg text-xs">
          <div className="flex items-center space-x-4">
            <span>←→ Navigate</span>
            <span>ESC Exit</span>
            <span>Home/End</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationPage;