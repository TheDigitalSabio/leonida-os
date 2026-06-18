// src/components/Window.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { SystemTheme } from '../App';

interface WindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  children: React.ReactNode;
  defaultX?: number;
  defaultY?: number;
  theme: SystemTheme;
}

export const Window: React.FC<WindowProps> = ({ 
  title, isOpen, onClose, onFocus, zIndex, children, defaultX = 100, defaultY = 120, theme
}) => {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStart.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  const getThemeBorder = () => {
    if (isDragging) return 'border-white/40';
    switch (theme) {
      case 'synthwave': return 'border-emerald-500/30';
      case 'amber': return 'border-amber-500/30';
      default: return 'border-white/10';
    }
  };

  return (
    <div 
      onClick={onFocus}
      onPointerDown={onFocus} 
      className={`absolute w-[90%] md:w-[550px] h-[390px] bg-rockstar-card border rounded-xl shadow-2xl flex flex-col overflow-hidden ${getThemeBorder()}`}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        zIndex: zIndex,
        pointerEvents: 'auto'
      }}
    >
      {/* HEADER ELEMENT */}
      <div 
        onMouseDown={(e) => {
          if (e.button !== 0) return;
          onFocus(); 
          setIsDragging(true);
          dragStart.current = { x: e.clientX, y: e.clientY };
        }}
        className={`bg-black/40 backdrop-blur-md px-4 py-3 flex justify-between items-center border-b border-white/5 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <span className={`text-xs font-mono font-bold tracking-widest uppercase ${theme === 'amber' ? 'text-amber-500' : theme === 'synthwave' ? 'text-emerald-400' : 'text-vice-cyan'}`}>
          {title}
        </span>
        <div className="flex gap-2 items-center">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              onClose(); 
            }}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition cursor-pointer z-[99999]" 
          />
        </div>
      </div>
      
      <div className="flex-1 p-5 overflow-y-auto text-sm text-white/90 font-mono bg-black/10">
        {children}
      </div>
    </div>
  );
};