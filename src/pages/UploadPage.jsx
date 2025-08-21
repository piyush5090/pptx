import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  setPresentationData, 
  setError, 
  clearError, 
  setPresentationTitle,
  selectError,
  selectIsLoading 
} from '../store/slices/presentationSlice';
import JsonInput from '../components/JsonInput';
import FileUpload from '../components/FileUpload';
import { reactPresentationKeywords } from '../templateList';

const UploadPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);
  const [inputMethod, setInputMethod] = useState('json'); // 'json' | 'file'

  const validateSlideData = (data) => {
    const errors = [];
    
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array of slides');
    }
    
    if (data.length === 0) {
      throw new Error('Data must contain at least one slide');
    }

    data.forEach((slide, index) => {
      const slideNumber = index + 1;
      
      // Check for required structure
      if (!slide.visuals?.metadata?.representationTechnique) {
        errors.push(`Slide ${slideNumber}: Missing representation technique`);
      } else {
        const technique = slide.visuals.metadata.representationTechnique;
        if (!reactPresentationKeywords.includes(technique)) {
          errors.push(`Slide ${slideNumber}: Unknown representation technique "${technique}". Available: ${reactPresentationKeywords.join(', ')}`);
        }
      }
      
      // Check for basic content requirements based on technique
      const technique = slide.visuals?.metadata?.representationTechnique;
      if (technique === 'FourCardGrid' && !slide.cards) {
        errors.push(`Slide ${slideNumber}: FourCardGrid requires "cards" array`);
      }
      if (technique === 'Timeline' && !slide.timelineItems) {
        errors.push(`Slide ${slideNumber}: Timeline requires "timelineItems" array`);
      }
      // Add more specific validations as needed
    });

    if (errors.length > 0) {
      throw new Error(`Validation errors:\n${errors.join('\n')}`);
    }

    return true;
  };

  const handleDataSubmit = (data, filename = null) => {
    dispatch(clearError());
    
    try {
      validateSlideData(data);
      
      dispatch(setPresentationData(data));
      
      // Set presentation title from filename or first slide title
      if (filename) {
        const title = filename.replace(/\.[^/.]+$/, ""); // Remove file extension
        dispatch(setPresentationTitle(title));
      } else if (data[0]?.title) {
        dispatch(setPresentationTitle(data[0].title));
      }
      
      navigate('/presentation');
    } catch (error) {
      console.error('Validation error:', error);
      dispatch(setError(error.message));
    }
  };

  const handleMethodChange = (method) => {
    setInputMethod(method);
    dispatch(clearError()); // Clear errors when switching methods
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            📊 Presentation Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Transform your JSON data into professional presentations
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Supports {reactPresentationKeywords.length} different slide templates
          </p>
        </header>

        {/* Input Method Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handleMethodChange('json')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              inputMethod === 'json'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📝 Paste JSON
          </button>
          <button
            onClick={() => handleMethodChange('file')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              inputMethod === 'file'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            📁 Upload File
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 rounded-lg">
            <div className="flex items-start space-x-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <div className="flex-1">
                <h3 className="text-red-300 font-medium mb-2">Validation Error</h3>
                <pre className="text-red-200 text-sm whitespace-pre-wrap font-mono">
                  {error}
                </pre>
              </div>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-300 hover:text-red-100 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Input Component */}
        <div className="mb-6">
          {inputMethod === 'json' ? (
            <JsonInput onSubmit={handleDataSubmit} isLoading={isLoading} />
          ) : (
            <FileUpload onSubmit={handleDataSubmit} isLoading={isLoading} />
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-gray-700 bg-opacity-50 rounded-lg">
          <h3 className="text-white font-medium mb-2">💡 Need Help?</h3>
          <p className="text-gray-300 text-sm mb-2">
            Your JSON data should be an array of slide objects. Each slide needs:
          </p>
          <ul className="text-gray-400 text-xs space-y-1 ml-4">
            <li>• <code className="text-blue-300">visuals.metadata.representationTechnique</code> - One of: {reactPresentationKeywords.slice(0, 3).join(', ')}, etc.</li>
            <li>• Content properties specific to the chosen template (title, cards, etc.)</li>
            <li>• Optional: <code className="text-blue-300">pageNumber</code> for slide numbering</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;