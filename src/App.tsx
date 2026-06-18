import { useState } from 'react';
import { Dock } from './components/Dock';
import { Window } from './components/Window';
import { TerminalApp } from './components/TerminalApp';
import { BawsaqApp } from './components/BawsaqApp';
import { FilesApp } from './components/FilesApp';
import { BrowserApp } from './components/BrowserApp';

export type SystemTheme = 'vice' | 'synthwave' | 'amber';

function App() {
  const [openApps, setOpenApps] = useState<Record<string, boolean>>({ 
    terminal: false, bawsaq: false, files: false, browser: false 
  });
  const [theme, setTheme] = useState<SystemTheme>('vice');
  const [isFileUnlocked, setIsFileUnlocked] = useState(false);
  const [focusOrder, setFocusOrder] = useState<string[]>(['terminal', 'bawsaq', 'files', 'browser']);

  const toggleApp = (appId: string, isOpen: boolean) => {
    setOpenApps((prev) => ({ ...prev, [appId]: isOpen }));
    if (isOpen) bringToFront(appId);
  };

  const bringToFront = (appId: string) => setFocusOrder((prev) => [...prev.filter((id) => id !== appId), appId]);
  const getZIndex = (appId: string) => 50 + (focusOrder.indexOf(appId) * 50);

  // Theme background mapping
  const getThemeBackground = () => {
    switch (theme) {
      case 'synthwave': return 'from-[#0d0221] via-[#241442] to-[#0d0221]';
      case 'amber': return 'from-[#0a0600] via-[#1a1100] to-[#0a0600]';
      default: return 'from-black via-[#1a0b2e] to-black'; // Vice
    }
  };

  return (
    <div className={`relative w-screen h-screen bg-gradient-to-br ${getThemeBackground()} overflow-hidden flex flex-col p-4 font-mono transition-colors duration-500`}>
      {/* TOP SYSTEM NAV - RESTORED */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest text-white/60 font-mono uppercase bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 z-[9999]">
        <div>LEONIDA OS v1.0.6</div>
        <div className="animate-pulse">THEME: {theme.toUpperCase()} // SYSTEM SECURE</div>
        <div>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>

      <div className="flex-1 w-full relative">
        <Window title="TERMINAL // CORE" isOpen={openApps.terminal} onClose={() => toggleApp('terminal', false)} onFocus={() => bringToFront('terminal')} zIndex={getZIndex('terminal')} theme={theme}>
          <TerminalApp setTheme={setTheme} setIsFileUnlocked={setIsFileUnlocked} theme={theme} />
        </Window>
        <Window title="STOCK_INDEX" isOpen={openApps.bawsaq} onClose={() => toggleApp('bawsaq', false)} onFocus={() => bringToFront('bawsaq')} zIndex={getZIndex('bawsaq')} theme={theme}>
          <BawsaqApp theme={theme} />
        </Window>
        <Window title="FILES // STORAGE" isOpen={openApps.files} onClose={() => toggleApp('files', false)} onFocus={() => bringToFront('files')} zIndex={getZIndex('files')} theme={theme}>
          <FilesApp isUnlocked={isFileUnlocked} theme={theme} />
        </Window>
        <Window title="BROWSER // NODE_01" isBrowser={true} isOpen={openApps.browser} onClose={() => toggleApp('browser', false)} onFocus={() => bringToFront('browser')} zIndex={getZIndex('browser')} theme={theme}>
          <BrowserApp />
        </Window>
      </div>

      <Dock onOpenApp={(appId: string) => toggleApp(appId, true)} />
    </div>
  );
}
export default App;