import React, { useState } from 'react';

const JsonInput = ({ onSubmit, isLoading }) => {
  const [jsonText, setJsonText] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setJsonText(text);
    
    // Basic JSON validation
    if (text.trim()) {
      try {
        JSON.parse(text);
        setIsValidJson(true);
      } catch (error) {
        setIsValidJson(false);
      }
    } else {
      setIsValidJson(true); // Empty is valid (not required yet)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!jsonText.trim()) {
      return;
    }
    
    try {
      const data = JSON.parse(jsonText);
      onSubmit(data);
    } catch (error) {
      console.error('JSON parsing error:', error);
    }
  };

  const handleLoadSample = () => {
    const sampleData = [
      {
        "visuals": {
          "metadata": {
            "representationTechnique": "FourCardGrid"
          }
        },
        "title": "Modern Leadership Paradigms",
        "pageNumber": 1,
        "cards": [
          {
            "id": 1,
            "title": "Servant Leadership",
            "text": "Focuses on the growth and well-being of people and the communities to which they belong."
          },
          {
            "id": 2,
            "title": "Adaptive Leadership",
            "text": "Encourages flexibility and innovation to deal with changing environments."
          },
          {
            "id": 3,
            "title": "Transformational Leadership",
            "text": "Inspires positive change by motivating followers to exceed expectations."
          },
          {
            "id": 4,
            "title": "Authentic Leadership",
            "text": "Grounded in self-awareness, transparency, and ethical behavior."
          }
        ]
      },
      {
        "visuals": {
          "metadata": {
            "representationTechnique": "Timeline"
          }
        },
        "title": "Project Development Timeline",
        "pageNumber": 2,
        "timelineItems": [
          {
            "id": 1,
            "date": "Jan 2024",
            "title": "Planning Phase",
            "description": "Initial project planning and requirement gathering"
          },
          {
            "id": 2,
            "date": "Mar 2024",
            "title": "Development",
            "description": "Core development and feature implementation"
          },
          {
            "id": 3,
            "date": "May 2024",
            "title": "Testing",
            "description": "Quality assurance and user testing"
          },
          {
            "id": 4,
            "date": "Jul 2024",
            "title": "Launch",
            "description": "Product launch and deployment"
          }
        ]
      }
    ];
    
    setJsonText(JSON.stringify(sampleData, null, 2));
    setIsValidJson(true);
  };

  const canSubmit = jsonText.trim() && isValidJson && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor="json-input" className="block text-sm font-medium text-gray-300">
          JSON Presentation Data
        </label>
        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs bg-gray-600 hover:bg-gray-500 text-gray-200 px-3 py-1 rounded transition-colors"
        >
          Load Sample Data
        </button>
      </div>
      
      <div className="relative">
        <textarea
          id="json-input"
          value={jsonText}
          onChange={handleTextChange}
          placeholder='Paste your JSON data here, e.g.:
[
  {
    "visuals": {
      "metadata": {
        "representationTechnique": "FourCardGrid"
      }
    },
    "title": "Your Slide Title",
    "cards": [...]
  }
]'
          className={`w-full h-64 p-4 bg-gray-700 border rounded-lg text-gray-100 font-mono text-sm resize-y focus:outline-none focus:ring-2 transition-colors ${
            isValidJson 
              ? 'border-gray-600 focus:ring-blue-500' 
              : 'border-red-500 focus:ring-red-500'
          }`}
          disabled={isLoading}
        />
        
        {/* JSON Validation Indicator */}
        <div className="absolute top-2 right-2">
          {jsonText.trim() && (
            <span className={`text-xs px-2 py-1 rounded ${
              isValidJson 
                ? 'bg-green-600 text-green-100' 
                : 'bg-red-600 text-red-100'
            }`}>
              {isValidJson ? '✓ Valid JSON' : '✗ Invalid JSON'}
            </span>
          )}
        </div>
      </div>
      
      {!isValidJson && jsonText.trim() && (
        <p className="text-red-400 text-sm">
          Please check your JSON syntax. Make sure all brackets, braces, and quotes are properly closed.
        </p>
      )}
      
      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
          canSubmit
            ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02] shadow-lg'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>🚀</span>
            <span>Generate Presentation</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default JsonInput;