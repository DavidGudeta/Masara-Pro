
import React, { useState } from 'react';
import { 
  Building, Search, Filter, MoreVertical, Edit, Trash2, 
  ExternalLink, Eye, CheckCircle, ShieldAlert, AlertTriangle,
  Zap, Plus, BarChart3, Users, Image as ImageIcon, Video,
  TrendingUp, Star, ArrowUpRight, X, Sparkles
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../../constants';
import { User, Property } from '../../types';

interface PropertyMgmtProps {
  user?: User;
  onSelectProperty: (id: string) => void;
  onAddNewListing?: () => void;
}

export const PropertyMgmt: React.FC<PropertyMgmtProps> = ({ user, onSelectProperty, onAddNewListing }) => {
  const [search, setSearch] = useState('');
  const [showPromoteModal, setShowPromoteModal] = useState<string | null>(null);
  const isAdmin = user?.role === 'ADMIN';

  // For Agents, only show their properties. For Admin, show all.
  const filteredProperties = MOCK_PROPERTIES.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(search.toLowerCase()) || 
                         prop.location.toLowerCase().includes(search.toLowerCase());
    const isOwner = isAdmin || prop.agent?.name === user?.name;
    return matchesSearch && isOwner;
  });

  const promotionTiers = [
    { id: 'p1', name: 'Homepage Featured', desc: 'Display on main hero carousel', price: '$49/week', icon: <Sparkles className="text-amber-500" /> },
    { id: 'p2', name: 'Search Priority', desc: 'Rank #1 in regional searches', price: '$29/week', icon: <TrendingUp className="text-blue-500" /> },
    { id: 'p3', name: 'AI Optimized', desc: 'Auto-retargeting for warm leads', price: '$19/week', icon: <Zap className="text-indigo-500" /> },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      {/* Header with Stats Summary for Agents */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isAdmin ? 'Global Property Control' : 'Inventory Management'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isAdmin ? 'Moderate and audit listings across the entire platform.' : 'Track performance and manage your professional portfolio.'}
          </p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               value={search}
               onChange={e => setSearch(e.target.value)}
               className="pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm outline-none focus:ring-4 focus:ring-blue-50 w-64 md:w-80" 
               placeholder="Search my listings..." 
             />
           </div>
           {!isAdmin && (
             <button 
               onClick={onAddNewListing}
               className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
             >
               <Plus size={18} /> Add Property
             </button>
           )}
        </div>
      </div>

      {!isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Listings', val: filteredProperties.length, icon: <Building />, color: 'text-slate-600' },
             { label: 'Total Views', val: '12.4k', icon: <Eye />, color: 'text-blue-600' },
             { label: 'Warm Leads', val: '42', icon: <Users />, color: 'text-emerald-600' },
             { label: 'Boosted', val: '3', icon: <Zap />, color: 'text-amber-600' },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-3">
                <div className={`p-3 bg-slate-50 rounded-2xl w-fit ${stat.color}`}>{stat.icon}</div>
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-2xl font-black text-slate-800">{stat.val}</p>
                </div>
             </div>
           ))}
        </div>
      )}

      {/* Main Table Interface */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Listing Identity</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Performance</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Price & Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredProperties.map(prop => (
              <tr key={prop.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="relative h-16 w-20 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <img src={prop.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent"></div>
                    </div>
                    <div>
                      <p className="font-black text-slate-900 line-clamp-1">{prop.title}</p>
                      <p className="text-xs text-slate-400 font-bold">{prop.location}</p>
                      <div className="flex gap-1.5 mt-2">
                        <span className="p-1 bg-slate-50 rounded text-slate-400"><ImageIcon size={10} /></span>
                        <span className="p-1 bg-slate-50 rounded text-slate-400"><Video size={10} /></span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                         <BarChart3 size={14} className="text-blue-500" />
                         <span className="text-sm font-black text-slate-700">2.4k views</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Users size={14} className="text-emerald-500" />
                         <span className="text-xs font-bold text-slate-400">12 leads generated</span>
                      </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <div>
                    <p className="text-lg font-black text-blue-600">${prop.price.toLocaleString()}</p>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                      prop.status === 'FOR_SALE' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {prop.status.replace('_', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {!isAdmin && (
                      <button 
                        onClick={() => setShowPromoteModal(prop.id)}
                        className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
                        title="Promote Listing"
                      >
                        <Zap size={18} fill="currentColor" />
                      </button>
                    )}
                    <button onClick={() => onSelectProperty(prop.id)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18} /></button>
                    <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit size={18} /></button>
                    <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProperties.length === 0 && (
          <div className="py-20 text-center space-y-4">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <Building size={32} />
             </div>
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No properties found.</p>
          </div>
        )}
      </div>

      {/* Quick Promotion Modal Overlay */}
      {showPromoteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[70] flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[48px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="p-10 space-y-8 relative">
                 <button 
                  onClick={() => setShowPromoteModal(null)}
                  className="absolute top-8 right-8 p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors"
                 >
                   <X size={20} />
                 </button>

                 <div className="space-y-2">
                    <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-[24px] flex items-center justify-center mb-6">
                       <Zap size={32} fill="currentColor" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Boost Your Listing</h3>
                    <p className="text-slate-500 font-medium">Select a promotion package to increase engagement by up to 300%.</p>
                 </div>

                 <div className="space-y-3">
                    {promotionTiers.map(tier => (
                      <button key={tier.id} className="w-full p-6 bg-white border border-slate-100 rounded-3xl flex items-center justify-between group hover:border-blue-600 hover:shadow-xl transition-all text-left">
                         <div className="flex items-center gap-5">
                            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                               {tier.icon}
                            </div>
                            <div>
                               <h4 className="font-black text-slate-800">{tier.name}</h4>
                               <p className="text-xs text-slate-400 font-medium">{tier.desc}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="font-black text-blue-600">{tier.price}</p>
                            <ArrowUpRight size={16} className="ml-auto text-slate-200 group-hover:text-blue-600 transition-colors" />
                         </div>
                      </button>
                    ))}
                 </div>

                 <div className="pt-4 flex gap-4">
                    <button onClick={() => setShowPromoteModal(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-[11px] uppercase tracking-widest">Cancel</button>
                    <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-slate-200">Review Payment</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
