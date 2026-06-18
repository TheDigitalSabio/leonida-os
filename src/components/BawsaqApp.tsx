// src/components/BawsaqApp.tsx
import React, { useEffect, useRef, useState } from 'react';
import type { SystemTheme } from '../App';

interface BawsaqAppProps {
  theme: SystemTheme;
}

export const BawsaqApp: React.FC<BawsaqAppProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prices, setPrices] = useState<number[]>([40, 45, 42, 48, 46, 52, 50, 58, 55, 64]);

  // Handle live stock index jittering loops
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const nextList = [...prev.slice(1)];
        const lastPrice = prev[prev.length - 1];
        const drift = (Math.random() - 0.48) * 6; // Slight upward bias
        nextList.push(Math.max(20, Math.min(100, lastPrice + drift)));
        return nextList;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Handle active Canvas graphic drawing engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Pick the chart stroke line filter based on active system theme accents
    let strokeColor = '#38bdf8'; // vice cyan
    if (theme === 'synthwave') strokeColor = '#34d399'; // synthwave emerald
    if (theme === 'amber') strokeColor = '#f59e0b'; // retro amber

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = strokeColor;

    const step = canvas.width / (prices.length - 1);
    prices.forEach((price, idx) => {
      const x = idx * step;
      // Invert Y axis since HTML canvas 0,0 anchors to top-left
      const y = canvas.height - (price / 100) * canvas.height;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }, [prices, theme]);

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      <div className="bg-black/40 p-2 border border-white/5 rounded-lg mb-3 flex justify-between items-center">
        <div>
          <span className="text-[10px] text-white/30 block">TICKER INDEX</span>
          <span className="font-bold text-white tracking-wider">LNDQ // MARKET METRICS</span>
        </div>
        <span className="text-emerald-400 font-bold animate-pulse">● LIVE VALUE DATA FEED</span>
      </div>

      {/* RENDER DYNAMIC CANVAS PLOT CHART */}
      <div className="bg-black/20 border border-white/5 p-2 rounded-lg mb-3">
        <canvas ref={canvasRef} width={480} height={100} className="w-full h-[100px]" />
      </div>

      {/* ASSET STOCK DATA LIST */}
      <div className="space-y-1 bg-black/40 border border-white/5 p-2 rounded-lg flex-1 overflow-y-auto">
        <div className="flex justify-between items-center text-[10px] text-white/30 pb-1 border-b border-white/5 mb-1 uppercase tracking-wider">
          <span>Asset / Ticker</span>
          <div className="flex gap-8">
            <span>Price</span>
            <span>Volume</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-cyan-400 font-bold">AIOM // AI Operations Hub</span>
          <div className="flex gap-6 font-bold">
            <span className="text-emerald-400">$47.00</span>
            <span className="text-white/60">8.4K</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-purple-400 font-bold">MSOP // Master SOP Library</span>
          <div className="flex gap-6 font-bold">
            <span className="text-emerald-400">$30.00</span>
            <span className="text-white/60">12.1K</span>
          </div>
        </div>
        <div className="flex justify-between items-center py-1">
          <span className="text-pink-400 font-bold">SSTK // SaaS Tech Tracker</span>
          <div className="flex gap-6 font-bold">
            <span className="text-emerald-400">$29.00</span>
            <span className="text-white/60">5.2K</span>
          </div>
        </div>
      </div>
    </div>
  );
};