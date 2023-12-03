import React from 'react';

const Card = ({ title, text, imageUrl, children }) => {
  // A reusable card component to use everywhere
  return (
    <div className="max-w-xl rounded overflow-hidden shadow-lg">
      <img className="w-10 " src={imageUrl} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{title}</div>
        <p className="text-gray-700 text-base">{text}</p>
      </div>
      <div className="px-6 pt-4 pb-2">{children}</div>
    </div>
  );
};

export default Card;
