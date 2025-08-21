import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectExportStatus,
  selectPresentationData,
  setExportStatus,
  setError,
} from '../store/slices/presentationSlice';
import { presentationAPI, downloadFile } from '../services/api';

const ExportControls = () => {
  const dispatch = useDispatch();
  const exportStatus = useSelector(selectExportStatus);
  const presentationData = useSelector(selectPresentationData);

  const handleExport = async (format) => {
    try {
      dispatch(setExportStatus('loading'));
      
      let blob;
      let filename;
      const timestamp = new Date().toISOString().split('T')[0];
      
      if (format === 'pptx') {
        console.log('🔄 Generating PowerPoint presentation...');
        blob = await presentationAPI.generatePPTX(presentationData);
        filename = `presentation_${timestamp}.pptx`;
      } else if (format === 'pdf') {
        console.log('🔄 Generating PDF presentation...');
        blob = await presentationAPI.generatePDF(presentationData);
        filename = `presentation_${timestamp}.pdf`;
      }
      
      downloadFile(blob, filename);
      dispatch(setExportStatus('success'));
      
      // Reset status after 3 seconds
      setTimeout(() => {
        dispatch(setExportStatus('idle'));
      }, 3000);
      
    } catch (error) {
      console.error('Export error:', error);
      dispatch(setError(`Export failed: ${error.message}`));
      dispatch(setExportStatus('error'));
      
      // Reset status after 5 seconds
      setTimeout(() => {
        dispatch(setExportStatus('idle'));
      }, 5000);
    }
  };

  const isExporting = exportStatus === 'loading';
  const hasData = presentationData.length > 0;

  if (!hasData) return null;

  return (
    <div className="flex space-x-2">
      {/* PowerPoint Export */}
      <button
        onClick={() => handleExport('pptx')}
        disabled={isExporting}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
          isExporting
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105 shadow-lg'
        }`}
        title="Export as PowerPoint presentation"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <span>📊</span>
            <span>PowerPoint</span>
          </>
        )}
      </button>

      {/* PDF Export */}
      <button
        onClick={() => handleExport('pdf')}
        disabled={isExporting}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
          isExporting
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-red-600 hover:bg-red-700 text-white transform hover:scale-105 shadow-lg'
        }`}
        title="Export as PDF document"
      >
        {isExporting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <span>📄</span>
            <span>PDF</span>
          </>
        )}
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={() => {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }}
        className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 text-sm transform hover:scale-105"
        title="Toggle fullscreen (F11)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
      </button>
    </div>
  );
};

export default ExportControls;