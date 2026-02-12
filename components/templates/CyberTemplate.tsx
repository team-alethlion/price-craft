import React from 'react';
import { PricingTier, GlobalDesign } from '../../types';
import { TemplateFeatures } from './TemplateHelpers';

interface TemplateProps {
  tier: PricingTier;
  design: GlobalDesign;
  cardRadius: string;
}

export const CyberTemplate: React.FC<TemplateProps> = ({ tier, design, cardRadius }) => {
  const isPopular = tier.isPopular;

  // Cyber always enforces a dark theme for the card, but uses the user's primary color for accents
  const darkBg = '#0f172a'; // Slate 900
  const glowColor = design.primaryColor;

  return (
    <div 
      className={`relative flex flex-col p-8 transition-all duration-300 ${cardRadius} h-full`}
      style={{
        backgroundColor: darkBg,
        color: '#f8fafc',
        fontFamily: design.fontFamily,
        border: `1px solid ${isPopular ? glowColor : 'rgba(255,255,255,0.1)'}`,
        boxShadow: isPopular ? `0 0 20px ${glowColor}40` : 'none',
        transform: isPopular ? 'scale(1.02)' : 'none',
      }}
    >
      {isPopular && (
        <div 
            className="absolute top-0 inset-x-0 h-1"
            style={{ 
                background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
                boxShadow: `0 0 10px ${glowColor}`
            }}
        />
      )}

      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold tracking-wide uppercase" style={{ fontSize: `${design.fontSizes.title}px` }}>
              {tier.title}
            </h3>
            {isPopular && <span className="text-xs px-2 py-1 rounded bg-white/10 text-white font-mono">POPULAR</span>}
        </div>
        <div className="flex items-baseline mb-2">
          <span className="font-black tracking-tight self-start mr-1" style={{ textShadow: `0 0 20px ${glowColor}60`, fontSize: `${design.fontSizes.currency}px` }}>
             {tier.currency}
          </span>
          <span className="font-black tracking-tight leading-none" style={{ textShadow: `0 0 20px ${glowColor}60`, fontSize: `${design.fontSizes.price}px` }}>
            {tier.price}
          </span>
          <span className="ml-1 opacity-50 font-mono" style={{ fontSize: `${design.fontSizes.frequency}px` }}>
            {tier.frequency}
          </span>
        </div>
        <p className="text-slate-400 min-h-[40px] leading-relaxed" style={{ fontSize: `${design.fontSizes.description}px` }}>
          {tier.description}
        </p>
      </div>

      {/* Cyber uses lightMode=true to force white text on features */}
      <TemplateFeatures tier={tier} design={design} lightMode={true} />

      <div className="mt-auto">
        <a 
          href={tier.buttonUrl}
          className={`w-full block text-center py-3 px-6 rounded font-bold uppercase tracking-wider transition-all hover:brightness-110 active:scale-[0.98]`}
          style={{
            backgroundColor: isPopular ? glowColor : 'transparent',
            color: isPopular ? '#ffffff' : glowColor,
            border: `1px solid ${glowColor}`,
            boxShadow: isPopular ? `0 0 15px ${glowColor}60` : 'none',
            fontSize: `${design.fontSizes.button}px`
          }}
        >
          {tier.buttonText}
        </a>
      </div>
    </div>
  );
};