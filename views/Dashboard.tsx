
import React, { useState } from 'react';
import { Brain, DollarSign, TrendingUp, Users, Plus, Calculator, Globe, BarChart3 } from 'lucide-react';
import { getAIValuation, ValuationInput } from '../services/geminiService';
import { User } from '../types';

interface DashboardProps {
  user?: User;
  onNewListing?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNewListing }) => {
  const isAdmin = user?.role === 'ADMIN';
  
  const [valForm, setValForm] = useState<ValuationInput>({
    location: 'Downtown, Nairobi',
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
    { label: 'Global Sales', val: '$4.2M', icon: <DollarSign className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'API Usage', val: '98.2%', icon: <Globe className="text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const supplierStats = [
    { label: 'Active Listings', val: '12', icon: <TrendingUp className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Total Leads', val: '154', icon: <Users className="text-emerald-600" />, bg: 'bg-emerald-50' },
    { label: 'Pending Deals', val: '5', icon: <DollarSign className="text-amber-600" />, bg: 'bg-amber-50' },
    { label: 'My Revenue', val: '$12,400', icon: <Calculator className="text-purple-600" />, bg: 'bg-purple-50' },
  ];

  const stats = isAdmin ? adminStats : supplierStats;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">{isAdmin ? 'Platform Analytics' : 'Dashboard'}</h1>
          <p className="text-slate-500">{isAdmin ? 'Global growth and system metrics.' : "Welcome back, let's look at your performance."}</p>
        </div>
        {!isAdmin && (
          <button 
            onClick={onNewListing}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
          >
            <Plus size={20} />
            <span>New Listing</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Valuation Tool - Visible to both for testing, or could be restricted */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Brain className="text-indigo-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">AI Valuation Tool</h2>
              <p className="text-sm text-slate-500">Get instant market analysis powered by Gemini AI.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                value={valForm.location}
                onChange={e => setValForm({...valForm, location: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Property Type</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                value={valForm.propertyType}
                onChange={e => setValForm({...valForm, propertyType: e.target.value})}
              >
                <option>House</option>
                <option>Apartment</option>
                <option>Office</option>
                <option>Land</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Size (sqft)</label>
              <input 
                type="number"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                value={valForm.sqft}
                onChange={e => setValForm({...valForm, sqft: parseInt(e.target.value)})}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Beds</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  value={valForm.beds}
                  onChange={e => setValForm({...valForm, beds: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Baths</label>
                <input 
                  type="number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                  value={valForm.baths}
                  onChange={e => setValForm({...valForm, baths: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleValuation}
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Brain size={20} />}
            {loading ? 'Analyzing Market...' : 'Generate Estimate'}
          </button>

          {valuation && (
            <div className="mt-6 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 animate-fadeIn">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-indigo-400 uppercase">Estimated Value</p>
                  <p className="text-3xl font-black text-indigo-700">${valuation.estimatedPrice.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-indigo-400 uppercase">Range</p>
                  <p className="text-sm font-bold text-indigo-600">${valuation.lowEstimate.toLocaleString()} - ${valuation.highEstimate.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-indigo-800 uppercase mb-1">Market Trend</h4>
                  <p className="text-sm text-indigo-600 leading-relaxed">{valuation.marketTrend}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-indigo-800 uppercase mb-2">Key Selling Points</h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {valuation.sellingPoints.map((point: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-indigo-700 bg-white/50 px-2 py-1 rounded">
                        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* List View - Depends on Role */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800">{isAdmin ? 'Recent Market Activity' : 'Recent Leads'}</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-all">
                <img src={`https://picsum.photos/id/${i+20}/100/100`} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600">{isAdmin ? `Platform Transaction #${i*142}` : `Lead Name ${i}`}</p>
                  <p className="text-xs text-slate-500">{isAdmin ? `Supplier @agent${i}` : `Villa #30${i}`}</p>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase">{isAdmin ? 'Success' : 'New'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
