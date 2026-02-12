import React from 'react';
import { Monitor, Download } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onExport: () => void;
  isExporting: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onExport, isExporting }) => {
  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-sm">
      <div className="flex items-center text-sm text-slate-500 gap-2">
        <Monitor size={16} />
        <span>Live Preview</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="primary" 
          onClick={onExport} 
          isLoading={isExporting}
          icon={<Download size={16} />}
        >
          Export PDF
        </Button>
      </div>
    </div>
  );
};