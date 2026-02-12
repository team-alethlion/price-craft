import React from 'react';
import { Trash2 } from 'lucide-react';
import { PricingTier } from '../../types';
import { FeatureEditor } from './FeatureEditor';

interface TierFormProps {
  tier: PricingTier;
  canDelete: boolean;
  onUpdate: (tier: PricingTier) => void;
  onDelete: (id: string) => void;
}

export const TierForm: React.FC<TierFormProps> = ({ tier, canDelete, onUpdate, onDelete }) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-slate-900">Editing: {tier.title}</h3>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={tier.isPopular}
              onChange={(e) => onUpdate({ ...tier, isPopular: e.target.checked })}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Popular
          </label>
          {canDelete && (
            <button
              onClick={() => onDelete(tier.id)}
              className="text-red-400 hover:text-red-600 p-1"
              title="Delete Tier"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
          <input
            type="text"
            value={tier.title}
            onChange={(e) => onUpdate({ ...tier, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Button Text</label>
          <input
            type="text"
            value={tier.buttonText}
            onChange={(e) => onUpdate({ ...tier, buttonText: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Currency</label>
          <input
            type="text"
            value={tier.currency}
            onChange={(e) => onUpdate({ ...tier, currency: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Price</label>
          <input
            type="text"
            value={tier.price}
            onChange={(e) => onUpdate({ ...tier, price: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Period</label>
          <input
            type="text"
            value={tier.frequency}
            onChange={(e) => onUpdate({ ...tier, frequency: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
        <textarea
          value={tier.description}
          onChange={(e) => onUpdate({ ...tier, description: e.target.value })}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-20 resize-none"
        />
      </div>

      <FeatureEditor 
        features={tier.features} 
        onChange={(features) => onUpdate({ ...tier, features })} 
      />
    </div>
  );
};