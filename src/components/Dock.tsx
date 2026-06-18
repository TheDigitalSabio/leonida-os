import React from 'react';
import { Terminal, TrendingUp, FolderGit } from 'lucide-react';

interface DockProps {
  onOpenApp: (appId: string) => void;
}

export const Dock: React.FC<DockProps> = ({ onOpenApp }) => {
  return (
    <div className="w-full flex justify-center pb-2 z-10">
      <div className="bg-black/60 backdrop-blur-2xl px-6 py-4 rounded-3xl border border-white/10 flex gap-8 shadow-2xl items-center">
        
        <button 
          onClick={() => onOpenApp('terminal')}
          className="p-3 bg-vice-pink text-white rounded-2xl shadow-neon-pink hover:scale-110 transition duration-200 cursor-pointer"
        >
          <Terminal size={22} />
        </button>

        <button 
          onClick={() => onOpenApp('bawsaq')}
          className="p-3 bg-rockstar-card text-white border border-white/10 rounded-2xl hover:border-vice-cyan hover:text-vice-cyan hover:shadow-neon-cyan hover:scale-110 transition duration-200 cursor-pointer"
        >
          <TrendingUp size={22} />
        </button>

        <button 
          onClick={() => onOpenApp('files')}
          className="p-3 bg-rockstar-card text-white border border-white/10 rounded-2xl hover:border-vice-cyan hover:text-vice-cyan hover:shadow-neon-cyan hover:scale-110 transition duration-200 cursor-pointer"
        >
          <FolderGit size={22} />
        </button>

      </div>
    </div>
  );
};