export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  title: string;
  price: string;
  currency: string;
  frequency: string;
  description: string;
  features: PricingFeature[];
  isPopular: boolean;
  buttonText: string;
  buttonUrl: string;
  accentColor?: string; // Optional override per card
}

export interface GlobalDesign {
  template: 'standard' | 'solid' | 'centered' | 'cyber' | 'brutalist' | 'minimalist';
  fontFamily: string;
  primaryColor: string;
  backgroundColor: string;
  cardBackgroundColor: string;
  textColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  showShadow: boolean;
  layout: 'grid' | 'flex';
  iconStyle: 'circle' | 'square' | 'simple';
}

export interface AppState {
  tiers: PricingTier[];
  design: GlobalDesign;
}

export const INITIAL_TIERS: PricingTier[] = [
  {
    id: '1',
    title: 'Starter',
    price: '0',
    currency: '$',
    frequency: '/month',
    description: 'Perfect for individuals and hobbyists.',
    features: [
      { text: '1 User', included: true },
      { text: '5 Projects', included: true },
      { text: 'Community Support', included: true },
      { text: 'Advanced Analytics', included: false },
    ],
    isPopular: false,
    buttonText: 'Start for Free',
    buttonUrl: '#',
  },
  {
    id: '2',
    title: 'Pro',
    price: '29',
    currency: '$',
    frequency: '/month',
    description: 'For growing teams and professionals.',
    features: [
      { text: '5 Users', included: true },
      { text: 'Unlimited Projects', included: true },
      { text: 'Priority Support', included: true },
      { text: 'Advanced Analytics', included: true },
    ],
    isPopular: true,
    buttonText: 'Get Started',
    buttonUrl: '#',
  },
  {
    id: '3',
    title: 'Enterprise',
    price: '99',
    currency: '$',
    frequency: '/month',
    description: 'For large organizations with custom needs.',
    features: [
      { text: 'Unlimited Users', included: true },
      { text: 'Unlimited Projects', included: true },
      { text: '24/7 Dedicated Support', included: true },
      { text: 'Custom Integrations', included: true },
    ],
    isPopular: false,
    buttonText: 'Contact Sales',
    buttonUrl: '#',
  },
];

export const INITIAL_DESIGN: GlobalDesign = {
  template: 'standard',
  fontFamily: 'Inter',
  primaryColor: '#3b82f6',
  backgroundColor: '#f8fafc',
  cardBackgroundColor: '#ffffff',
  textColor: '#1e293b',
  borderRadius: 'xl',
  showShadow: true,
  layout: 'grid',
  iconStyle: 'circle',
};
