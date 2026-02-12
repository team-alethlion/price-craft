import React, { useState, useEffect } from 'react';
import { PricingTier } from '../types';
import { TierSelector } from './content/TierSelector';
import { TierForm } from './content/TierForm';

interface ContentEditorProps {
  tiers: PricingTier[];
  updateTier: (tier: PricingTier) => void;
  deleteTier: (id: string) => void;
  addTier: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  tiers,
  updateTier,
  deleteTier,
  addTier,
}) => {
  const [editingTierId, setEditingTierId] = useState<string | null>(null);
  
  // Default to the first tier if no specific tier is selected or if the selected tier was deleted
  const activeTier = tiers.find(t => t.id === editingTierId) || tiers[0];
  
  // Ensure we keep the selection valid if the underlying list changes (e.g. deletion)
  useEffect(() => {
    if (activeTier && activeTier.id !== editingTierId) {
        setEditingTierId(activeTier.id);
    }
  }, [activeTier, editingTierId]);

  return (
    <div className="space-y-6">
      <TierSelector 
        tiers={tiers}
        activeTierId={activeTier?.id || null}
        onSelect={setEditingTierId}
        onAdd={addTier}
      />

      {activeTier && (
        <TierForm 
          tier={activeTier}
          canDelete={tiers.length > 1}
          onUpdate={updateTier}
          onDelete={deleteTier}
        />
      )}
    </div>
  );
};