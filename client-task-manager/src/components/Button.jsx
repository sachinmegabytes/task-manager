import React from 'react';

const Button = ({ type, name, text, onClick }) => {
  // A reusable button component with custom styling
  return (
    <button
      className="flex text-center items-center bg-navy-blue justify-center hover:bg-navy-blue-dark text-white font-bold py-1 px-4 rounded transition duration-300 ease-in-out"
      type={type}
      name={name}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
