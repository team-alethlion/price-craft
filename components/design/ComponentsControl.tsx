import React from 'react';
import { GlobalDesign } from '../../types';
import { CheckCircle, Square, Check } from 'lucide-react';

interface ComponentsControlProps {
  design: GlobalDesign;
  updateDesign: (design: Partial<GlobalDesign>) => void;
}

export const ComponentsControl: React.FC<ComponentsControlProps> = ({ design, updateDesign }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Components
      </h3>
      
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-2">Border Radius</label>
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {['none', 'md', 'xl', 'full'].map((radius) => (
            <button
              key={radius}
              onClick={() => updateDesign({ borderRadius: radius as any })}
              className={`flex-1 py-1.5 text-xs font-medium rounded capitalize ${
                design.borderRadius === radius ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {radius === 'none' ? '0' : radius}
            </button>
          ))}
        </div>
      </div>

      <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">Feature Icons</label>
          <div className="flex gap-2">
              <button
                  onClick={() => updateDesign({ iconStyle: 'circle' })}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 border rounded-md text-sm ${
                      design.iconStyle === 'circle' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'
                  }`}
                  title="Circle Filled"
              >
                  <CheckCircle size={16} className="fill-current" />
              </button>
              <button
                  onClick={() => updateDesign({ iconStyle: 'square' })}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 border rounded-md text-sm ${
                      design.iconStyle === 'square' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'
                  }`}
                  title="Square Filled"
              >
                  <Square size={16} className="fill-current" />
              </button>
              <button
                  onClick={() => updateDesign({ iconStyle: 'simple' })}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 border rounded-md text-sm ${
                      design.iconStyle === 'simple' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'
                  }`}
                  title="Simple Icon"
              >
                  <Check size={16} />
              </button>
          </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <label className="text-sm text-slate-700">Drop Shadow</label>
        <button
          onClick={() => updateDesign({ showShadow: !design.showShadow })}
          className={`w-11 h-6 flex items-center rounded-full transition-colors ${design.showShadow ? 'bg-blue-600' : 'bg-slate-200'}`}
        >
          <span className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ml-1 ${design.showShadow ? 'translate-x-5' : ''}`} />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <label className="text-sm text-slate-700">Layout</label>
        <div className="flex bg-slate-100 rounded-lg p-1">
           <button 
             onClick={() => updateDesign({ layout: 'flex' })}
             className={`px-3 py-1 text-xs rounded ${design.layout === 'flex' ? 'bg-white shadow' : ''}`}
           >
             Flex
           </button>
           <button 
             onClick={() => updateDesign({ layout: 'grid' })}
             className={`px-3 py-1 text-xs rounded ${design.layout === 'grid' ? 'bg-white shadow' : ''}`}
           >
             Grid
           </button>
        </div>
      </div>
    </section>
  );
};