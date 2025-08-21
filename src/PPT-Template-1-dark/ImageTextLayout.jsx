import React from 'react';

// ✅ Slide content defined dynamically
// const slideData = {
//   heading: "Creativity and Innovation Networks",
//   description:
//     "The Creativity and Innovation Networks slide explores the cognitive processes that underlie creative thinking and problem-solving in leadership contexts. It delves into the neural mechanisms associated with generating novel ideas (divergent thinking) and evaluating and refining those ideas (convergent thinking), highlighting the importance of accessing the brain's default mode network and cultivating the right environmental and psychological conditions to stimulate creative problem-solving.",
//   image: {
//     url: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1932&auto=format&fit=crop",
//     alt: "Intricate network of wires around a glowing lightbulb, symbolizing creativity",
//   },
// };

function ImageTextLayout({slideData}) {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex shadow-2xl rounded-lg overflow-hidden">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          
          {/* Left Column: Image */}
          <div className="h-full w-full overflow-hidden">
            <img
              src={slideData.image.url}
              alt={slideData.image.alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col justify-center p-12 lg:p-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {slideData.heading}
            </h1>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
              {slideData.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ImageTextLayout;
