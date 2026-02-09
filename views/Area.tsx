
import React from 'react';
import { Search, Filter, MapPin, Navigation, List, Grid, Tv, Locate } from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';

interface AreaProps {
  onSelectProperty?: (id: string) => void;
  onChannelSelect?: (agentName: string) => void;
}

export const Area: React.FC<AreaProps> = ({ onSelectProperty, onChannelSelect }) => {
  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-8 animate-fadeIn">
      {/* Big Search Bar */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white p-2 rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50 flex items-center group focus-within:ring-4 focus-within:ring-blue-50 transition-all">
          <div className="flex-1 flex items-center px-4">
            <Search className="text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
            <input 
              className="w-full bg-transparent border-none py-4 px-4 text-lg font-bold placeholder:text-slate-300 focus:ring-0 outline-none" 
              placeholder="Which neighborhood in Ethiopia?" 
            />
          </div>
          <div className="h-10 w-px bg-slate-100 mx-2"></div>
          <button className="flex items-center gap-2 px-6 py-4 text-slate-500 hover:text-blue-600 font-black text-xs uppercase tracking-widest transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="px-10 py-4 bg-blue-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">
            Search
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
        {/* Map Explorer */}
        <div className="flex-[2] bg-slate-200 rounded-[48px] relative overflow-hidden shadow-inner border border-slate-200 group">
          {/* Simulated Map */}
          <div className="absolute inset-0 bg-[#f1f5f9] transition-transform duration-1000">
             <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 0)', backgroundSize: '40px 40px'}}></div>
             
             {MOCK_PROPERTIES.map((p, i) => (
               <div 
                 key={p.id} 
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                 style={{ top: `${20 + i * 25}%`, left: `${30 + i * 20}%` }}
                 onClick={() => onSelectProperty?.(p.id)}
               >
                 <div className="bg-white px-4 py-2 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 group-hover/pin:scale-110 group-hover/pin:bg-slate-900 group-hover/pin:text-white transition-all">
                   <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse group-hover/pin:bg-white"></div>
                   <span className="text-xs font-black tracking-tight">${(p.price / 1000).toFixed(0)}k</span>
                 </div>
                 <div className="w-0.5 h-4 bg-slate-300 group-hover/pin:bg-slate-900 mx-auto -mt-0.5 transition-colors"></div>
               </div>
             ))}
          </div>

          <div className="absolute top-8 left-8 flex flex-col gap-3">
            <button className="p-4 bg-white rounded-2xl shadow-xl text-slate-600 hover:text-blue-600 border border-slate-100 transition-all">
              <Locate size={20} strokeWidth={2.5} />
            </button>
            <button className="p-4 bg-white rounded-2xl shadow-xl text-slate-600 hover:text-blue-600 border border-slate-100 transition-all">
              <Navigation size={20} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex bg-slate-900/90 backdrop-blur-xl p-2 rounded-3xl shadow-2xl border border-white/10">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                <MapPin size={14} /> Addis Map
              </button>
              <button className="px-8 py-3 text-white/50 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all">
                <List size={14} /> Regions
              </button>
            </div>
          </div>
        </div>

        {/* Sync List */}
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 hide-scrollbar">
          <div className="px-2">
            <h2 className="text-xl font-black text-slate-900">Ethiopia Results</h2>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Found across Bole, Kazanchis, and beyond</p>
          </div>
          
          <div className="space-y-4">
            {MOCK_PROPERTIES.map(property => (
              <div 
                key={property.id} 
                onClick={() => onSelectProperty?.(property.id)}
                className="bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all flex gap-5 cursor-pointer group animate-in slide-in-from-right-4"
              >
                <div className="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 relative shadow-inner">
                  <img src={property.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="thumb" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{property.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-1"><MapPin size={10} /> {property.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-blue-600">${property.price.toLocaleString()}</p>
                    <div className="flex gap-2">
                      <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded-lg uppercase">{property.beds} Bed</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
