import React, { useState, useRef } from 'react';

const FileUpload = ({ onSubmit, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    if (!file.name.toLowerCase().endsWith('.json')) {
      alert('Please select a JSON file (.json)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  const processFile = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        onSubmit(data, selectedFile.name);
      } catch (error) {
        alert('Invalid JSON file. Please check the file format.');
        console.error('File parsing error:', error);
      }
    };
    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };
    reader.readAsText(selectedFile);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* File Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-blue-500 bg-blue-500 bg-opacity-10'
            : selectedFile
            ? 'border-green-500 bg-green-500 bg-opacity-10'
            : 'border-gray-600 hover:border-gray-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
        
        <div className="space-y-4">
          {selectedFile ? (
            <>
              <div className="text-4xl">📄</div>
              <div>
                <h3 className="text-lg font-medium text-green-300 mb-1">
                  File Selected
                </h3>
                <p className="text-gray-300 font-mono text-sm">
                  {selectedFile.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                disabled={isLoading}
              >
                Choose different file
              </button>
            </>
          ) : (
            <>
              <div className="text-4xl">
                {dragActive ? '📂' : '📁'}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  {dragActive ? 'Drop your JSON file here' : 'Upload JSON File'}
                </h3>
                <p className="text-gray-400 text-sm">
                  Drag and drop your .json file here, or click to browse
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* File Info and Submit */}
      {selectedFile && (
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-white font-medium">Ready to Process</h4>
              <p className="text-gray-400 text-sm">
                Click below to generate your presentation
              </p>
            </div>
            <div className="text-green-400 text-2xl">✓</div>
          </div>
          
          <button
            onClick={processFile}
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02] shadow-lg'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Processing File...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>🚀</span>
                <span>Generate Presentation</span>
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;