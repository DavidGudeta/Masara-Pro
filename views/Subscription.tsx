
import React, { useState } from 'react';
import { 
  Check, Zap, Rocket, Building2, Star, CreditCard, Lock, 
  ChevronRight, Calendar, ArrowLeft, ShieldCheck, Landmark, 
  Plus, History, DollarSign, Download, CheckCircle2,
  FileText, Upload, AlertCircle, Shield, ArrowUpRight,
  TrendingUp, Wallet, Receipt
} from 'lucide-react';
import { MOCK_DIRECTORY_DOCS } from '../constants';
import { DocumentType, VerificationStatus } from '../types';

type SubscriptionTab = 'PLANS' | 'BILLING' | 'VERIFICATION';

// Move GavelIcon declaration before its usage in CATEGORIES to resolve the reference error
const GavelIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0-.83-.83-.83-2.17 0-3L11 10" />
    <path d="m16 16 6-6" />
    <path d="m8 8 8 8" />
    <path d="m9 9 5-5" />
    <path d="m16 4 5 5" />
    <path d="m11 11 6 6" />
  </svg>
);

const CATEGORIES: { type: DocumentType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: 'BUSINESS_LICENSE', label: 'Business Licenses', icon: <Landmark size={18} />, desc: 'Trade permits and registration documents.' },
  { type: 'PROPERTY_OWNERSHIP', label: 'Property Ownership', icon: <FileText size={18} />, desc: 'Verified title deeds and lease agreements.' },
  { type: 'AGENT_VERIFY', label: 'Agent Verify', icon: <CheckCircle2 size={18} />, desc: 'Identity verification and credentials.' },
  { type: 'TAX_COMPLIANCE', label: 'Tax Compliance', icon: <Receipt size={18} />, desc: 'Valid tax clearance certificates.' },
  { type: 'ADDRESS_PROOF', label: 'Address Proof', icon: <Building2 size={18} />, desc: 'Utility bills or office verification.' },
  { type: 'BACKGROUND_CHECK', label: 'Risk Profile', icon: <Shield size={18} />, desc: 'Credit scores and risk reports.' },
  { type: 'LEGAL_MATTERS', label: 'Legal Clear', icon: <GavelIcon />, desc: 'Litigation history and standing.' },
];

export const Subscription: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubscriptionTab>('PLANS');
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      desc: 'Perfect for casual sellers or owners.',
      icon: <Building2 className="text-slate-400" size={32} />,
      features: ['Up to 3 active listings', 'Standard quality images', 'Basic dashboard analytics', 'Community support'],
      cta: 'Current Plan',
      recommended: false,
    },
    {
      id: 'pro',
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
      id: 'business',
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

  const trustScore = Math.round((MOCK_DIRECTORY_DOCS.filter(d => d.status === 'VERIFIED').length / 7) * 100);

  const getStatusColor = (status: VerificationStatus) => {
    switch(status) {
      case 'VERIFIED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-10 animate-fadeIn">
      {/* Header & Main Navigation */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Business Center</h1>
          <p className="text-slate-500 font-medium max-w-xl">Manage your subscription, billing history, and platform verification status.</p>
        </div>

        <div className="flex bg-white p-1.5 rounded-[28px] shadow-xl border border-slate-100">
          {(['PLANS', 'BILLING', 'VERIFICATION'] as SubscriptionTab[]).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900'}`}
            >
              {tab === 'PLANS' ? 'Membership' : tab === 'BILLING' ? 'Billing & Payouts' : 'Verification'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Rendering */}
      {activeTab === 'PLANS' && (
        <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <div 
                key={i} 
                className={`relative p-8 rounded-[48px] flex flex-col h-full transition-all duration-300 ${
                  tier.recommended 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-blue-200 scale-105 z-10' 
                  : 'bg-white border border-slate-100 text-slate-800 shadow-sm hover:shadow-xl'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                    <Star size={12} fill="white" /> Recommended
                  </div>
                )}
                
                <div className="mb-8">
                  <div className={`p-4 inline-block rounded-3xl mb-6 ${tier.recommended ? 'bg-white/10' : 'bg-slate-50'}`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-2">{tier.name}</h3>
                  <p className={`text-sm font-medium ${tier.recommended ? 'text-slate-400' : 'text-slate-500'}`}>{tier.desc}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-black">{tier.price}</span>
                  {tier.period && <span className={`text-lg font-bold ${tier.recommended ? 'text-slate-400' : 'text-slate-500'}`}>{tier.period}</span>}
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-bold">
                      <div className={`mt-1 p-0.5 rounded-full shrink-0 ${tier.recommended ? 'bg-blue-600' : 'bg-blue-100'}`}>
                        <Check size={12} className={tier.recommended ? 'text-white' : 'text-blue-600'} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  disabled={tier.id === 'basic'}
                  className={`w-full py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${
                  tier.recommended 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl' 
                  : tier.id === 'basic' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'BILLING' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in slide-in-from-right-4 duration-500">
          <div className="lg:col-span-2 space-y-10">
            {/* Payment Method */}
            <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <CreditCard className="text-blue-600" /> Payment Methods
                </h3>
                <button className="px-5 py-2 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 border border-slate-100 transition-all flex items-center gap-2">
                   <Plus size={14} /> Add New
                </button>
              </div>
              <div className="p-6 bg-slate-900 rounded-[32px] text-white flex items-center justify-between relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                 <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-10 bg-white/10 rounded-xl border border-white/10 flex items-center justify-center font-black">VISA</div>
                    <div>
                       <p className="text-sm font-black">•••• •••• •••• 4242</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expires 12/26 • Primary Card</p>
                    </div>
                 </div>
                 <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all relative z-10 text-[10px] font-black uppercase tracking-widest px-6">Edit</button>
              </div>
            </section>

            {/* Payout Information */}
            <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                 <Wallet className="text-blue-600" /> Payout Settings
              </h3>
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                 <div className="flex items-center gap-5">
                    <div className="p-4 bg-white rounded-2xl text-blue-600 shadow-sm"><Landmark size={24} /></div>
                    <div>
                       <p className="text-sm font-black text-slate-800">Commercial Bank of Ethiopia</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acct: ••••••5678</p>
                    </div>
                 </div>
                 <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-lg">Verified Account</span>
              </div>
            </section>

            {/* Billing History */}
            <section className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50">
                  <h3 className="text-xl font-black text-slate-900">Billing History</h3>
               </div>
               <table className="w-full text-left">
                  <thead className="bg-slate-50/50">
                     <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice ID</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Download</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {[
                       { id: 'INV-9421', date: 'Oct 01, 2023', amount: '$29.00' },
                       { id: 'INV-8832', date: 'Sep 01, 2023', amount: '$29.00' },
                       { id: 'INV-7210', date: 'Aug 01, 2023', amount: '$29.00' },
                     ].map(inv => (
                       <tr key={inv.id} className="hover:bg-slate-50/30 transition-colors">
                          <td className="px-8 py-6 font-black text-slate-800 text-sm">{inv.id}</td>
                          <td className="px-8 py-6 text-sm font-bold text-slate-400">{inv.date}</td>
                          <td className="px-8 py-6 font-black text-slate-800">{inv.amount}</td>
                          <td className="px-8 py-6 text-right">
                             <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Download size={18} /></button>
                          </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </section>
          </div>

          <div className="space-y-8">
             <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full"></div>
                <h3 className="text-xl font-black relative z-10">Financial Overview</h3>
                <div className="space-y-6 relative z-10">
                   <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Total Earned</p>
                      <p className="text-3xl font-black">$12,420.00</p>
                   </div>
                   <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase">Available</p>
                         <p className="text-lg font-black text-emerald-400">$840.00</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase">Processing</p>
                         <p className="text-lg font-black text-blue-400">$220.00</p>
                      </div>
                   </div>
                   <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">Withdraw Funds</button>
                </div>
             </div>
             
             <div className="p-8 bg-blue-50 rounded-[40px] border border-blue-100 space-y-4">
                <h4 className="text-sm font-black text-blue-900 flex items-center gap-2">
                   <TrendingUp size={16} /> Market Insight
                </h4>
                <p className="text-xs text-blue-700/80 font-medium leading-relaxed italic">
                   Your current "Pro" subscription typicaly delivers <span className="font-bold">2.4x more high-intent leads</span> than free tiers in the Addis Ababa sector.
                </p>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'VERIFICATION' && (
        <div className="space-y-12 animate-in slide-in-from-left-4 duration-500">
           {/* Trust Score Header */}
           <div className="bg-slate-900 p-12 rounded-[60px] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>
              <div className="space-y-4 max-w-xl text-center lg:text-left relative z-10">
                 <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    <ShieldCheck size={14} /> Trust Compliance
                 </div>
                 <h2 className="text-5xl font-black tracking-tight leading-none">Your Identity Trust Score</h2>
                 <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                    Properties listed by fully verified agencies receive <span className="text-blue-400">3x more leads</span> and higher search rankings automatically.
                 </p>
              </div>
              <div className="flex gap-6 relative z-10 scale-110">
                 <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 text-center min-w-[160px] shadow-2xl">
                    <p className="text-6xl font-black text-blue-400">{trustScore}%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Overall Score</p>
                 </div>
                 <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 text-center min-w-[160px] shadow-2xl">
                    <p className="text-6xl font-black">5/7</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">Verified Pillars</p>
                 </div>
              </div>
           </div>

           {/* Verification Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat, i) => {
                const doc = MOCK_DIRECTORY_DOCS.find(d => d.type === cat.type);
                const status = doc?.status || 'MISSING';
                
                return (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className={`p-4 rounded-2xl ${status === 'VERIFIED' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'} transition-all`}>
                          {cat.icon}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">{cat.label}</h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{cat.desc}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-50 space-y-3">
                       {status === 'VERIFIED' ? (
                         <div className="flex items-center justify-between px-2">
                            <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1.5"><CheckCircle2 size={14} /> Verified Oct 2023</span>
                            <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase">View</button>
                         </div>
                       ) : (
                         <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2">
                           <Upload size={14} /> Upload Documents
                         </button>
                       )}
                    </div>
                  </div>
                );
              })}
           </div>

           <div className="p-8 bg-amber-50 border border-amber-100 rounded-[40px] flex items-start gap-4">
              <AlertCircle className="text-amber-600 shrink-0 mt-1" size={24} />
              <div className="space-y-1">
                 <h4 className="text-lg font-black text-amber-900">Improve your trust score</h4>
                 <p className="text-sm text-amber-800 font-medium italic">Your "Legal Matters" and "Address Proof" are currently missing. Uploading these documents typically results in 42% higher buyer engagement scores.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
