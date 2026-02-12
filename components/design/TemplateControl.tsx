import React from 'react';
import { GlobalDesign } from '../../types';
import { LayoutTemplate, CreditCard, AlignCenter, Cpu, Box, Minus } from 'lucide-react';

interface TemplateControlProps {
  design: GlobalDesign;
  updateDesign: (design: Partial<GlobalDesign>) => void;
}

export const TemplateControl: React.FC<TemplateControlProps> = ({ design, updateDesign }) => {
  const templates: { id: GlobalDesign['template']; name: string; icon: React.ReactNode }[] = [
    { id: 'standard', name: 'Standard', icon: <LayoutTemplate size={16} /> },
    { id: 'solid', name: 'Solid', icon: <CreditCard size={16} /> },
    { id: 'centered', name: 'Centered', icon: <AlignCenter size={16} /> },
    { id: 'cyber', name: 'Cyber', icon: <Cpu size={16} /> },
    { id: 'brutalist', name: 'Brutal', icon: <Box size={16} /> },
    { id: 'minimalist', name: 'Minimal', icon: <Minus size={16} /> },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
        Template
      </h3>
      
      <div className="grid grid-cols-3 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => updateDesign({ template: template.id })}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
              design.template === template.id
                ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="mb-2 opacity-80">{template.icon}</div>
            <span className="text-xs font-medium">{template.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};