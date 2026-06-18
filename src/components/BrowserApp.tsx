import { RefreshCw, Lock } from 'lucide-react';

export const BrowserApp = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gray-100 p-2 flex items-center gap-2 border-b">
        <Lock size={12} className="text-gray-500" />
        <div className="flex-1 bg-white px-2 py-1 border rounded text-[10px] text-gray-600">
          https://cyber-net-simulator.vercel.app
        </div>
        <RefreshCw size={14} className="text-gray-400 cursor-pointer" />
      </div>
      <iframe src="https://cyber-net-simulator.vercel.app/" className="w-full flex-1" title="Cyber Net" />
    </div>
  );
};