import React from 'react';

// 🎨 Predefined color palette (cycled based on index)
const dotColors = [
  'bg-cyan-400',
  'bg-lime-400',
  'bg-orange-400',
  'bg-blue-400',
  'bg-pink-400',
  'bg-teal-400',
  'bg-yellow-400',
  'bg-purple-400',
];

const lineColor = 'bg-cyan-600'; // Line color (fixed for all)

// const slideData = {
//   title: 'Learning and Skill Acquisition',
//   page: 6,
//   points: [
//     {
//       title: 'Synaptic Strengthening',
//       description: 'Neural plasticity enhances connections through practice',
//       position: 'top',
//     },
//     {
//       title: 'Implicit vs Explicit Learning',
//       description: 'Unconscious pattern absorption vs conscious study',
//       position: 'bottom',
//     },
//     {
//       title: 'Skill Development Stages',
//       description: 'Progression from novice to expert automation',
//       position: 'top',
//     },
//     // Add more points if needed
//   ],
// };

function Timeline({slideData}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden relative">

        {/* Header */}
        <div className="flex-grow p-12 lg:p-16 flex flex-col">
          <header className="mb-24">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {slideData.title}
            </h1>
          </header>

          {/* Timeline */}
          <div className="flex-grow flex items-center relative">
            {/* Horizontal line */}
            <div className={`absolute w-full h-0.5 ${lineColor} top-1/2 transform -translate-y-1/2`}></div>

            {/* Timeline Points */}
            <div className="w-full flex justify-around">
              {slideData.points.map((point, index) => {
                const dotColor = dotColors[index % dotColors.length];
                return (
                  <div
                    key={index}
                    className={`flex ${point.position === 'bottom' ? 'flex-col' : 'flex-col-reverse'} items-center`}
                  >
                    {/* Dot */}
                    <div className={`w-4 h-4 rounded-full ${dotColor} border-2 border-gray-800`}></div>

                    {/* Connecting Line */}
                    <div className={`w-0.5 h-12 ${lineColor}`}></div>

                    {/* Text */}
                    <div className={`text-center ${point.position === 'bottom' ? 'mt-4' : 'mb-4'}`}>
                      <h3 className="font-semibold text-white text-lg">{point.title}</h3>
                      <p className="text-gray-300 text-sm max-w-xs">{point.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-6 right-8 text-gray-400 font-medium">
          {slideData.page}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
