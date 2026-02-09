
import React, { useState } from 'react';
import { 
  Heart, Bookmark, Trash2, ChevronRight, MapPin, 
  BedDouble, Bath, Square, Play, ArrowRightLeft, 
  Sparkles, House, Info, Clock, ExternalLink
} from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';
import { Property } from '../types';

type SavedTab = 'WISH_LIST' | 'SAVED_LATER';

export const Saved: React.FC<{ onSelectProperty: (id: string) => void }> = ({ onSelectProperty }) => {
  const [activeTab, setActiveTab] = useState<SavedTab>('WISH_LIST');
  
  // Simulated initial state from MOCK_PROPERTIES
  const [wishList, setWishList] = useState<Property[]>(MOCK_PROPERTIES.slice(0, 2));
  const [savedLater, setSavedLater] = useState<Property[]>(MOCK_PROPERTIES.slice(2, 3));

  const moveToLater = (property: Property) => {
    setWishList(prev => prev.filter(p => p.id !== property.id));
    setSavedLater(prev => [...prev, property]);
  };

  const moveToWish = (property: Property) => {
    setSavedLater(prev => prev.filter(p => p.id !== property.id));
    setWishList(prev => [...prev, property]);
  };

  const removeFromList = (id: string, tab: SavedTab) => {
    if (tab === 'WISH_LIST') {
      setWishList(prev => prev.filter(p => p.id !== id));
    } else {
      setSavedLater(prev => prev.filter(p => p.id !== id));
    }
  };

  const currentList = activeTab === 'WISH_LIST' ? wishList : savedLater;

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
            <Heart size={14} fill="currentColor" /> Personal Collection
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Saved Collections</h1>
          <p className="text-slate-500 font-medium max-w-xl">Organize your dream homes and future investments in one centralized place.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] shadow-lg border border-slate-100">
          <button 
            onClick={() => setActiveTab('WISH_LIST')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === 'WISH_LIST' 
              ? 'bg-rose-600 text-white shadow-xl shadow-rose-200' 
              : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            <Heart size={14} fill={activeTab === 'WISH_LIST' ? 'white' : 'transparent'} />
            Wish List ({wishList.length})
          </button>
          <button 
            onClick={() => setActiveTab('SAVED_LATER')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === 'SAVED_LATER' 
              ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
              : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            <Bookmark size={14} fill={activeTab === 'SAVED_LATER' ? 'white' : 'transparent'} />
            For Later ({savedLater.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      {currentList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {currentList.map((property) => (
            <div 
              key={property.id} 
              className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Visual Area */}
                <div className="w-full lg:w-72 h-56 rounded-[32px] overflow-hidden relative shrink-0 shadow-2xl">
                  <img src={property.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="prop" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-lg">
                      {property.status.replace('_', ' ')}
                    </span>
                  </div>
                  <button 
                    onClick={() => onSelectProperty(property.id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{property.title}</h3>
                        <p className="text-sm text-slate-400 font-bold flex items-center gap-2 mt-1">
                          <MapPin size={14} className="text-rose-400" /> {property.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Market Value</p>
                        <p className="text-2xl font-black text-blue-600">${property.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 py-4 border-y border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase">Beds</span>
                        <div className="flex items-center gap-1.5 font-black text-slate-800"><BedDouble size={16} /> {property.beds}</div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase">Baths</span>
                        <div className="flex items-center gap-1.5 font-black text-slate-800"><Bath size={16} /> {property.baths}</div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase">Size</span>
                        <div className="flex items-center gap-1.5 font-black text-slate-800"><Square size={16} /> {property.sqft} <span className="text-[10px] font-normal">ft²</span></div>
                      </div>
                      <div className="ml-auto hidden sm:flex items-center gap-3">
                         <img src={property.agent?.avatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" alt="agent" />
                         <div className="text-left">
                            <p className="text-[10px] text-slate-400 font-black uppercase">Verified Agent</p>
                            <p className="text-xs font-black text-slate-800">{property.agent?.name}</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onSelectProperty(property.id)}
                        className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all flex items-center gap-2"
                      >
                        View Details <ChevronRight size={14} />
                      </button>
                      <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl transition-colors border border-slate-100">
                        <ExternalLink size={18} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => activeTab === 'WISH_LIST' ? moveToLater(property) : moveToWish(property)}
                        className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-500 hover:text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        <ArrowRightLeft size={14} />
                        {activeTab === 'WISH_LIST' ? 'Save for Later' : 'Move to Wishlist'}
                      </button>
                      <button 
                        onClick={() => removeFromList(property.id, activeTab)}
                        className="p-3 bg-rose-50 text-rose-400 hover:bg-rose-600 hover:text-white rounded-2xl transition-all"
                        title="Remove from saved"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 bg-white rounded-[60px] border border-dashed border-slate-200 text-center space-y-6">
          <div className="relative inline-block">
             <div className={`p-8 rounded-[40px] mx-auto w-fit ${activeTab === 'WISH_LIST' ? 'bg-rose-50 text-rose-300' : 'bg-slate-50 text-slate-300'}`}>
                {activeTab === 'WISH_LIST' ? <Heart size={64} /> : <Bookmark size={64} />}
             </div>
             <div className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-xl">
                <Clock size={24} className="text-blue-500" />
             </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800">Your {activeTab === 'WISH_LIST' ? 'Wish List' : 'Archive'} is Empty</h2>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">Browse our exclusive properties and heart your favorites to see them here.</p>
          </div>
          <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all text-xs uppercase tracking-widest shadow-xl shadow-slate-200">
            Start Exploring
          </button>
        </div>
      )}

      {/* Suggested Section */}
      <div className="pt-10 space-y-6">
         <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <Sparkles size={20} className="text-amber-500" /> Based on your activity
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_PROPERTIES.slice(0, 3).map(p => (
               <div key={p.id} className="bg-slate-50/50 p-4 rounded-[32px] border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-white hover:shadow-xl transition-all" onClick={() => onSelectProperty(p.id)}>
                  <img src={p.image} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt="sug" />
                  <div>
                     <p className="text-sm font-black text-slate-800 line-clamp-1">{p.title}</p>
                     <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">${(p.price/1000).toFixed(0)}k</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-blue-600" />
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
