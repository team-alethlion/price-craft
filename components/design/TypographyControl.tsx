import React from 'react';
import { GlobalDesign } from '../../types';

interface TypographyControlProps {
  design: GlobalDesign;
  updateDesign: (design: Partial<GlobalDesign>) => void;
}

export const TypographyControl: React.FC<TypographyControlProps> = ({ design, updateDesign }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        Typography
      </h3>
      <div>
          <div className="space-y-2">
              {[
                  { name: 'Inter', font: 'Inter' },
                  { name: 'Poppins', font: 'Poppins' },
                  { name: 'Roboto', font: 'Roboto' },
                  { name: 'Playfair', font: 'Playfair Display' },
              ].map((f) => (
                  <button
                      key={f.name}
                      onClick={() => updateDesign({ fontFamily: f.font })}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all border ${
                          design.fontFamily === f.font 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                      style={{ fontFamily: f.font }}
                  >
                      {f.name}
                  </button>
              ))}
          </div>
      </div>
    </section>
  );
};