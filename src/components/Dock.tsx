// src/components/Dock.tsx
import React from 'react';
import { Terminal, Briefcase, Folder, Globe } from 'lucide-react';

interface DockProps {
  onOpenApp: (appId: string) => void;
}

export const Dock: React.FC<DockProps> = ({ onOpenApp }) => {
  return (
    <div className="flex gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 mx-auto mb-4 z-[9999]">
      <DockItem icon={<Terminal size={20} />} label="Terminal" onClick={() => onOpenApp('terminal')} />
      <DockItem icon={<Briefcase size={20} />} label="Stock" onClick={() => onOpenApp('bawsaq')} />
      <DockItem icon={<Folder size={20} />} label="Files" onClick={() => onOpenApp('files')} />
      <DockItem icon={<Globe size={20} />} label="Browser" onClick={() => onOpenApp('browser')} />
    </div>
  );
};

const DockItem = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center gap-1 transition-all hover:-translate-y-1"
  >
    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/20 transition-colors text-white">
      {icon}
    </div>
    <span className="text-[9px] font-mono text-white/40 opacity-0 group-hover:opacity-100 uppercase tracking-widest">
      {label}
    </span>
  </button>
);