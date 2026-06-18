// src/components/Window.tsx
import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  defaultX?: number;
  defaultY?: number;
}

export const Window: React.FC<WindowProps> = ({ 
  title, 
  isOpen, 
  onClose, 
  children,
  defaultX = 100,
  defaultY = 120
}) => {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // 1. ALL HOOKS MUST SIT AT THE TOP - NEVER RETURN BEFORE THIS RUNS
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      setPosition((prev) => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));

      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; 
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  // 2. MOVE THE EARLY RETURN HERE (AFTER ALL HOOKS HAVE REGISTERED)
  if (!isOpen) return null;

  return (
    <div 
      className="absolute w-[90%] md:w-[550px] h-[380px] bg-rockstar-card border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden z-20"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: 'none'
      }}
    >
      {/* DRAGGABLE TITLE BAR */}
      <div 
        onMouseDown={handleMouseDown}
        className={`bg-black/40 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-white/5 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <span className="text-xs font-mono font-bold tracking-widest text-vice-cyan uppercase pointer-events-none">
          {title}
        </span>
        <div className="flex gap-2 items-center">
          <div className="w-3 h-3 rounded-full bg-rockstar-accent/40" />
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              onClose();
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition cursor-pointer z-30" 
          />
        </div>
      </div>

      {/* WINDOW PANEL MATERIAL */}
      <div className="flex-1 p-6 overflow-y-auto text-sm text-white/90 font-mono">
        {children}
      </div>

    </div>
  );
};