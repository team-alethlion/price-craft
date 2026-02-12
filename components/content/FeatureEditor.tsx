import React from 'react';
import { Check, X, Plus } from 'lucide-react';
import { PricingFeature } from '../../types';
import { Button } from '../Button';

interface FeatureEditorProps {
  features: PricingFeature[];
  onChange: (features: PricingFeature[]) => void;
}

export const FeatureEditor: React.FC<FeatureEditorProps> = ({ features, onChange }) => {
  const updateFeature = (index: number, updates: Partial<PricingFeature>) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], ...updates };
    onChange(newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    onChange(newFeatures);
  };

  const addFeature = () => {
    onChange([...features, { text: 'New Feature', included: true }]);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-slate-700">Features</label>
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <button
            onClick={() => updateFeature(idx, { included: !feature.included })}
            className={`p-1.5 rounded transition-colors ${feature.included ? 'text-green-600 bg-green-50' : 'text-slate-400 bg-slate-100'}`}
          >
            <Check size={14} />
          </button>
          <input
            type="text"
            value={feature.text}
            onChange={(e) => updateFeature(idx, { text: e.target.value })}
            className="flex-1 px-2 py-1.5 bg-slate-50 border border-slate-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={() => removeFeature(idx)}
            className="text-slate-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <Button
        variant="secondary"
        size="sm"
        className="w-full mt-2"
        onClick={addFeature}
      >
        <Plus size={14} className="mr-1" /> Add Feature
      </Button>
    </div>
  );
};