import React from 'react';

// ✅ Predefined style sets (max 8)
const arrowStyles = [
  { colorClass: 'bg-teal-500', shadowClass: 'bg-teal-800', widthClass: 'w-10/12' },
  { colorClass: 'bg-lime-500', shadowClass: 'bg-lime-800', widthClass: 'w-7/12' },
  { colorClass: 'bg-blue-500', shadowClass: 'bg-blue-800', widthClass: 'w-9/12' },
  { colorClass: 'bg-orange-500', shadowClass: 'bg-orange-700', widthClass: 'w-full' },
  { colorClass: 'bg-purple-500', shadowClass: 'bg-purple-800', widthClass: 'w-8/12' },
  { colorClass: 'bg-pink-500', shadowClass: 'bg-pink-800', widthClass: 'w-6/12' },
  { colorClass: 'bg-cyan-500', shadowClass: 'bg-cyan-800', widthClass: 'w-11/12' },
  { colorClass: 'bg-yellow-500', shadowClass: 'bg-yellow-800', widthClass: 'w-5/12' },
];

// ✅ Reusable 3D Arrow Bar Component
const ArrowBar = ({ text, style }) => (
  <div className={`relative h-16 ${style.widthClass}`}>
    {/* Shadow layer */}
    <div
      className={`absolute top-1 left-0 w-full h-full ${style.shadowClass}`}
      style={{
        clipPath:
          'polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%, 30px 50%)',
      }}
    ></div>

    {/* Main bar */}
    <div
      className={`absolute top-0 left-0 w-full h-full flex items-center text-white font-semibold pl-12 pr-10 ${style.colorClass}`}
      style={{
        clipPath:
          'polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%, 30px 50%)',
      }}
    >
      <span>{text}</span>
    </div>
  </div>
);

// ✅ Main Slide Component
function HorizontalBarList({slideData}) {
  // ✅ All visible data stored here
  // const slideData = {
  //   title: 'Neural Networks and Brain Communication',
  //   pageNumber: 4,
  //   footerText:
  //     'Understanding how these networks communicate helps us align leadership with brain-based processes.',
  //   networks: [
  //     { name: 'White Matter Tracts' },
  //     { name: 'Default Mode Network' },
  //     { name: 'Salience Network' },
  //     { name: 'Executive Control Network' },
  //   ],
  // };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex flex-col shadow-2xl rounded-lg overflow-hidden relative">

        {/* Main Content */}
        <div className="flex-grow p-12 lg:p-16">
          <header className="mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide">
              {slideData.title}
            </h1>
          </header>

          <main className="space-y-6">
            {slideData.networks.map((item, index) => {
              const style = arrowStyles[index % arrowStyles.length];
              return <ArrowBar key={index} text={item.name} style={style} />;
            })}
          </main>
        </div>

        {/* Page Number */}
        <div className="absolute bottom-6 right-8 text-gray-400 font-medium">
          {slideData.pageNumber}
        </div>
      </div>
    </div>
  );
}

export default HorizontalBarList;
