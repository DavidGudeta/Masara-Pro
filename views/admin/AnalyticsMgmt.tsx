
import React from 'react';
import { BarChart3, PieChart, Users, Globe, Zap, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';

export const AnalyticsMgmt: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Intelligence</h1>
          <p className="text-slate-500 font-medium">Deep insights into user behavior and market movement.</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
           <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white">Daily</button>
           <button className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Weekly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Active Sessions', val: '4,284', trend: '+18%', color: 'text-blue-600', bg: 'bg-blue-50' },
           { label: 'Tour Completions', val: '12.4k', trend: '+24%', color: 'text-indigo-600', bg: 'bg-indigo-50' },
           { label: 'Conversion Rate', val: '3.8%', trend: '-2%', color: 'text-rose-600', bg: 'bg-rose-50' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                 <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}><Zap size={20} /></div>
                 <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.trend}
                 </span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-800">{stat.val}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl space-y-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2"><BarChart3 size={24} className="text-blue-600" /> Regional Growth</h3>
            <div className="space-y-6">
               {[
                 { region: 'Addis Ababa, ET', growth: 92, val: '8.4k' },
                 { region: 'Nairobi, KE', growth: 76, val: '4.2k' },
                 { region: 'Kigali, RW', growth: 45, val: '1.2k' },
               ].map((item, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                       <span className="text-slate-500">{item.region}</span>
                       <span className="text-slate-900">{item.val} Users</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${item.growth}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-slate-900 p-10 rounded-[48px] text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full"></div>
            <div className="space-y-4 relative z-10">
               <h3 className="text-xl font-black flex items-center gap-2"><Sparkles size={24} className="text-blue-400" /> AI Optimization</h3>
               <p className="text-slate-400 font-medium italic">AI is currently boosting CTR for high-trust properties by 42%.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-12 relative z-10">
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[9px] font-black uppercase text-blue-400">Predicted Rev</p>
                  <p className="text-2xl font-black">$1.4M</p>
               </div>
               <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[9px] font-black uppercase text-blue-400">Trend Score</p>
                  <p className="text-2xl font-black">High</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
