
import React, { useState } from 'react';
import { 
  Check, Zap, Rocket, Building2, Star, CreditCard, Lock, 
  ChevronRight, Calendar, ArrowLeft, ShieldCheck, Landmark, 
  Plus, History, DollarSign, Download, CheckCircle2
} from 'lucide-react';

type SubscriptionStep = 'TIERS' | 'BILLING' | 'HISTORY';

export const Subscription: React.FC = () => {
  const [step, setStep] = useState<SubscriptionStep>('TIERS');
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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

  const handleUpgrade = (tier: any) => {
    if (tier.id === 'basic') return;
    setSelectedTier(tier);
    setStep('BILLING');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      setStep('HISTORY');
      setPaymentSuccess(false);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="h-[70vh] flex items-center justify-center animate-fadeIn">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Payment Verified!</h2>
          <p className="text-slate-500 font-medium italic">Your account is being upgraded to <span className="text-blue-600 font-bold">{selectedTier?.name}</span> status.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-12 animate-fadeIn">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          {step !== 'TIERS' && (
             <button 
              onClick={() => setStep('TIERS')}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors mb-4"
             >
               <ArrowLeft size={14} /> Back to plans
             </button>
          )}
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {step === 'TIERS' ? 'Subscription Plans' : step === 'BILLING' ? 'Billing & Payment' : 'Transaction History'}
          </h1>
          <p className="text-slate-500 font-medium max-w-xl">
            {step === 'TIERS' ? 'Elevate your real estate business with our premium toolset and higher visibility.' : 
             step === 'BILLING' ? `Complete your upgrade to the ${selectedTier?.name} plan.` : 
             'Manage your past invoices and billing cycle.'}
          </p>
        </div>

        <div className="flex bg-white p-1.5 rounded-[24px] shadow-lg border border-slate-100">
          <button 
            onClick={() => setStep('TIERS')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${step === 'TIERS' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400'}`}
          >
            Plans
          </button>
          <button 
            onClick={() => setStep('HISTORY')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${step === 'HISTORY' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400'}`}
          >
            Invoices
          </button>
        </div>
      </div>

      {step === 'TIERS' && (
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
                  onClick={() => handleUpgrade(tier)}
                  className={`w-full py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${
                  tier.recommended 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20' 
                  : tier.id === 'basic' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-blue-600'
                }`}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-12 rounded-[60px] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full"></div>
            <div className="space-y-3 relative z-10">
              <h4 className="text-2xl font-black text-blue-900 tracking-tight">Enterprise Network for Developers</h4>
              <p className="text-sm text-blue-700/80 font-medium italic max-w-xl">Scale your multi-unit developments across Ethiopia with dedicated account management and custom API integration tiers.</p>
            </div>
            <button className="px-12 py-5 bg-blue-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-800 shadow-xl shadow-blue-200 transition-all relative z-10 shrink-0">
              Talk to Sales
            </button>
          </div>
        </div>
      )}

      {step === 'BILLING' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-slideInRight">
           {/* Payment Form */}
           <form onSubmit={handlePayment} className="bg-white p-10 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl space-y-10">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                  <CreditCard className="text-blue-600" /> Secure Checkout
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cardholder Name</label>
                    <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                    <div className="relative group">
                       <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" size={20} />
                       <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition-all" placeholder="•••• •••• •••• ••••" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                      <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="MM / YY" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVC / CVV</label>
                      <input required type="password" maxLength={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" placeholder="•••" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                   <Landmark className="text-blue-600" /> Billing Address
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Region / City</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold">
                       <option>Addis Ababa, Ethiopia</option>
                       <option>Nairobi, Kenya</option>
                       <option>Global (USD Settlement)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-400">
                  <Lock size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted Checkout</span>
                </div>
                <button type="submit" className="px-12 py-5 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all text-xs uppercase tracking-widest">
                  Pay {selectedTier?.price} Now
                </button>
              </div>
           </form>

           {/* Order Summary Sidebar */}
           <div className="space-y-8">
              <div className="bg-slate-900 p-10 rounded-[48px] text-white space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full"></div>
                <h3 className="text-xl font-black relative z-10">Upgrade Summary</h3>
                
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl">{selectedTier?.icon}</div>
                      <div>
                         <p className="font-black">{selectedTier?.name} Membership</p>
                         <p className="text-xs text-slate-400 font-medium">Billed monthly • Cancel anytime</p>
                      </div>
                   </div>
                   
                   <div className="space-y-3 pt-6 border-t border-white/5">
                      <div className="flex justify-between text-sm font-bold text-slate-400">
                         <span>Subtotal</span>
                         <span className="text-white">{selectedTier?.price}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-slate-400">
                         <span>Platform Fee</span>
                         <span className="text-white">$0.00</span>
                      </div>
                      <div className="flex justify-between text-xl font-black pt-4 border-t border-white/5">
                         <span>Total Due</span>
                         <span className="text-blue-400">{selectedTier?.price}</span>
                      </div>
                   </div>
                </div>

                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 relative z-10">
                   <div className="flex items-center gap-3">
                      <ShieldCheck className="text-emerald-500" size={20} />
                      <p className="text-xs font-black uppercase tracking-widest">Platform Protection</p>
                   </div>
                   <p className="text-[10px] text-slate-400 leading-relaxed font-medium italic">Your subscription enables "Priority Ranking" which typicaly increases lead generation by 42% in verified sectors.</p>
                </div>
              </div>

              <div className="p-8 bg-white border border-slate-100 rounded-[40px] shadow-sm space-y-4">
                 <h4 className="font-black text-slate-800 text-sm uppercase tracking-widest flex items-center gap-2">
                    <History size={16} className="text-blue-600" /> Subscription Perks
                 </h4>
                 <div className="space-y-3">
                    {['Priority Search Result Placement', '4K Professional Video Uploads', 'Lead Analytics Dashboard'].map((perk, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                         {perk}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}

      {step === 'HISTORY' && (
        <div className="space-y-8 animate-slideInRight">
           <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                   <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice ID</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Plan</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                      <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {[
                     { id: 'INV-9421', date: 'Oct 01, 2023', plan: 'Pro Monthly', amount: '$29.00', status: 'PAID' },
                     { id: 'INV-8832', date: 'Sep 01, 2023', plan: 'Pro Monthly', amount: '$29.00', status: 'PAID' },
                     { id: 'INV-7210', date: 'Aug 01, 2023', plan: 'Pro Monthly', amount: '$29.00', status: 'PAID' },
                   ].map((inv, i) => (
                     <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-10 py-6 font-black text-slate-800 text-sm">{inv.id}</td>
                        <td className="px-10 py-6 text-sm font-bold text-slate-400">{inv.date}</td>
                        <td className="px-10 py-6 font-black text-slate-600 text-xs uppercase tracking-tight">{inv.plan}</td>
                        <td className="px-10 py-6 font-black text-slate-800">{inv.amount}</td>
                        <td className="px-10 py-6">
                           <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg uppercase">Success</span>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all border border-transparent hover:border-slate-100">
                              <Download size={18} />
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
              </table>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit"><Calendar size={20} /></div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Billing Cycle</p>
                    <p className="text-xl font-black text-slate-800">Nov 01, 2023</p>
                 </div>
              </div>
              <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
                 <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit"><DollarSign size={20} /></div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Investment</p>
                    <p className="text-xl font-black text-slate-800">$87.00</p>
                 </div>
              </div>
              <div className="bg-rose-50 p-8 rounded-[40px] border border-rose-100 shadow-sm flex flex-col justify-between">
                 <p className="text-xs font-black text-rose-900 uppercase tracking-widest">Plan Management</p>
                 <button className="text-left text-sm font-black text-rose-600 hover:underline transition-all">Cancel Subscription</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
