
import React from 'react';
import { Check, Zap, Rocket, Building2, Star } from 'lucide-react';

export const Subscription: React.FC = () => {
  const tiers = [
    {
      name: 'Basic',
      price: 'Free',
      desc: 'Perfect for casual sellers or owners.',
      icon: <Building2 className="text-slate-400" size={32} />,
      features: ['Up to 3 active listings', 'Standard quality images', 'Basic dashboard analytics', 'Community support'],
      cta: 'Current Plan',
      recommended: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/mo',
      desc: 'Ideal for professional real estate agents.',
      icon: <Zap className="text-blue-600" size={32} />,
      features: ['Up to 25 active listings', '4K Video Tours (TikTok style)', 'Priority Search Ranking', 'Lead Management Pipeline', 'AI Property Valuation (10/mo)'],
      cta: 'Upgrade to Pro',
      recommended: true,
    },
    {
      name: 'Business',
      price: '$99',
      period: '/mo',
      desc: 'Built for agencies and developers.',
      icon: <Rocket className="text-indigo-600" size={32} />,
      features: ['Unlimited listings', 'Unlimited Video Uploads', 'Verified Business Badge', 'Advanced Analytics & Reports', 'Premium Support 24/7', 'API Integrations'],
      cta: 'Go Enterprise',
      recommended: false,
    }
  ];

  return (
    <div className="space-y-12 pb-20 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Choose the tier that best suits your business needs. Upgrade or downgrade at any time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`relative p-8 rounded-[40px] flex flex-col h-full transition-all duration-300 ${
              tier.recommended 
              ? 'bg-slate-900 text-white shadow-2xl shadow-blue-200 scale-105 z-10' 
              : 'bg-white border border-slate-100 text-slate-800 shadow-sm hover:shadow-xl'
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                <Star size={12} fill="white" /> Recommended
              </div>
            )}
            
            <div className="mb-8">
              <div className={`p-4 inline-block rounded-2xl mb-6 ${tier.recommended ? 'bg-white/10' : 'bg-slate-50'}`}>
                {tier.icon}
              </div>
              <h3 className="text-2xl font-black mb-2">{tier.name}</h3>
              <p className={`text-sm ${tier.recommended ? 'text-slate-400' : 'text-slate-500'}`}>{tier.desc}</p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-black">{tier.price}</span>
              {tier.period && <span className={`text-lg font-bold ${tier.recommended ? 'text-slate-400' : 'text-slate-500'}`}>{tier.period}</span>}
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {tier.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-sm font-medium">
                  <div className={`mt-1 p-0.5 rounded-full ${tier.recommended ? 'bg-blue-600' : 'bg-blue-100'}`}>
                    <Check size={12} className={tier.recommended ? 'text-white' : 'text-blue-600'} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              tier.recommended 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20' 
              : tier.name === 'Basic' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'
            }`}>
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h4 className="text-xl font-black text-blue-900">Need a custom plan for your agency?</h4>
          <p className="text-sm text-blue-700">We offer specialized solutions for larger portfolios and developer networks.</p>
        </div>
        <button className="px-8 py-4 bg-blue-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-800">
          Talk to Sales
        </button>
      </div>
    </div>
  );
};
