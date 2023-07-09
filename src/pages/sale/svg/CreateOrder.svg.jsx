import React from 'react';

const CreateOrderSVG = () => {
  return (
    <div className="flex items-center justify-center">
    <div>
        <p>¡Crea tu primera orden de venta ahora!</p>
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
            <path d="M8 12h8M12 8v8" />
          </svg>
        </div>      
    </div>      
    </div>
  );
};

export default CreateOrderSVG;