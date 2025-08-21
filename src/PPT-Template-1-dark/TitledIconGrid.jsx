import React from 'react';

// 🔧 Predefined colors (max 8)
const lobeColors = [
  'bg-cyan-500',
  'bg-lime-500',
  'bg-blue-500',
  'bg-orange-500',
];

// 🔧 Predefined icons (max 8) — matched by index
const lobeIcons = [
  (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.88 7.88l.001.001M16.12 7.88l.001.001M12 2a9 9 0 100 18 9 9 0 000-18z" />
    </svg>
  ),
  (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
    </svg>
  ),
  (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a.75.75 0 00.75-.75V11.25a.75.75 0 00-1.5 0v6a.75.75 0 00.75.75zM12 6a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0V6.75A.75.75 0 0112 6z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
    </svg>
  ),
  (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v.01M7.757 7.757a.75.75 0 011.06 0L12 10.94l3.182-3.183a.75.75 0 111.061 1.061L13.06 12l3.183 3.182a.75.75 0 11-1.06 1.06L12 13.06l-3.182 3.182a.75.75 0 01-1.06-1.06L10.94 12 7.757 8.818a.75.75 0 010-1.06z" />
    </svg>
  )
];

// ✅ Dynamic data only
// const slideData = {
//   heading: "The Four Lobes of the Cerebral Cortex",
//   footerText: "The four lobes of the cerebral cortex play distinct and important roles in human cognition, perception, and behavior.",
//   lobes: [
//     {
//       name: "Frontal Lobe",
//       functions: "Executive functions, planning, personality, motor control",
//     },
//     {
//       name: "Parietal Lobe",
//       functions: "Sensory processing, spatial awareness, information integration",
//     },
//     {
//       name: "Temporal Lobe",
//       functions: "Auditory processing, language, memory formation",
//     },
//     {
//       name: "Occipital Lobe",
//       functions: "Visual processing and interpretation",
//     }
//   ]
// };

function TitledIconGrid({slideData}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden">

        {/* Header */}
        <div className="flex-grow flex flex-col justify-center p-12 lg:p-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {slideData.heading}
            </h1>
          </header>

          {/* Lobes Grid */}
          <main className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {slideData.lobes.map((lobe, index) => {
              const color = lobeColors[index % lobeColors.length];
              const icon = lobeIcons[index % lobeIcons.length];
              return (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${color}`}>
                    {icon}
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">{lobe.name}</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">{lobe.functions}</p>
                </div>
              );
            })}
          </main>
        </div>

        {/* Footer */}
        <footer className="w-full bg-orange-500 p-6 text-center mt-auto">
          <p className="text-white text-lg max-w-5xl mx-auto leading-relaxed">
            {slideData.footerText}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default TitledIconGrid;
