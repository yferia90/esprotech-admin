import React, { useRef } from "react";

const Tooltip = ({ children, text }) => {
  const tooltipRef = useRef(null);
  const container = useRef(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative inline-block"
    >
      {children}
      {text ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-white text-secondary-900 p-1 rounded absolute top-full mt-2 whitespace-nowrap"
        >
          {text}
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;