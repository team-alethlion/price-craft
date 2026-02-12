import React from 'react';
import { Check, X } from 'lucide-react';
import { PricingTier, GlobalDesign } from '../../types';

interface TemplateFeaturesProps {
  tier: PricingTier;
  design: GlobalDesign;
  centered?: boolean;
  lightMode?: boolean; // For dark backgrounds
}

export const TemplateFeatures: React.FC<TemplateFeaturesProps> = ({ tier, design, centered = false, lightMode = false }) => {
  const isPopular = tier.isPopular;

  const getFeatureIconStyle = (included: boolean) => {
    const iconStyle = design.iconStyle || 'circle';
    
    // Logic to determine colors based on context (lightMode implies dark background)
    const baseTextColor = lightMode ? 'text-white' : 'text-slate-500';
    const activeColor = design.primaryColor;
    const inactiveColor = lightMode ? 'rgba(255,255,255,0.2)' : '#cbd5e1';

    if (iconStyle === 'simple') {
      return {
        container: `flex-shrink-0 w-5 h-5 flex items-center justify-center mr-3`,
        // Adjust icon vertical alignment based on font size slightly
        style: {
          color: included ? activeColor : inactiveColor,
        }
      };
    }

    const shapeClass = iconStyle === 'circle' ? 'rounded-full' : 'rounded-md';
    return {
      container: `flex-shrink-0 w-5 h-5 ${shapeClass} flex items-center justify-center mr-3`,
      style: {
        backgroundColor: included ? activeColor : 'transparent',
        color: included ? '#ffffff' : inactiveColor,
        border: !included ? `1px solid ${inactiveColor}` : 'none'
      }
    };
  };

  return (
    <div className={`space-y-4 mb-8 flex-grow ${centered ? 'flex flex-col items-center' : ''}`}>
      {tier.features.map((feature, idx) => {
        const iconConfig = getFeatureIconStyle(feature.included);
        return (
          <div key={idx} className={`flex items-start group ${centered ? 'text-center' : ''}`}>
            <div 
              className={iconConfig.container}
              style={{...iconConfig.style, marginTop: '0.15em'}} // Relative margin for icon
            >
              {feature.included ? <Check size={12} strokeWidth={3} /> : <X size={12} />}
            </div>
            <span 
              className={`leading-relaxed ${feature.included ? '' : 'opacity-50 line-through'}`}
              style={{ fontSize: `${design.fontSizes.features}px` }}
            >
              {feature.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const TemplateButton: React.FC<{ tier: PricingTier; design: GlobalDesign; variant?: 'solid' | 'outline' | 'ghost' }> = ({ tier, design, variant = 'solid' }) => {
  const style: React.CSSProperties = {
    fontSize: `${design.fontSizes.button}px`,
    ...(variant === 'solid' ? {
      backgroundColor: design.primaryColor,
      color: '#ffffff'
    } : {
      backgroundColor: 'transparent',
      color: design.primaryColor,
      border: `1px solid ${design.primaryColor}`
    })
  };

  return (
    <a 
      href={tier.buttonUrl}
      className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-[0.98]`}
      style={style}
    >
      {tier.buttonText}
    </a>
  );
};