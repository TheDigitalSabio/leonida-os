// src/components/Window.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';
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
  isBrowser?: boolean;
}

export const Window: React.FC<WindowProps> = ({ 
  title, isOpen, onClose, onFocus, zIndex, children, defaultX = 100, defaultY = 120, theme, isBrowser = false
}) => {
  const [position, setPosition] = useState({ x: defaultX, y: defaultY });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const borderColors: Record<SystemTheme, string> = {
    vice: 'border-vice-pink',
    synthwave: 'border-emerald-400',
    amber: 'border-amber-500'
  };

  // Handle Dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
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
  }, [isDragging, isMaximized]);

  if (!isOpen) return null;

  return (
    <div 
      onClick={onFocus}
      // ADDED: ${borderColors[theme]} to the className
      className={`absolute flex flex-col bg-black/80 border-t-4 ${borderColors[theme]} border-x border-b border-white/10 rounded-xl shadow-2xl overflow-hidden ${isMaximized ? 'inset-4 w-[calc(100vw-32px)] h-[calc(100vh-32px)]' : 'w-[600px] h-[500px]'}`}      style={{ 
        left: isMaximized ? '16px' : `${position.x}px`, 
        top: isMaximized ? '16px' : `${position.y}px`, 
        zIndex: zIndex
      }}
    >
      <div 
        onMouseDown={(e) => { onFocus(); setIsDragging(true); dragStart.current = { x: e.clientX, y: e.clientY }; }}
        className="bg-black/60 px-4 py-3 flex justify-between items-center border-b border-white/10 cursor-grab"
      >
        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">{title}</span>
        <div className="flex gap-2">
          {isBrowser && (
            <button onClick={() => setIsMaximized(!isMaximized)} className="text-white/50 hover:text-white">
              <Maximize2 size={12} />
            </button>
          )}
          <button onClick={onClose} className="text-red-500 hover:text-red-400"><X size={12} /></button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};