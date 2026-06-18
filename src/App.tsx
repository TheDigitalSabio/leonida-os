// src/App.tsx
import { useState } from 'react';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { TerminalApp } from './components/TerminalApp';
import { BawsaqApp } from './components/BawsaqApp';
import { FilesApp } from './components/FilesApp';

export type SystemTheme = 'vice' | 'synthwave' | 'amber';

function App() {
  // ⚡ FIX: Terminal is now set to false so it stays closed on refresh!
  const [openApps, setOpenApps] = useState<Record<string, boolean>>({
    terminal: false, 
    bawsaq: false,
    files: false,
  });

  const [theme, setTheme] = useState<SystemTheme>('vice');
  const [isFileUnlocked, setIsFileUnlocked] = useState(false);
  
  // Track which window is on top by storing its ID at the end of the array
  const [focusOrder, setFocusOrder] = useState<string[]>(['terminal', 'bawsaq', 'files']);

  const toggleApp = (appId: string, isOpen: boolean) => {
    setOpenApps((prev) => ({ ...prev, [appId]: isOpen }));
    if (isOpen) {
      bringToFront(appId);
    }
  };

  const bringToFront = (appId: string) => {
    setFocusOrder((prev) => {
      const remaining = prev.filter((id) => id !== appId);
      return [...remaining, appId];
    });
  };

  const getZIndex = (appId: string) => {
    const layerIndex = focusOrder.indexOf(appId);
    // Give large spacing between layers (50, 100, 150) to force browser stacking hierarchies
    return layerIndex === -1 ? 50 : 50 + (layerIndex * 50);
  };

  const getThemeBackground = () => {
    switch (theme) {
      case 'synthwave': return 'from-[#0d0221] via-[#241442] to-[#0d0221]';
      case 'amber': return 'from-[#0a0600] via-[#1a1100] to-[#0a0600]';
      default: return 'from-rockstar-bg via-vice-purple to-rockstar-bg';
    }
  };

  return (
    <div className={`crt-overlay relative w-screen h-screen bg-gradient-to-br ${getThemeBackground()} overflow-hidden flex flex-col justify-between p-4 transition-colors duration-500`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full pointer-events-none animate-scanline" />

      {/* TOP SYSTEM NAV */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest text-white/60 font-mono uppercase bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 z-[9999]">
        <div>LEONIDA OS v1.1.0</div>
        <div className={`animate-pulse ${theme === 'amber' ? 'text-amber-500' : theme === 'synthwave' ? 'text-emerald-400' : 'text-vice-cyan'}`}>
          THEME: {theme.toUpperCase()} // SYSTEM SECURE
        </div>
        <div>12:25 PM</div>
      </div>

      {/* DESKTOP CANVAS WORKSPACE */}
      <div className="flex-1 w-full relative p-4">
        
        {/* WINDOW 1: CYBERSEC TERMINAL */}
        <Window 
          title="SYSTEM TERMINAL // CORE" 
          isOpen={openApps.terminal} 
          onClose={() => toggleApp('terminal', false)}
          onFocus={() => bringToFront('terminal')}
          zIndex={getZIndex('terminal')}
          defaultX={60}
          defaultY={80}
          theme={theme}
        >
          <TerminalApp 
            setTheme={setTheme} 
            setIsFileUnlocked={setIsFileUnlocked} 
            theme={theme}
          />
        </Window>

        {/* WINDOW 2: BAWSAQ PORTFOLIO STOCK INDEX */}
        <Window 
          title="VICE STOCK INDEX // LIVE" 
          isOpen={openApps.bawsaq} 
          onClose={() => toggleApp('bawsaq', false)}
          onFocus={() => bringToFront('bawsaq')}
          zIndex={getZIndex('bawsaq')}
          defaultX={140}
          defaultY={140}
          theme={theme}
        >
          <BawsaqApp theme={theme} />
        </Window>

        {/* WINDOW 3: LOCAL STORAGE FILE EXPLORER */}
        <Window 
          title="LOCAL STORAGE // DIRECTORY" 
          isOpen={openApps.files} 
          onClose={() => toggleApp('files', false)}
          onFocus={() => bringToFront('files')}
          zIndex={getZIndex('files')}
          defaultX={220}
          defaultY={200}
          theme={theme}
        >
          <FilesApp isUnlocked={isFileUnlocked} theme={theme} />
        </Window>

      </div>

      {/* FOOTER MANAGER LAUNCHER */}
      <Dock onOpenApp={(appId: string) => toggleApp(appId, true)} />
    </div>
  );
}

export default App;