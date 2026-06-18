// src/components/TerminalApp.tsx
import React, { useState, useRef, useEffect } from 'react';

interface LogEntry {
  text: string;
  type: 'system' | 'error' | 'success' | 'input';
}

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<LogEntry[]>([
    { text: '> DEPLOYING UNDERGROUND CORE SYSTEMS...', type: 'success' },
    { text: "> TYPE 'HELP' TO DECRYPT AVAILABLE SYSTEM NODE COMMANDS.", type: 'system' },
  ]);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scrolls the terminal window down when new logs print
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    if (!trimmedInput) return;

    // Append what the user just typed to the screen log
    const newHistory: LogEntry[] = [...history, { text: `> ${input}`, type: 'input' }];

    // Simple routing engine for our terminal keywords
    switch (trimmedInput) {
      case 'help':
        newHistory.push(
          { text: '— AVAILABLE NODE CODES —', type: 'system' },
          { text: '  clear    - Flush system display memory.', type: 'system' },
          { text: '  about    - Read core system specifications.', type: 'system' },
          { text: '  network  - Ping adjacent underground sub-nets.', type: 'system' }
        );
        break;
      case 'about':
        newHistory.push({ 
          text: 'LEONIDA OS // SECTOR 06. Hardware accelerator active. Encryption standard AES-256 enabled.', 
          type: 'success' 
        });
        break;
      case 'network':
        newHistory.push(
          { text: 'PINGING IP 192.168.4.20...', type: 'system' },
          { text: 'CONNECTION SECURE. PACKETS TRANSMITTED SUCCESFULLY.', type: 'success' }
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({ 
          text: `COMMAND NOT RECOGNIZED: "${input}". Type 'help' for a layout of core system blocks.`, 
          type: 'error' 
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs md:text-sm">
      {/* Log Feed Display Container */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-4 pr-2">
        {history.map((log, index) => (
          <div 
            key={index} 
            className={`
              ${log.type === 'success' ? 'text-vice-pink' : ''}
              ${log.type === 'system' ? 'text-white/50' : ''}
              ${log.type === 'error' ? 'text-red-400 font-bold' : ''}
              ${log.type === 'input' ? 'text-vice-cyan' : ''}
            `}
          >
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Command Prompt Line */}
      <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-white/5 pt-3 bg-rockstar-card">
        <span className="text-vice-cyan font-bold animate-pulse">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter access code..."
          className="flex-1 bg-transparent text-white outline-none placeholder-white/20 uppercase"
          autoFocus
        />
      </form>
    </div>
  );
};