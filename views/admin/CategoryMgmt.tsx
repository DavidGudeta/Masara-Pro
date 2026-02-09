
import React, { useState } from 'react';
import { 
  Layers, Plus, Search, MoreVertical, Edit2, Trash2, 
  Eye, EyeOff, Building2, Home, Landmark, MapPin, 
  Sparkles, CheckCircle2, ChevronRight, SlidersHorizontal
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: number;
  status: 'ACTIVE' | 'HIDDEN';
  icon: React.ReactNode;
  description: string;
}

const PROPERTY_TYPES: CategoryItem[] = [
  { id: 't1', name: 'Modern Villa', count: 42, status: 'ACTIVE', icon: <Home size={18} />, description: 'Standalone residential houses with private grounds.' },
  { id: 't2', name: 'Apartment', count: 124, status: 'ACTIVE', icon: <Building2 size={18} />, description: 'Multi-unit residential dwellings within blocks.' },
  { id: 't3', name: 'Commercial Office', count: 28, status: 'ACTIVE', icon: <Landmark size={18} />, description: 'Business spaces in financial districts.' },
  { id: 't4', name: 'Raw Land', count: 15, status: 'ACTIVE', icon: <MapPin size={18} />, description: 'Undeveloped plots for residential or commercial use.' },
];

const MARKET_CATEGORIES: CategoryItem[] = [
  { id: 'c1', name: 'Luxury / Executive', count: 12, status: 'ACTIVE', icon: <Sparkles size={18} />, description: 'Premium tier listings in prime Addis locations.' },
  { id: 'c2', name: 'Diplomatic Zone', count: 8, status: 'ACTIVE', icon: <CheckCircle2 size={18} />, description: 'Properties near Embassies and UN Headquarters.' },
  { id: 'c3', name: 'Industrial Hub', count: 4, status: 'HIDDEN', icon: <Layers size={18} />, description: 'Manufacturing and warehouse spaces near Akaki.' },
];

export const CategoryMgmt: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'TYPES' | 'CLASSIFICATIONS'>('TYPES');

  const items = activeModule === 'TYPES' ? PROPERTY_TYPES : MARKET_CATEGORIES;

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Taxonomy Control</h1>
          <p className="text-slate-500 font-medium">Manage how properties are organized and discovered by buyers.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] shadow-lg border border-slate-100">
           <button 
             onClick={() => setActiveModule('TYPES')}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
               activeModule === 'TYPES' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900'
             }`}
           >
             Property Types
           </button>
           <button 
             onClick={() => setActiveModule('CLASSIFICATIONS')}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
               activeModule === 'CLASSIFICATIONS' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900'
             }`}
           >
             Market Class
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Management Table */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                 <div className="relative group w-full max-w-xs">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                    <input className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none" placeholder="Search categories..." />
                 </div>
                 <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:scale-105 transition-all">
                    <Plus size={16} /> Add {activeModule === 'TYPES' ? 'Type' : 'Category'}
                 </button>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50 border-b border-slate-50">
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Icon & Name</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Listings</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                          <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {items.map(item => (
                         <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                     {item.icon}
                                  </div>
                                  <div>
                                     <p className="font-black text-slate-900">{item.name}</p>
                                     <p className="text-[10px] text-slate-400 font-medium italic line-clamp-1">{item.description}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-black text-slate-600">
                                  {item.count} properties
                               </span>
                            </td>
                            <td className="px-8 py-6">
                               <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                                 item.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                               }`}>
                                  {item.status}
                               </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <div className="flex items-center justify-end gap-1">
                                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                     <Edit2 size={16} />
                                  </button>
                                  <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all" title={item.status === 'ACTIVE' ? 'Hide' : 'Show'}>
                                     {item.status === 'ACTIVE' ? <EyeOff size={16} /> : <Eye size={16} />}
                                  </button>
                                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                                     <Trash2 size={16} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full"></div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="p-3 bg-blue-600 rounded-2xl shadow-xl">
                   <SlidersHorizontal size={24} />
                 </div>
                 <h3 className="text-xl font-black tracking-tight">Discovery Logic</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed italic relative z-10">
                 These categories control the global filtering engine. Adjusting "Market Class" directly affects AI property matching and "Search Recommendation" weights.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-4 relative z-10">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400">Total Types</span>
                    <span className="text-xl font-black">12</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400">Hidden Tags</span>
                    <span className="text-xl font-black text-amber-400">3</span>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm space-y-4">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                 <Sparkles size={16} className="text-blue-600" /> Platform Tip
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                 Top performing category in Addis this month: <span className="font-bold text-blue-600">Diplomatic Zone</span>. 
                 Consider adding more granular sub-types for high-security areas.
              </p>
              <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                 View Analytics
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
