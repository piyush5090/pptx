import React from 'react';
import FourCardGrid from '../PPT-Template-1-dark/FourCardGrid';
import TitledFeatureGrid from '../PPT-Template-1-dark/TitledFeatureGrid';
import TitleTextAndImage from '../PPT-Template-1-dark/TitleTextAndImage';
import TitledListWithFooter from '../PPT-Template-1-dark/TitledListWithFooter';
import TitledIconGrid from '../PPT-Template-1-dark/TitledIconGrid';
import HorizontalBarList from '../PPT-Template-1-dark/HorizontalBarList';
import ImageTextLayout from '../PPT-Template-1-dark/ImageTextLayout';
import Timeline from '../PPT-Template-1-dark/Timeline';
import VerticalBarChart from '../PPT-Template-1-dark/VerticalBarChart';

// Component mapping for dynamic rendering
const componentMap = {
  'FourCardGrid': FourCardGrid,
  'TitledFeatureGrid': TitledFeatureGrid,
  'TitleTextAndImage': TitleTextAndImage,
  'TitledListWithFooter': TitledListWithFooter,
  'TitledIconGrid': TitledIconGrid,
  'HorizontalBarList': HorizontalBarList,
  'ImageTextLayout': ImageTextLayout,
  'Timeline': Timeline,
  'VerticalBarChart': VerticalBarChart,
};

const SlideRenderer = ({ slideData, className = '' }) => {
  // Validate slide data
  if (!slideData) {
    return <ErrorSlide message="No slide data provided" />;
  }

  if (!slideData.visuals?.metadata?.representationTechnique) {
    return <ErrorSlide message="Invalid slide data: missing representation technique" />;
  }

  const technique = slideData.visuals.metadata.representationTechnique;
  const Component = componentMap[technique];

  if (!Component) {
    return <ErrorSlide message={`Unknown slide template: "${technique}"`} availableTemplates={Object.keys(componentMap)} />;
  }

  try {
    return (
      <div className={className}>
        <Component slideData={slideData} />
      </div>
    );
  } catch (error) {
    console.error('Error rendering slide component:', error);
    return <ErrorSlide message={`Error rendering slide: ${error.message}`} />;
  }
};

const ErrorSlide = ({ message, availableTemplates = [] }) => (
  <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
    <div className="bg-red-600 bg-opacity-20 border border-red-500 text-white p-8 rounded-lg max-w-2xl">
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-4 text-red-300">Slide Rendering Error</h2>
        <p className="text-red-200 mb-6">{message}</p>
        
        {availableTemplates.length > 0 && (
          <div className="text-left bg-red-700 bg-opacity-30 p-4 rounded-lg">
            <h3 className="font-medium text-red-300 mb-2">Available Templates:</h3>
            <ul className="text-sm text-red-200 space-y-1">
              {availableTemplates.map((template) => (
                <li key={template} className="font-mono">
                  • {template}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          onClick={() => window.history.back()}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

// Export both components for flexibility
export { ErrorSlide };
export default SlideRenderer;