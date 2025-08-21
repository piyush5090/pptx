import React from 'react';

// Predefined icon styles (max 8)
const iconStyles = [
  {
    bg: 'bg-cyan-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    bg: 'bg-blue-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
      </svg>
    )
  },
  {
    bg: 'bg-yellow-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    bg: 'bg-orange-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    bg: 'bg-purple-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z" />
      </svg>
    )
  },
  {
    bg: 'bg-pink-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
      </svg>
    )
  },
  {
    bg: 'bg-green-500',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

// ✅ Dynamic JSON-style content
// const slideData = {
//   title: "Welcome and Introduction to Brain Science",
//   footer: "By understanding the brain’s structure and function, leaders can leverage its natural tendencies to cultivate sustainable high performance and effective decision-making.",
//   features: [
//     {
//       title: "Welcome to the fascinating world of neuroscience and leadership",
//       description: "Explore the complex workings of the brain and its significance for effective leadership"
//     },
//     {
//       title: "Foundation building for understanding leadership through neuroscience",
//       description: "Establish a solid understanding of brain anatomy and function as a basis for leadership development"
//     },
//     {
//       title: "Overview of brain exploration and its importance for leaders",
//       description: "Understand how the brain’s intricate networks shape leadership behaviors and performance"
//     },
//     {
//       title: "Every leadership behavior starts in the brain’s complex networks",
//       description: "Explore the neural mechanisms that underlie the cognitive, emotional, and behavioral aspects of leadership"
//     }
//   ]
// };

// ✅ Component
function TitledFeatureGrid({slideData}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden">

        {/* Header */}
        <div className="flex-grow p-8 md:p-12 overflow-y-auto">
          <header className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {slideData.title}
            </h1>
          </header>

          {/* Feature Grid */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {slideData.features.map((feature, index) => {
              const style = iconStyles[index % iconStyles.length];
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${style.bg} bg-opacity-20`}>
                    {style.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </main>
        </div>

        {/* Footer */}
        <footer className="w-full bg-cyan-600 p-6 text-center mt-auto">
          <p className="text-white text-lg max-w-5xl mx-auto leading-relaxed">
            {slideData.footer}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default TitledFeatureGrid;
