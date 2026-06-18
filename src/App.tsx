// src/App.tsx
import { useState } from 'react';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { TerminalApp } from './components/TerminalApp';
import { BawsaqApp } from './components/BawsaqApp';
import { FilesApp } from './components/FilesApp';

function App() {
  const [openApps, setOpenApps] = useState<Record<string, boolean>>({
    terminal: true,
    bawsaq: false,
    files: false,
  });

  const toggleApp = (appId: string, isOpen: boolean) => {
    setOpenApps((prev) => ({ ...prev, [appId]: isOpen }));
  };

  return (
    <div className="crt-overlay relative w-screen h-screen bg-gradient-to-br from-rockstar-bg via-vice-purple to-rockstar-bg overflow-hidden flex flex-col justify-between p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full pointer-events-none animate-scanline" />

      {/* TOP SYSTEM NAV */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest text-white/60 font-mono uppercase bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 z-10">
        <div>LEONIDA OS v1.0.6</div>
        <div className="text-vice-cyan animate-pulse">SYSTEM SECURE // ACTIVE</div>
        <div>09:45 AM</div>
      </div>

      {/* CENTRAL APP DESKTOP WINDOW CONTAINER LAYER */}
      {/* Note: We removed 'flex items-center justify-center' so our absolute positions align nicely from the top-left */}
      <div className="flex-1 w-full relative p-4">
        
        {/* APP WINDOW 1: CYBERSEC TERMINAL */}
        <Window 
          title="SYSTEM TERMINAL // CORE" 
          isOpen={openApps.terminal} 
          onClose={() => toggleApp('terminal', false)}
          defaultX={60}
          defaultY={80}
        >
          <TerminalApp />
        </Window>

        {/* APP WINDOW 2: BAWSAQ PORTFOLIO STOCK INDEX */}
        <Window 
          title="VICE STOCK INDEX // LIVE" 
          isOpen={openApps.bawsaq} 
          onClose={() => toggleApp('bawsaq', false)}
          defaultX={140}
          defaultY={140}
        >
          <BawsaqApp />
        </Window>

        {/* APP WINDOW 3: LOCAL ENCRYPTED LOG EXPLORER */}
        <Window 
          title="LOCAL STORAGE // DIRECTORY" 
          isOpen={openApps.files} 
          onClose={() => toggleApp('files', false)}
          defaultX={220}
          defaultY={200}
        >
          <FilesApp />
        </Window>

      </div>

      {/* FOOTER MANAGEMENT SYSTEM LAUNCHER */}
      <Dock onOpenApp={(appId: string) => toggleApp(appId, true)} />
    </div>
  );
}
export default App;