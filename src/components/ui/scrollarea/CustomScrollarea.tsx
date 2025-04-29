'use client';
import React, { useState, useRef } from 'react';

const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowScrollbar(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowScrollbar(false);
    }, 400);
  };

  return (
    <div
      className={`scroll-container w-full ${showScrollbar ? 'show-scrollbar' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
