import React from 'react';

// Reusable InfoCard with fixed height and padding
const InfoCard = ({ title, children, colorClass }) => (
  <div className={`min-h-[180px] p-6 text-white rounded-lg flex flex-col justify-center ${colorClass}`}>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm font-light leading-relaxed">{children}</p>
  </div>
);

// ✅ Data source
// const json = {
//   title: "Modern Leadership Paradigms",
//   pageNumber: 5,
//   cards: [
//     {
//       id: 1,
//       title: "Servant Leadership",
//       text: "Focuses on the growth and well-being of people and the communities to which they belong."
//     },
//     {
//       id: 2,
//       title: "Adaptive Leadership",
//       text: "Encourages flexibility and innovation to deal with changing environments."
//     },
//     {
//       id: 3,
//       title: "Transformational Leadership",
//       text: "Inspires positive change by motivating followers to exceed expectations."
//     },
//     {
//       id: 4,
//       title: "Authentic Leadership",
//       text: "Grounded in self-awareness, transparency, and ethical behavior."
//     }
//   ]
// };

// ✅ Slide component
function FourCardGrid({slideData}) {
  const { title, pageNumber, cards } = slideData;

  // Predefined Tailwind background colors
  const colorClasses = [
    'bg-cyan-600',
    'bg-indigo-600',
    'bg-pink-600',
    'bg-emerald-600',
    'bg-orange-600',
    'bg-purple-600',
    'bg-yellow-500',
    'bg-teal-600',
  ];

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden relative">

        {/* Header */}
        <div className="flex-grow p-8 md:p-12 overflow-y-auto">
          <header className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {title}
            </h1>
          </header>

          {/* Grid of InfoCards with structured height */}
          <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <InfoCard
                key={`${card.id}-${index}`}
                title={card.title}
                colorClass={colorClasses[index % colorClasses.length]}
              >
                {card.text}
              </InfoCard>
            ))}
          </main>
        </div>

        {/* Footer Page Number */}
        <div className="absolute bottom-6 right-8 text-gray-400 font-medium">
          {pageNumber}
        </div>
      </div>
    </div>
  );
}

export default FourCardGrid;
