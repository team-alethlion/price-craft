import React, { useState } from 'react';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { generatePricingData } from '../services/geminiService';
import { PricingTier } from '../types';

interface AIGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (tiers: PricingTier[]) => void;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ isOpen, onClose, onApply }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const tiers = await generatePricingData(prompt);
      if (tiers.length > 0) {
        onApply(tiers);
        onClose();
        setPrompt(''); // clear prompt on success
      } else {
        setError("AI returned no results. Try a more specific prompt.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              AI Generator
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Describe your business or product, and we'll generate optimized pricing tiers for you.
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What are you pricing?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A SaaS platform for dog walkers, or a local gym membership..."
            className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 text-slate-900 placeholder-slate-400"
            autoFocus
          />

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleGenerate} 
              isLoading={isLoading}
              disabled={!prompt.trim()}
              icon={<Sparkles size={16} />}
            >
              Generate Tiers
            </Button>
          </div>
        </div>
        
        <div className="bg-slate-50 px-6 py-3 text-xs text-slate-500 border-t border-slate-100">
          Tip: Be specific about your target audience for better results.
        </div>
      </div>
    </div>
  );
};