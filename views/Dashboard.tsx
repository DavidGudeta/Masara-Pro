
import React, { useState } from 'react';
import { 
  Brain, DollarSign, TrendingUp, Users, Plus, Calculator, Globe, 
  BarChart3, Activity, ShieldCheck, Zap, ArrowUpRight, 
  Map as MapIcon, Server, RefreshCw
} from 'lucide-react';
import { getAIValuation, ValuationInput } from '../services/geminiService';
import { User } from '../types';

interface DashboardProps {
  user?: User;
  onNewListing?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNewListing }) => {
  const isAdmin = user?.role === 'ADMIN';
  
  const [valForm, setValForm] = useState<ValuationInput>({
    location: 'Bole, Addis Ababa',
    sqft: 1200,
    propertyType: 'Apartment',
    beds: 2,
    baths: 2
  });
  const [loading, setLoading] = useState(false);
  const [valuation, setValuation] = useState<any>(null);

  const handleValuation = async () => {
    setLoading(true);
    const result = await getAIValuation(valForm);
    setValuation(result);
    setLoading(false);
  };

  const adminStats = [
    { label: 'Platform Users', val: '45,200', icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Active Channels', val: '864', icon: <BarChart3 className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Global Revenue', val: '$1.42M', icon: <DollarSign className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'System Uptime', val: '99.98%', icon: <Activity className="text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const supplierStats = [
    { label: 'Active Listings', val: '12', icon: <TrendingUp className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Total Leads', val: '154', icon: <Users className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Pending Deals', val: '5', icon: <DollarSign className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'My Revenue', val: '$12,400', icon: <Calculator className="text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const stats = isAdmin ? adminStats : supplierStats;

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{isAdmin ? 'Platform Command' : 'Dashboard'}</h1>
          <p className="text-slate-500 font-medium italic">{isAdmin ? 'Real-time infrastructure and market intelligence.' : "Welcome back, let's look at your performance."}</p>
        </div>
        {!isAdmin && (
          <button 
            onClick={onNewListing}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Plus size={18} />
            <span>New Listing</span>
          </button>
        )}
        {isAdmin && (
          <div className="flex gap-2">
            <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
              <RefreshCw size={18} />
            </button>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">System Logs</button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-2xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Section: Admin Analytics OR Agent Valuation Tool */}
        <div className="lg:col-span-2 space-y-8">
          {isAdmin ? (
            <div className="space-y-8">
              {/* Revenue Stream Simulator (Chart Replacement) */}
              <section className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl space-y-8 overflow-hidden relative">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-slate-900">Revenue Flow (Last 30 Days)</h2>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Platform Commissions & Subscriptions</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">+14.2% Growth</span>
                  </div>
                </div>

                {/* Simulated Chart Bars */}
                <div className="flex items-end justify-between h-48 gap-2 pt-4">
                  {[45, 60, 55, 80, 70, 90, 85, 100, 95, 110, 105, 130].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div 
                        className={`w-full rounded-t-xl transition-all duration-1000 bg-gradient-to-t ${i === 11 ? 'from-blue-600 to-indigo-500' : 'from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-blue-200'}`} 
                        style={{ height: `${h}%` }}
                      ></div>
                      <span className="text-[8px] font-black text-slate-300 uppercase">W{Math.floor(i/3)+1}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Agent Fees</p>
                    <p className="text-lg font-black text-slate-800">$842,000</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Premium Subs</p>
                    <p className="text-lg font-black text-slate-800">$420,500</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Ad Promotion</p>
                    <p className="text-lg font-black text-slate-800">$158,200</p>
                  </div>
                </div>
              </section>

              {/* Infrastructure & Node Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full"></div>
                  <h3 className="text-lg font-black flex items-center gap-2 relative z-10">
                    <Server size={20} className="text-blue-400" /> Infrastructure Nodes
                  </h3>
                  <div className="space-y-4 relative z-10">
                    {[
                      { name: 'Gateway: Addis Ababa', status: 'Healthy', load: '42%' },
                      { name: 'Gateway: Nairobi', status: 'Healthy', load: '28%' },
                      { name: 'AI Valuation Engine', status: 'Healthy', load: '14%' },
                    ].map((node, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <span className="text-xs font-bold text-slate-300">{node.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-emerald-400 uppercase">{node.status}</span>
                          <span className="text-[10px] font-black text-slate-500">{node.load}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl space-y-6">
                  <h3 className="text-lg font-black flex items-center gap-2 text-slate-800">
                    <Globe size={20} className="text-indigo-600" /> Regional Hotspots
                  </h3>
                  <div className="space-y-5">
                    {[
                      { area: 'Bole, AA', growth: '+24%', color: 'text-blue-600', bg: 'bg-blue-50' },
                      { area: 'Kazanchis, AA', growth: '+18%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { area: 'Bishoftu', growth: '+8%', color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((hot, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${hot.bg} ${hot.color}`}><MapIcon size={14}/></div>
                          <span className="text-sm font-black text-slate-700">{hot.area}</span>
                        </div>
                        <span className={`text-[10px] font-black ${hot.color}`}>{hot.growth} Volume</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shadow-sm">
                    <Brain size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">AI Market Intelligence</h2>
                    <p className="text-sm text-slate-500 font-medium">Generate instant professional property valuations.</p>
                  </div>
                </div>
                <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  10 Credits Left
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location Context</label>
                  <input 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all"
                    value={valForm.location}
                    onChange={e => setValForm({...valForm, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Category</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold appearance-none outline-none focus:ring-4 focus:ring-blue-50"
                    value={valForm.propertyType}
                    onChange={e => setValForm({...valForm, propertyType: e.target.value})}
                  >
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Office</option>
                    <option>Land</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Net Area (sqft)</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50"
                    value={valForm.sqft}
                    onChange={e => setValForm({...valForm, sqft: parseInt(e.target.value)})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Beds</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" value={valForm.beds} onChange={e => setValForm({...valForm, beds: parseInt(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Baths</label>
                    <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold" value={valForm.baths} onChange={e => setValForm({...valForm, baths: parseInt(e.target.value)})} />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleValuation}
                disabled={loading}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-black rounded-[24px] shadow-2xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Brain size={20} />}
                {loading ? 'Synthesizing Market Data...' : 'Run AI Valuation'}
              </button>

              {valuation && (
                <div className="mt-8 p-10 bg-indigo-50/50 rounded-[40px] border border-indigo-100 animate-fadeIn relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain size={120} />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 relative z-10">
                    <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Estimated Market Value</p>
                      <p className="text-5xl font-black text-indigo-700">${valuation.estimatedPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-left md:text-right mt-6 md:mt-0">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Confidence Range</p>
                      <p className="text-xl font-black text-indigo-600">${valuation.lowEstimate.toLocaleString()} — ${valuation.highEstimate.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="bg-white/60 p-6 rounded-3xl backdrop-blur-sm border border-white/50">
                      <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <TrendingUp size={14} /> Regional Market Trend
                      </h4>
                      <p className="text-sm text-indigo-900 font-medium leading-relaxed italic">"{valuation.marketTrend}"</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ArrowUpRight size={14} /> Competitive Selling Points
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {valuation.sellingPoints.map((point: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 text-xs font-bold text-indigo-700 bg-white/80 px-4 py-3 rounded-2xl shadow-sm border border-indigo-50">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar: Platform/Leads Insights */}
        <div className="space-y-8">
          <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">{isAdmin ? 'Market Shifts' : 'High Quality Leads'}</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline transition-all">Export</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                  <div className="relative">
                    <img src={`https://i.pravatar.cc/150?u=dashboard${i}`} className="w-12 h-12 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {isAdmin ? `Agent Brand Review #${i*21}` : `Potential Buyer: Sarah W.`}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      {isAdmin ? `Category: Luxury / Diplomatic` : `Villa #142 • Inquiry Active`}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${isAdmin ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {isAdmin ? 'Pass' : 'Warm'}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              View All Pipeline
            </button>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-xl font-black flex items-center gap-2 relative z-10"><Zap size={20} className="text-amber-400"/> {isAdmin ? 'Global Performance' : 'Conversion Score'}</h4>
            <div className="space-y-2 relative z-10">
               <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                  <span>Platform Health</span>
                  <span className="text-white">94%</span>
               </div>
               <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[94%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
               </div>
            </div>
            <p className="text-slate-400 text-xs font-medium italic relative z-10 leading-relaxed">
              System is processing <span className="text-white font-bold">128 transactions/sec</span>. All regional payment gateways are synchronized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
