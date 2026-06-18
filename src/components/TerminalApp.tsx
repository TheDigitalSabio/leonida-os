// src/components/TerminalApp.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { SystemTheme } from '../App';

interface TerminalAppProps {
  setTheme: (t: SystemTheme) => void;
  setIsFileUnlocked: (b: boolean) => void;
  theme: SystemTheme;
}

export const TerminalApp: React.FC<TerminalAppProps> = ({ setTheme, setIsFileUnlocked, theme }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ text: string; type: string }>>([
    { text: '> DEPLOYING UNDERGROUND CORE SYSTEMS...', type: 'success' },
    { text: "> HINT: EXPLORE LOCAL STORAGE DIRECTORY FOR CLUES. TYPE 'HELP'.", type: 'system' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const newHistory = [...history, { text: `> ${input}`, type: 'input' }];
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    switch (command) {
      case 'help':
        newHistory.push(
          { text: '— AVAILABLE CORE PROTOCOLS —', type: 'system' },
          { text: '  theme [vice|synthwave|amber] - Shift system pipeline accents.', type: 'system' },
          { text: '  unlock [password]          - Decrypt secure storage node arrays.', type: 'system' },
          { text: '  clear                      - Flush terminal screen cache.', type: 'system' }
        );
        break;
      case 'theme':
        if (['vice', 'synthwave', 'amber'].includes(arg)) {
          setTheme(arg as SystemTheme);
          newHistory.push({ text: `SYSTEM INTERFACE RECONFIGURED TO: ${arg.toUpperCase()}`, type: 'success' });
        } else {
          newHistory.push({ text: 'ERROR: INVALID ACCESS SPECIFICATION. USE VICE, SYNTHWAVE, OR AMBER.', type: 'error' });
        }
        break;
      case 'unlock':
        if (parts[1] === 'leonida6') {
          setIsFileUnlocked(true);
          newHistory.push({ text: 'ACCESS GRANTED. SECRET METRIC FILE DECRYPTED IN LOCAL DIRECTORY.', type: 'success' });
        } else {
          newHistory.push({ text: 'INVALID ENCRYPTION KEY SEQUENCE. RE-EXAMINE STORAGE SYSTEM HEADERS.', type: 'error' });
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({ text: `NODE CODE UNRECOGNIZED: "${command}"`, type: 'error' });
    }
    setHistory(newHistory);
    setInput('');
  };

  const textColors: Record<SystemTheme, string> = {
    vice: 'text-vice-pink', synthwave: 'text-emerald-400', amber: 'text-amber-500'
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      <div className="flex-1 overflow-y-auto space-y-1.5 pb-4">
        {history.map((log, i) => (
          <div key={i} className={`${log.type === 'success' ? textColors[theme] : log.type === 'system' ? 'text-white/40' : log.type === 'error' ? 'text-red-400 font-bold' : log.type === 'input' ? 'text-cyan-400' : ''}`}>
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-white/5 pt-3">
        <span className={`${textColors[theme]} font-bold animate-pulse`}>&gt;</span>
        <input
          type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="Enter system protocol..." className="flex-1 bg-transparent text-white outline-none placeholder-white/10 uppercase" autoFocus
        />
      </form>
    </div>
  );
};