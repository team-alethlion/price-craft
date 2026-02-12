import React from 'react';
import { GlobalDesign } from '../../types';

interface ColorsControlProps {
  design: GlobalDesign;
  updateDesign: (design: Partial<GlobalDesign>) => void;
}

export const ColorsControl: React.FC<ColorsControlProps> = ({ design, updateDesign }) => {
  return (
    <section className="space-y-4">
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
        Colors
      </h3>
      
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-2">Primary Accent</label>
        <div className="flex flex-wrap gap-2">
          {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#1e293b'].map(color => (
            <button
              key={color}
              onClick={() => updateDesign({ primaryColor: color })}
              className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${design.primaryColor === color ? 'border-slate-900 ring-1 ring-slate-300' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input 
            type="color" 
            value={design.primaryColor}
            onChange={(e) => updateDesign({ primaryColor: e.target.value })}
            className="w-6 h-6 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
          />
        </div>
      </div>

      <div>
          <label className="block text-xs font-medium text-slate-700 mb-2">Page Background</label>
          <div className="flex flex-wrap gap-2">
          {['#f8fafc', '#ffffff', '#f0f9ff', '#f5f3ff', '#fff1f2', '#1e293b'].map(color => (
              <button
              key={color}
              onClick={() => updateDesign({ backgroundColor: color })}
              className={`w-6 h-6 rounded border transition-transform hover:scale-110 ${design.backgroundColor === color ? 'border-slate-900' : 'border-slate-200'}`}
              style={{ backgroundColor: color }}
              />
          ))}
          </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Card Background</label>
              <div className="flex flex-wrap gap-2">
                  {['#ffffff', '#f8fafc', '#f1f5f9', '#1e293b', '#0f172a'].map(color => (
                      <button
                      key={color}
                      onClick={() => updateDesign({ cardBackgroundColor: color })}
                      className={`w-6 h-6 rounded border transition-transform hover:scale-110 ${design.cardBackgroundColor === color ? 'border-slate-900' : 'border-slate-200'}`}
                      style={{ backgroundColor: color }}
                      />
                  ))}
                  <input 
                      type="color" 
                      value={design.cardBackgroundColor}
                      onChange={(e) => updateDesign({ cardBackgroundColor: e.target.value })}
                      className="w-6 h-6 p-0 border-0 rounded overflow-hidden cursor-pointer"
                  />
              </div>
          </div>

          <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Text Color</label>
              <div className="flex flex-wrap gap-2">
                  {['#1e293b', '#334155', '#64748b', '#ffffff', '#f8fafc'].map(color => (
                      <button
                      key={color}
                      onClick={() => updateDesign({ textColor: color })}
                      className={`w-6 h-6 rounded border transition-transform hover:scale-110 ${design.textColor === color ? 'border-blue-500' : 'border-slate-200'}`}
                      style={{ backgroundColor: color }}
                      />
                  ))}
                  <input 
                      type="color" 
                      value={design.textColor}
                      onChange={(e) => updateDesign({ textColor: e.target.value })}
                      className="w-6 h-6 p-0 border-0 rounded overflow-hidden cursor-pointer"
                  />
              </div>
          </div>
      </div>
    </section>
  );
};