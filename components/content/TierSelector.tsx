import React from 'react';
import { Plus } from 'lucide-react';
import { PricingTier } from '../../types';

interface TierSelectorProps {
  tiers: PricingTier[];
  activeTierId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export const TierSelector: React.FC<TierSelectorProps> = ({ tiers, activeTierId, onSelect, onAdd }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Select Tier</label>
      <div className="flex flex-wrap gap-2">
        {tiers.map(tier => (
          <button
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
              (activeTierId === tier.id)
                ? 'bg-blue-50 border-blue-200 text-blue-700 ring-1 ring-blue-500'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {tier.title}
          </button>
        ))}
        <button
          onClick={onAdd}
          className="px-2 py-1.5 rounded-full text-sm border border-dashed border-slate-300 text-slate-400 hover:text-blue-600 hover:border-blue-400"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};