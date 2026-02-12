import React, { useState } from 'react';
import { GlobalDesign, ElementFontSizes } from '../../types';
import { ChevronDown, Type } from 'lucide-react';

interface TypographyControlProps {
  design: GlobalDesign;
  updateDesign: (design: Partial<GlobalDesign>) => void;
}

const fonts = [
    { name: 'Inter', font: 'Inter' },
    { name: 'Poppins', font: 'Poppins' },
    { name: 'Roboto', font: 'Roboto' },
    { name: 'Playfair Display', font: 'Playfair Display' },
];

const fontSizeElements: { id: keyof ElementFontSizes; label: string }[] = [
  { id: 'title', label: 'Card Title' },
  { id: 'price', label: 'Price Value' },
  { id: 'currency', label: 'Currency Symbol' },
  { id: 'frequency', label: 'Billing Period' },
  { id: 'description', label: 'Description' },
  { id: 'features', label: 'Features List' },
  { id: 'button', label: 'Button Text' },
];

export const TypographyControl: React.FC<TypographyControlProps> = ({ design, updateDesign }) => {
  const [activeElement, setActiveElement] = useState<keyof ElementFontSizes>('title');

  const handleFontSizeChange = (size: number) => {
    updateDesign({
      fontSizes: {
        ...design.fontSizes,
        [activeElement]: size
      }
    });
  };

  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        Typography
      </h3>
      <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">Font Family</label>
          <div className="relative">
            <select
                value={design.fontFamily}
                onChange={(e) => updateDesign({ fontFamily: e.target.value })}
                className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer pr-10"
                style={{ fontFamily: design.fontFamily }}
            >
                {fonts.map((f) => (
                    <option key={f.name} value={f.font} style={{ fontFamily: f.font }}>
                        {f.name}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <ChevronDown size={16} />
            </div>
          </div>
      </div>

      <div className="pt-2">
        <label className="block text-xs font-medium text-slate-700 mb-2">Element Sizing</label>
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
             <select
                value={activeElement}
                onChange={(e) => setActiveElement(e.target.value as keyof ElementFontSizes)}
                className="w-full appearance-none px-3 py-2 bg-white border border-slate-200 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer pr-8"
            >
                {fontSizeElements.map((el) => (
                    <option key={el.id} value={el.id}>
                        {el.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-500">
                <Type size={14} />
            </div>
          </div>
          <div className="w-20 flex items-center border border-slate-200 rounded-md px-2 bg-white">
            <input 
              type="number" 
              value={design.fontSizes[activeElement]}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value) || 12)}
              className="w-full text-sm outline-none text-center"
            />
            <span className="text-xs text-slate-400">px</span>
          </div>
        </div>
        
        <input
          type="range"
          min="10"
          max="80"
          value={design.fontSizes[activeElement]}
          onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </section>
  );
};