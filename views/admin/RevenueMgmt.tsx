
import React from 'react';
import { DollarSign, TrendingUp, CreditCard, BarChart3, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

export const RevenueMgmt: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Financial Hub</h1>
          <p className="text-slate-500 font-medium">Global revenue tracking, commissions, and platform settlements.</p>
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
           <Zap size={14} fill="currentColor" /> Payout All Agents
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'Total Revenue', val: '$4.2M', trend: '+14%', up: true },
           { label: 'Net Profit', val: '$860k', trend: '+8%', up: true },
           { label: 'Agent Payouts', val: '$2.8M', trend: '-2%', up: false },
           { label: 'Platform Fees', val: '$540k', trend: '+12%', up: true },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <span className={`flex items-center gap-0.5 text-[9px] font-black px-2 py-0.5 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />} {stat.trend}
                 </span>
              </div>
              <p className="text-3xl font-black text-slate-800">{stat.val}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl space-y-8">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black text-slate-800">Recent Transactions</h3>
               <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Full History</button>
            </div>
            <div className="space-y-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-slate-50">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white rounded-xl text-blue-600 shadow-sm"><CreditCard size={18} /></div>
                       <div>
                          <p className="text-sm font-black text-slate-800">Commission from Bole Villa #142</p>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">2.5% Fee Collected • Agent: Sarah J.</p>
                       </div>
                    </div>
                    <p className="font-black text-emerald-600">+$12,400.00</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[80px] rounded-full"></div>
            <h3 className="text-xl font-black flex items-center gap-2 relative z-10"><TrendingUp size={24} className="text-emerald-400" /> Commission Rules</h3>
            <div className="space-y-6 relative z-10">
               {[
                 { label: 'Marketplace Buy', val: '2.5%', color: 'bg-blue-600' },
                 { label: 'Rental Agreement', val: '15.0%', color: 'bg-emerald-600' },
                 { label: 'API Partner Fee', val: '0.8%', color: 'bg-amber-600' },
               ].map((rule, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                       <span className="text-slate-400">{rule.label}</span>
                       <span className="text-white">{rule.val}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                       <div className={`h-full ${rule.color}`} style={{ width: rule.val }}></div>
                    </div>
                 </div>
               ))}
            </div>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all relative z-10">Configure Fee Schema</button>
         </div>
      </div>
    </div>
  );
};
