import React from 'react';

// 🔧 Predefined icons (max 8)
const iconStyles = [
  {
    bg: 'bg-teal-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    bg: 'bg-lime-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-lime-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.757 16.243l-1.414 1.414M17.657 6.343L16.243 7.757m-8.486 8.486l1.414 1.414M6.343 6.343l1.414 1.414" />
      </svg>
    )
  },
  {
    bg: 'bg-blue-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.24a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 003.86.517l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l.477-2.387a2 2 0 00.547-1.806z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    )
  },
  {
    bg: 'bg-orange-700',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  },
  // Add more if needed
];

// ✅ Dynamic content only
// const slideData = {
//   heading: "Wrapping Up Our Brain Journey",
//   points: [
//     {
//       title: "Integration of all brain systems",
//       description: "Coordinated functions of cerebrum, cerebellum, and brainstem create effective leadership"
//     },
//     {
//       title: "Every leadership skill reshapes brain networks",
//       description: "Neuroplasticity allows for lifelong development of new capabilities through practice and experience"
//     },
//     {
//       title: "Foundation set for exploring specific functions and optimization",
//       description: "Understanding the basic anatomy and mechanisms of the brain paves the way for deeper dive into leadership neuroscience"
//     },
//     {
//       title: "Working with brain’s natural tendencies for sustainable performance",
//       description: ""
//     }
//   ],
//   footer: "By integrating our understanding of the brain’s complex and adaptable nature, we can harness its power to develop and sustain exceptional leadership capabilities."
// };

// ✅ Component
function TitledListWithFooter({slideData}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden">
        
        {/* Content */}
        <div className="flex-grow p-12 lg:p-16">
          <header className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {slideData.heading}
            </h1>
          </header>

          {/* Top 3 Points */}
          <main className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
            {slideData.points.slice(0, 3).map((point, index) => {
              const icon = iconStyles[index % iconStyles.length];
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full ${icon.bg}`}>
                    {icon.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-md mb-1">{point.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </main>

          {/* Bottom Single Point */}
          {slideData.points[3] && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-start space-x-4 max-w-xs">
                <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full ${iconStyles[3 % iconStyles.length].bg}`}>
                  {iconStyles[3 % iconStyles.length].icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-md mb-1">{slideData.points[3].title}</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="w-full bg-orange-600 p-6 text-center mt-auto">
          <p className="text-white text-lg max-w-5xl mx-auto leading-relaxed">
            {slideData.footer}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default TitledListWithFooter;
