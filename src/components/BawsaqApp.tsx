// src/components/BawsaqApp.tsx
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface StockAsset {
  ticker: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  volume: string;
}

export const BawsaqApp: React.FC = () => {
  // Mapping your product assets dynamically into a premium stock index structure
  const marketAssets: StockAsset[] = [
    {
      ticker: 'AIOH',
      name: 'AI Operations Hub',
      price: '$47.00',
      change: '+14.2%',
      isPositive: true,
      volume: '8.4K units',
    },
    {
      ticker: 'MSOP',
      name: 'Master SOP & Workflow Library',
      price: '$39.00',
      change: '+8.7%',
      isPositive: true,
      volume: '12.1K units',
    },
    {
      ticker: 'SSTK',
      name: 'SaaS Tracker & Tech Stack Auditor',
      price: '$29.00',
      change: '-2.4%',
      isPositive: false,
      volume: '5.2K units',
    },
  ];

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      {/* Index Header Banner */}
      <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex justify-between items-center mb-4">
        <div>
          <span className="text-white/40 block tracking-widest text-[10px] uppercase">Market Index</span>
          <span className="text-rockstar-accent font-bold text-sm tracking-wider">LEONIDA EXCHANGE // LNDQ</span>
        </div>
        <div className="flex items-center gap-2 text-right">
          <Activity size={16} className="text-vice-cyan animate-pulse" />
          <span className="text-vice-cyan font-bold text-xs tracking-widest animate-pulse">LIVE INDEX FEED</span>
        </div>
      </div>

      {/* Asset Table Matrix */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <div className="grid grid-cols-4 text-[10px] text-white/40 tracking-wider border-b border-white/5 pb-1 px-2 uppercase">
          <div>Asset // Ticker</div>
          <div className="text-right">Price</div>
          <div className="text-right">24H Change</div>
          <div className="text-right hidden sm:block">Volume</div>
        </div>

        {marketAssets.map((asset) => (
          <div 
            key={asset.ticker} 
            className="grid grid-cols-4 items-center bg-black/10 hover:bg-white/5 border border-white/5 hover:border-vice-cyan/30 p-3 rounded-lg transition duration-150 group"
          >
            <div>
              <span className="text-vice-cyan font-bold block group-hover:scale-105 transition-transform origin-left">{asset.ticker}</span>
              <span className="text-[10px] text-white/50 truncate block max-w-[120px] sm:max-w-none">{asset.name}</span>
            </div>
            
            <div className="text-right text-white font-bold text-sm">
              {asset.price}
            </div>

            <div className={`text-right flex items-center justify-end gap-0.5 font-bold ${asset.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {asset.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {asset.change}
            </div>

            <div className="text-right text-white/40 hidden sm:block">
              {asset.volume}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};