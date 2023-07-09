import React from 'react';

const CustomerSVG = ({ title }) => {
  return (
    <div className="flex items-center justify-center">
    <div>
        <p>{title}</p>
        <div className="flex items-center justify-center mt-5">
        <svg
          className="h-40 w-40 opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
          <path d="M21 12l-4 4-4-4M3 12l4-4 4 4" />
        </svg>         
        </div>      
      </div>      
    </div>
  );
};

export default CustomerSVG;