// src/components/FilesApp.tsx
import React from 'react';
import { Folder, ExternalLink, HardDrive } from 'lucide-react';

interface SystemFile {
  name: string;
  size: string;
  type: string;
  description: string;
  targetUrl: string;
}

export const FilesApp: React.FC = () => {
  // Mapping out your operational template assets to your public web stores
  const localFiles: SystemFile[] = [
    {
      name: 'AI_Ops_Hub_v1.0.ntn',
      size: '4.2 MB',
      type: 'Notion Template',
      description: 'Centralized neural workspace command array.',
      targetUrl: 'https://thedigitalsabio.gumroad.com/l/operations-suite', // Swap with your actual live Gumroad/Payhip link
    },
    {
      name: 'Master_SOP_Workflow.ntn',
      size: '8.7 MB',
      type: 'Notion Template',
      description: 'Standard operational standard blueprint logs.',
      targetUrl: 'https://thedigitalsabio.gumroad.com/l/operations-suite',
    },
    {
      name: 'SaaS_Tracker_Auditor.ntn',
      size: '2.9 MB',
      type: 'Notion Template',
      description: 'Tech stack asset overhead analyzer matrix.',
      targetUrl: 'https://thedigitalsabio.gumroad.com/l/operations-suite',
    },
  ];

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      
      {/* Directory Storage Header */}
      <div className="bg-black/30 p-3 rounded-lg border border-white/5 flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <HardDrive size={18} className="text-vice-pink" />
          <div>
            <span className="text-white/40 block tracking-widest text-[10px] uppercase">Storage Volume</span>
            <span className="text-white font-bold tracking-wider">SECURE_NODE_DRIVE // LND_01</span>
          </div>
        </div>
        <span className="text-white/30 text-[10px]">CAPACITY: 15.8 GB FREE</span>
      </div>

      {/* Directory File Grid */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {localFiles.map((file) => (
          <a
            key={file.name}
            href={file.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-black/10 hover:bg-vice-pink/5 border border-white/5 hover:border-vice-pink/40 p-3 rounded-lg transition duration-150 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Folder size={20} className="text-vice-pink group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-white font-bold block">{file.name}</span>
                <span className="text-[10px] text-white/40 block">
                  {file.type} • {file.size}
                </span>
                <span className="text-[11px] text-white/60 block mt-1 font-sans italic">
                  {file.description}
                </span>
              </div>
            </div>

            {/* Launch Out Indicator icon */}
            <div className="text-white/30 group-hover:text-vice-pink transition-colors pl-2">
              <ExternalLink size={16} />
            </div>
          </a>
        ))}
      </div>

    </div>
  );
};