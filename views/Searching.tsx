
import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MapPin, Navigation, List, Grid, ChevronDown, 
  DollarSign, Home, Key, SlidersHorizontal, Map as MapIcon, 
  Heart, Share2, Play, Star, ShieldCheck, X, Locate, Layers, 
  MousePointer2, Save, Bell, Crosshair, ZoomIn, ZoomOut
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';
import { Property, Language } from '../types';
import { t } from '../services/translations';

interface SearchingProps {
  language: Language;
  onSelectProperty?: (id: string) => void;
  onChannelSelect?: (agentName: string) => void;
}

export const Searching: React.FC<SearchingProps> = ({ language, onSelectProperty, onChannelSelect }) => {
  const [viewMode, setViewMode] = useState<'SPLIT' | 'MAP_ONLY' | 'LIST_ONLY'>('SPLIT');
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [listingStatus, setListingStatus] = useState<'FOR_SALE' | 'FOR_RENT' | 'ANY'>('ANY');

  // Filter Logic
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = listingStatus === 'ANY' || p.status === listingStatus;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, listingStatus]);

  return (
    <div className="h-[calc(100vh-80px)] -m-4 md:-m-8 flex flex-col overflow-hidden bg-white">
      {/* 1. Zillow-style Top Filter Bar */}
      <div className="h-16 border-b border-slate-100 flex items-center px-4 md:px-6 gap-3 shrink-0 bg-white z-20">
        <div className="relative flex-1 max-w-sm group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm font-bold focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
            placeholder={t(language, 'searchPlaceholder')}
          />
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:border-blue-300 transition-all">
            {t(language, 'price')} <ChevronDown size={14} />
          </button>
          <button className="px-4 py-2.5 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:border-blue-300 transition-all">
            {t(language, 'bedsBaths')} <ChevronDown size={14} />
          </button>
          <button 
            onClick={() => setListingStatus(listingStatus === 'FOR_SALE' ? 'FOR_RENT' : listingStatus === 'FOR_RENT' ? 'ANY' : 'FOR_SALE')}
            className={`px-4 py-2.5 border rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${listingStatus !== 'ANY' ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-200 hover:border-blue-300'}`}
          >
            {listingStatus === 'ANY' ? t(language, 'homeType') : listingStatus.replace('_', ' ')} <ChevronDown size={14} />
          </button>
          <button className="px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-100 transition-all">
            <SlidersHorizontal size={14} /> {t(language, 'more')}
          </button>
        </div>

        <div className="h-8 w-px bg-slate-100 mx-2 hidden md:block"></div>
        <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2">
           <Save size={14} /> {t(language, 'saveSearch')}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Side: List View */}
        <div className={`flex-1 flex flex-col bg-slate-50 border-r border-slate-100 transition-all duration-500 ${viewMode === 'MAP_ONLY' ? 'translate-x-[-100%]' : 'translate-x-0'}`}>
           <div className="p-6 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-xl font-black text-slate-900">Ethiopia Homes</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{filteredProperties.length} Results</p>
              </div>
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                <button onClick={() => setViewMode('SPLIT')} className={`p-2 rounded-lg transition-all ${viewMode === 'SPLIT' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}><Grid size={18} /></button>
                <button onClick={() => setViewMode('LIST_ONLY')} className={`p-2 rounded-lg transition-all ${viewMode === 'LIST_ONLY' ? 'bg-slate-900 text-white' : 'text-slate-400'}`}><List size={18} /></button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto px-6 pb-20 space-y-6 hide-scrollbar">
              {filteredProperties.map((prop) => (
                <div 
                  key={prop.id}
                  onMouseEnter={() => setActiveProperty(prop)}
                  onClick={() => onSelectProperty?.(prop.id)}
                  className={`group bg-white rounded-[32px] overflow-hidden border transition-all cursor-pointer ${activeProperty?.id === prop.id ? 'border-blue-600 shadow-2xl scale-[1.01]' : 'border-slate-100'}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="home" />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                       <span className={`px-3 py-1 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-sm`}>
                         {prop.status.replace('_', ' ')}
                       </span>
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 transition-all shadow-lg"><Heart size={16} /></button>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-black text-slate-900">${prop.price.toLocaleString()}</h3>
                    <p className="text-sm font-bold text-slate-500 mt-1 flex items-center gap-1.5 uppercase tracking-tight"><MapPin size={14} className="text-rose-400" /> {prop.location}</p>
                    <div className="flex items-center gap-6 pt-4 text-[11px] font-black text-slate-600 uppercase tracking-widest border-t border-slate-50">
                       <div>{prop.beds} {language === 'AM' ? 'መኝታ' : language === 'OM' ? 'Siree' : 'Bds'}</div>
                       <div>{prop.baths} {language === 'AM' ? 'መታጠቢያ' : language === 'OM' ? 'Shawaara' : 'Ba'}</div>
                       <div>{prop.sqft.toLocaleString()} sqft</div>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Side: Map */}
        <div className={`flex-[1.2] bg-slate-100 relative overflow-hidden transition-all duration-500 ${viewMode === 'LIST_ONLY' ? 'translate-x-[100%]' : 'translate-x-0'}`}>
          <div className="absolute inset-0 bg-[#f8fafc]">
             <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 0)', backgroundSize: '60px 60px'}}></div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
             <div className="bg-slate-900/90 backdrop-blur-xl px-8 py-4 rounded-[24px] text-white flex items-center gap-8 shadow-2xl border border-white/10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest">{t(language, 'mapActive')}</span>
                </div>
                <div className="w-px h-4 bg-white/20"></div>
                <div className="flex items-center gap-3">
                   <MapIcon size={16} className="text-blue-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Addis Ababa, ET</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
