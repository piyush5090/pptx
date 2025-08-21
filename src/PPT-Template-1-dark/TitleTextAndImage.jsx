import React from 'react';

function TitleTextAndImage({slideData}) {
  // JSON-style data defined within the component
  // const slideData = {
  //   title: "Basic Brain Anatomy Overview",
  //   text: "The human brain is an incredibly complex and fascinating organ, divided into three major regions: the cerebrum, cerebellum, and brainstem. Each of these regions plays a crucial role in our cognitive, motor, and vital functions, working seamlessly together to enable our remarkable capabilities.",
  //   image: {
  //     src: "https://images.unsplash.com/photo-1598805291185-941b83b3d115?q=80&w=1964&auto=format&fit=crop",
  //     alt: "Stylized 3D render of a human brain"
  //   },
  //   pageNumber: 3
  // };

  const { title, text, image, pageNumber } = slideData;

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 w-full max-w-6xl aspect-video flex shadow-2xl rounded-lg overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          
          {/* Left Column: Text */}
          <div className="flex flex-col justify-center p-12 lg:p-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
              {text}
            </p>
          </div>

          {/* Right Column: Image */}
          {image?.src && (
            <div className="flex items-center justify-center p-8">
              <img
                src={image.src}
                alt={image.alt || 'Slide visual'}
                className="w-full h-auto max-h-[90%] object-contain rounded-full shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Page Number */}
        {pageNumber && (
          <div className="absolute bottom-6 right-8 text-gray-400 font-medium">
            {pageNumber}
          </div>
        )}
      </div>
    </div>
  );
}

export default TitleTextAndImage;
