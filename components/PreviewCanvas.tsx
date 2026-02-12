import React, { forwardRef } from 'react';
import { AppState } from '../types';
import { PricingCard } from './PricingCard';

interface PreviewCanvasProps {
  state: AppState;
}

export const PreviewCanvas = forwardRef<HTMLDivElement, PreviewCanvasProps>(({ state }, ref) => {
  return (
    <div className="flex-1 overflow-auto bg-slate-200/50 p-8 flex items-center justify-center">
      {/* The Wrapper ID is critical for html2canvas */}
      <div 
        id="preview-container" 
        ref={ref}
        className="p-12 min-w-min min-h-min transition-colors duration-500 ease-in-out shadow-2xl rounded-xl"
        style={{ backgroundColor: state.design.backgroundColor }}
      >
        <div 
          className={`flex gap-6 items-stretch ${
            state.design.layout === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'flex-col md:flex-row flex-wrap justify-center'
          }`}
        >
          {state.tiers.map(tier => (
            <div key={tier.id} className="w-full md:w-80 shrink-0">
              <PricingCard tier={tier} design={state.design} />
            </div>
          ))}
        </div>
        
        {/* Optional footer credit in PDF/Preview */}
        <div className="mt-12 text-center text-sm opacity-50 font-medium" style={{ color: state.design.textColor }}>
            Generated with PriceCraft
        </div>
      </div>
    </div>
  );
});

PreviewCanvas.displayName = 'PreviewCanvas';