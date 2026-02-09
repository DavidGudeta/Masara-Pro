
import React, { useState } from 'react';
import { Search, Play, Filter, MapPin, Tv } from 'lucide-react';
import { MOCK_PROPERTIES } from '../constants';

interface TourProps {
  onSelectProperty: (id: string) => void;
  onChannelSelect?: (agentName: string) => void;
}

export const Tour: React.FC<TourProps> = ({ onSelectProperty, onChannelSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTours = MOCK_PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Virtual Tours</h1>
          <p className="text-slate-500 font-medium italic">Experience your future home from anywhere.</p>
        </div>
        
        <div className="w-full md:w-96">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours by location or property..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-100 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tour Grid (TikTok/YouTube style) */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map((tour) => (
            <div 
              key={tour.id} 
              onClick={() => onSelectProperty(tour.id)}
              className="group cursor-pointer space-y-3"
            >
              <div className="relative aspect-[9/16] rounded-[32px] overflow-hidden bg-slate-900 shadow-xl">
                <img 
                  src={tour.image} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                  alt={tour.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white">
                    <Play size={32} fill="currentColor" />
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                  <h3 className="text-lg font-black leading-tight line-clamp-2">{tour.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 flex items-center gap-1">
                    <MapPin size={10} /> {tour.location}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-black">${(tour.price/1000).toFixed(0)}k</span>
                    <div className="flex -space-x-2">
                      <img src={tour.agent?.avatar} className="w-6 h-6 rounded-full border-2 border-slate-900" alt="agent" />
                    </div>
                  </div>
                </div>

                {/* Price Tag */}
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-900 shadow-lg">
                    {tour.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Channel/Agent Link */}
              <div className="flex items-center gap-2 px-2">
                 <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onChannelSelect?.(tour.agent?.name || '');
                  }}
                  className="flex items-center gap-2 text-blue-600 hover:underline decoration-2"
                >
                  <Tv size={14} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{tour.agent?.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center space-y-4">
          <div className="p-6 bg-white rounded-full w-fit mx-auto shadow-xl text-slate-300">
            <Search size={48} />
          </div>
          <p className="text-slate-500 font-black italic">No tours match your search criteria.</p>
        </div>
      )}
    </div>
  );
};
