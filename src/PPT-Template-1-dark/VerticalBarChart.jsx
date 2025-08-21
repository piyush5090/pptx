import React from 'react';

function VerticalBarChart({ slideData }) {
  // Fallback data in case slideData is not passed
  // const {
  //   heading = "Transformational vs Transactional Leadership",
  //   subheading = "Comparison of key leadership behaviors (0–100 scale)",
  //   pageNumber = 1,
  //   chartData = [
  //     { label: 'Idealized Influence', value: 85 },
  //     { label: 'Inspirational Motivation', value: 90 },
  //     { label: 'Intellectual Stimulation', value: 80 },
  //     { label: 'Individualized Consideration', value: 88 },
  //     { label: 'Contingent Reward', value: 65 },
  //   ]
  // } = slideData || {};

  // Fixed Tailwind color classes (rotate if needed)
  const barColors = [
    'bg-teal-500',
    'bg-lime-500',
    'bg-blue-600',
    'bg-orange-500',
    'bg-pink-600',
    'bg-purple-500',
    'bg-yellow-400',
    'bg-red-500',
  ];

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden relative">

        {/* Header */}
        <div className="flex-grow p-12 lg:p-16 flex flex-col">
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {heading}
            </h1>
            <p className="text-gray-400 text-lg mt-2">
              {subheading}
            </p>
          </header>

          {/* Bar Chart */}
          <div className="flex-grow flex items-end justify-around px-4 h-72">
            {chartData.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-1/6 h-full">
                <div className="flex flex-col justify-end h-full w-full">
                  <div
                    className={`w-full rounded-t-lg flex items-center justify-center ${barColors[index % barColors.length]}`}
                    style={{ height: `${item.value}%`, transition: 'height 0.5s ease-in-out' }}
                  >
                    <span className="text-white font-bold text-lg">{item.value}%</span>
                  </div>
                </div>
                <p className="text-white text-center mt-4 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-6 right-8 text-gray-400 font-medium">
          {pageNumber}
        </div>
      </div>
    </div>
  );
}

export default VerticalBarChart;
