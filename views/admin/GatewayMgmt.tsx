
import React from 'react';
import { Server, Globe, Lock, ShieldCheck, Zap, Activity, Info, MoreVertical } from 'lucide-react';

export const GatewayMgmt: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payment Gateways</h1>
        <p className="text-slate-500 font-medium">Configure global transaction providers and regional settlement nodes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg">
                     <span className="text-2xl font-black">ST</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900">Stripe Global</h3>
                     <p className="text-xs font-bold text-emerald-500 uppercase flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Operational
                     </p>
                  </div>
               </div>
               <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl"><MoreVertical size={20} /></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Keys</p>
                  <p className="text-lg font-black text-slate-800">4 Prod / 2 Dev</p>
               </div>
               <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
                  <p className="text-lg font-black text-slate-800">99.8%</p>
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-xs font-black text-slate-400 uppercase flex items-center justify-between">
                  Auto-Settlement
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
               </label>
               <label className="text-xs font-black text-slate-400 uppercase flex items-center justify-between">
                  Webhooks Enabled
                  <div className="w-10 h-6 bg-blue-600 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
               </label>
            </div>
            
            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Configure Stripe API</button>
         </div>

         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8 opacity-60">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-lg">
                     <span className="text-2xl font-black">CH</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900">Chapa (East Africa)</h3>
                     <p className="text-xs font-bold text-slate-400 uppercase">Disconnected</p>
                  </div>
               </div>
            </div>
            <div className="p-8 border-2 border-dashed border-slate-200 rounded-[32px] text-center space-y-4">
               <Globe size={32} className="mx-auto text-slate-300" />
               <p className="text-sm font-bold text-slate-400">Regional gateway for Ethiopian Birr & Kenyan Shillings.</p>
               <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Connect Chapa API</button>
            </div>
         </div>
      </div>

      <div className="p-8 bg-blue-900 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/30 blur-[100px] rounded-full"></div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 bg-white/10 rounded-3xl border border-white/20">
               <Activity size={32} className="text-blue-400" />
            </div>
            <div>
               <h4 className="text-2xl font-black">Platform Health Check</h4>
               <p className="text-blue-300 text-sm font-medium italic">All payout nodes are synchronized with Stripe Connect API.</p>
            </div>
         </div>
         <div className="flex gap-4 relative z-10">
            <button className="px-8 py-4 bg-white text-blue-900 font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">API Logs</button>
            <button className="px-8 py-4 bg-blue-800 text-white border border-white/10 font-black rounded-2xl text-[10px] uppercase tracking-widest">Network Status</button>
         </div>
      </div>
    </div>
  );
};
