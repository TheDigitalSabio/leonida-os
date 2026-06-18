// src/components/FilesApp.tsx
import React from 'react';
import { ExternalLink, ShieldAlert, Lock, Unlock, Database, Sliders, Terminal } from 'lucide-react';
import type { SystemTheme } from '../App';

interface FilesAppProps {
  isUnlocked: boolean;
  theme: SystemTheme;
}

export const FilesApp: React.FC<FilesAppProps> = ({ isUnlocked, theme }) => {
  return (
    <div className="flex flex-col h-full font-mono text-xs select-none">
      
      {/* DIRECTORY STORAGE BLOCK HEADER */}
      <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <ShieldAlert size={18} className={theme === 'amber' ? 'text-amber-500' : theme === 'synthwave' ? 'text-emerald-400' : 'text-vice-pink'} />
          <div>
            <span className="text-white/40 block tracking-widest text-[9px] uppercase">PASS HINT: LEONIDA + SECTOR_NUMBER (6)</span>
            <span className="text-white font-bold tracking-wider">NODE_DRIVE // SYSTEM_FILES</span>
          </div>
        </div>
      </div>

      {/* PORTFOLIO MATRIX DIRECTORY GRID */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        
        <span className="text-[10px] text-white/30 tracking-widest uppercase block mb-1 font-bold">
          // Deployed Operational Systems Portfolio
        </span>

        {/* 1. AI OPERATIONS HUB */}
        <a 
          href="https://thedigitalsabio.gumroad.com/l/operations-suite"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-black/20 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 p-3 rounded-lg transition duration-150 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-cyan-400 group-hover:scale-105 transition" />
            <div>
              <span className="text-white font-bold block group-hover:text-cyan-400 transition">AI_Operations_Hub.md</span>
              <span className="text-[10px] text-white/40">Centralized neural workspace command array layout.</span>
            </div>
          </div>
          <ExternalLink size={14} className="text-white/20 group-hover:text-cyan-400 transition" />
        </a>

        {/* 2. MASTER SOP & WORKFLOW LIBRARY */}
        <a 
          href="https://thedigitalsabio.gumroad.com/l/operations-suite"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-black/20 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 p-3 rounded-lg transition duration-150 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Sliders size={18} className="text-purple-400 group-hover:scale-105 transition" />
            <div>
              <span className="text-white font-bold block group-hover:text-purple-400 transition">Master_SOP_Workflow_Library.md</span>
              <span className="text-[10px] text-white/40">Standard operational standardized framework logs.</span>
            </div>
          </div>
          <ExternalLink size={14} className="text-white/20 group-hover:text-purple-400 transition" />
        </a>

        {/* 3. SAAS TRACKER & TECH STACK AUDITOR */}
        <a 
          href="https://thedigitalsabio.gumroad.com/l/operations-suite"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-black/20 border border-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 p-3 rounded-lg transition duration-150 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Database size={18} className="text-pink-400 group-hover:scale-105 transition" />
            <div>
              <span className="text-white font-bold block group-hover:text-pink-400 transition">SaaS_Tracker_Tech_Auditor.md</span>
              <span className="text-[10px] text-white/40">Active cloud subscription metrics & expenditure array.</span>
            </div>
          </div>
          <ExternalLink size={14} className="text-white/20 group-hover:text-pink-400 transition" />
        </a>

        <div className="border-t border-white/5 my-3 pt-2" />

        {/* SECURITY CONDITIONAL ACCESSED GATEWAY */}
        <span className="text-[10px] text-white/30 tracking-widest uppercase block mb-1 font-bold">
          // Protected Main Ecosystem Node
        </span>

        {isUnlocked ? (
          <a
            href="https://thedigitalsabio.gumroad.com/l/operations-suite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-black/20 border border-emerald-500/30 hover:bg-emerald-500/5 p-3 rounded-lg transition duration-150 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Unlock size={18} className="text-emerald-400 animate-pulse" />
              <div>
                <span className="text-emerald-400 font-bold block">SECRET_MARKETPLACE_GATEWAY.lnk</span>
                <span className="text-[10px] text-emerald-400/70">Ecosystem decrypted! Click to unpack premium workspace bundle.</span>
              </div>
            </div>
            <ExternalLink size={14} className="text-emerald-400" />
          </a>
        ) : (
          <div className="flex items-center justify-between bg-black/40 border border-red-500/10 p-3 rounded-lg select-none opacity-70">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-red-500/60" />
              <div>
                <span className="text-red-500/60 font-bold block">FULL_OPERATIONS_SUITE_BUNDLE.enc</span>
                <span className="text-[10px] text-white/20">LOCKED // Run 'unlock [password]' protocol inside core terminal.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};