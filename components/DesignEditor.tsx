import React from 'react';
import { GlobalDesign } from '../types';
import { ColorsControl } from './design/ColorsControl';
import { TypographyControl } from './design/TypographyControl';
import { ComponentsControl } from './design/ComponentsControl';

interface DesignEditorProps {
  design: GlobalDesign;
  updateDesign: (design: Partial<GlobalDesign>) => void;
}

export const DesignEditor: React.FC<DesignEditorProps> = ({ design, updateDesign }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 pb-8">
      <ColorsControl design={design} updateDesign={updateDesign} />
      
      <hr className="border-slate-100" />
      
      <TypographyControl design={design} updateDesign={updateDesign} />
      
      <hr className="border-slate-100" />
      
      <ComponentsControl design={design} updateDesign={updateDesign} />
    </div>
  );
};