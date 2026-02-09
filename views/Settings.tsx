
import React from 'react';
import { CreditCard, Landmark, DollarSign, PieChart, ShieldCheck, Zap, Globe, Server, Lock } from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user?: User;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const isAdmin = user?.role === 'ADMIN';

  if (isAdmin) {
    return (
      <div className="space-y-12 pb-20">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Settings</h1>
          <p className="text-slate-500 text-sm">Global gateway configuration, revenue rules, and security policies.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                   <Server className="text-blue-600" size={24} /> Payment Gateways
                </h2>
                <div className="space-y-4">
                   <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 font-black">ST</div>
                         <div>
                            <h3 className="font-black text-slate-800">Stripe Integration</h3>
                            <p className="text-xs text-emerald-500 font-bold uppercase">Active • Main Payout Gateway</p>
                         </div>
                      </div>
                      <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Manage</button>
                   </div>
                   <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-slate-100 rounded-2xl text-slate-400 font-black">CH</div>
                         <div>
                            <h3 className="font-black text-slate-800">Chapa (Ethiopia)</h3>
                            <p className="text-xs text-slate-400 font-bold uppercase">Disabled • Sandbox Mode</p>
                         </div>
                      </div>
                      <button className="px-6 py-2 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed">Enable</button>
                   </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                   <DollarSign className="text-blue-600" size={24} /> Platform Fee Rules
                </h2>
                <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Standard Commission (%)</label>
                        <input type="number" defaultValue={2.5} className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl font-bold" />
                      </div>
                      <div>
                        <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Enterprise Comm (%)</label>
                        <input type="number" defaultValue={1.5} className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl font-bold" />
                      </div>
                   </div>
                   <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase shadow-xl shadow-blue-100">Update Revenue Rules</button>
                </div>
              </section>
           </div>

           <div className="space-y-8">
              <section className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6">
                 <h2 className="text-xl font-black flex items-center gap-2">
                   <Lock size={24} className="text-blue-500" /> Security
                 </h2>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold">Global 2FA Enforcement</span>
                       <div className="w-10 h-6 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold">New Supplier Auto-Verify</span>
                       <div className="w-10 h-6 bg-slate-700 rounded-full relative"><div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                    </div>
                 </div>
              </section>

              <div className="p-8 bg-indigo-50 rounded-[40px] space-y-4">
                <h3 className="font-black text-indigo-900">Developer API</h3>
                <p className="text-xs text-indigo-700 leading-relaxed">Platform webhooks and API keys for external integrations.</p>
                <button className="w-full py-3 bg-indigo-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-200">View API Console</button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div>
        <h1 className="text-3xl font-black text-slate-800">Settings</h1>
        <p className="text-slate-500 text-sm">Configure your financial accounts and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Section */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <CreditCard className="text-blue-600" size={24} /> Payout Methods
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 rounded-2xl">
                    <Landmark size={24} className="text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Commercial Bank of Ethiopia</h3>
                    <p className="text-xs text-slate-400">Account ending in •••• 5678</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase">Primary</span>
              </div>
              <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[32px] text-slate-400 font-black text-xs uppercase tracking-widest hover:border-blue-300 hover:text-blue-600 transition-all">
                + Add New Payout Method
              </button>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <DollarSign className="text-blue-600" size={24} /> Revenue Tracking
            </h2>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Total Earnings</p>
                  <p className="text-3xl font-black text-slate-800">$42,500.00</p>
                  <p className="text-xs text-emerald-500 font-bold mt-1">+12.5% vs last month</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Pending Payouts</p>
                  <p className="text-3xl font-black text-slate-800">$1,240.00</p>
                  <p className="text-xs text-slate-400 font-bold mt-1">Expected: Oct 28</p>
                </div>
                <div className="flex items-center justify-end">
                  <button className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-lg shadow-blue-200 text-xs uppercase tracking-widest">Withdraw Now</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Platform Section */}
        <div className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-xl font-black text-slate-800">Platform Config</h2>
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
              {[
                { label: 'AI Valuation Tools', icon: <Zap size={18} />, active: true },
                { label: 'Public Profile', icon: <Globe size={18} />, active: true },
                { label: 'Two-Factor Auth', icon: <ShieldCheck size={18} />, active: false },
                { label: 'Market Reports', icon: <PieChart size={18} />, active: true },
              ].map((item, i) => (
                <div key={i} className="p-5 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-400">{item.icon}</div>
                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  </div>
                  <button className={`w-10 h-6 rounded-full relative transition-colors ${item.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.active ? 'right-1' : 'left-1'}`}></div>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <div className="p-8 bg-blue-50 rounded-[40px] space-y-4">
            <h3 className="font-black text-blue-900">Need Help?</h3>
            <p className="text-xs text-blue-700 leading-relaxed">Our premium support team is available 24/7 for Enterprise Tier suppliers.</p>
            <button className="w-full py-3 bg-blue-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
};
