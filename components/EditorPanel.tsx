import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { AppState, GlobalDesign, PricingTier } from '../types';
import { Button } from './Button';
import { ContentEditor } from './ContentEditor';
import { DesignEditor } from './DesignEditor';

interface EditorPanelProps {
  state: AppState;
  updateTier: (tier: PricingTier) => void;
  deleteTier: (id: string) => void;
  addTier: () => void;
  updateDesign: (design: Partial<GlobalDesign>) => void;
  onOpenAI: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  state,
  updateTier,
  deleteTier,
  addTier,
  updateDesign,
  onOpenAI,
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

  return (
    <div className="w-96 bg-white border-r border-slate-200 flex flex-col h-full shadow-xl z-20">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <h1 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">P</span>
          PriceCraft
        </h1>
        <Button variant="ghost" size="sm" onClick={onOpenAI} icon={<Wand2 className="w-4 h-4" />}>
          AI Auto-Fill
        </Button>
      </div>

      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'content' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Content
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'design' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Design
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {activeTab === 'content' ? (
          <ContentEditor 
            tiers={state.tiers}
            updateTier={updateTier}
            deleteTier={deleteTier}
            addTier={addTier}
          />
        ) : (
          <DesignEditor 
            design={state.design}
            updateDesign={updateDesign}
          />
        )}
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs text-slate-400 text-center">
        Powered by React & Gemini
      </div>
    </div>
  );
};