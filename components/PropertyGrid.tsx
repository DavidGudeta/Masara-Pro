
import React from 'react';
import { MapPin, BedDouble, Bath, Square, Play, Tv, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { Property, DocumentType } from '../types';

interface PropertyGridProps {
  properties: Property[];
  title?: string;
  onSelect?: (id: string) => void;
  onChannelSelect?: (agentName: string) => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, title, onSelect, onChannelSelect }) => {
  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-slate-800">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => {
          const verifiedCount = property.agent?.verifiedCategories?.length || 0;
          const trustScore = Math.round((verifiedCount / 7) * 100);
          const isFullyVerified = verifiedCount >= 6;

          return (
            <div key={property.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${property.status === 'FOR_SALE' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                    {property.status.replace('_', ' ')}
                  </span>
                  
                  {/* Trust Score Badge */}
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg backdrop-blur-md border ${
                    trustScore > 70 ? 'bg-emerald-600/90 text-white border-white/20' : 'bg-white/90 text-slate-900 border-slate-200'
                  }`}>
                    <ShieldCheck size={12} fill={trustScore > 70 ? 'white' : 'currentColor'} className={trustScore > 70 ? 'text-emerald-400' : 'text-blue-600'} />
                    Trust: {trustScore}%
                  </div>
                </div>
                
                <button 
                  onClick={() => onSelect?.(property.id)}
                  className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-blue-600 shadow-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Play size={20} fill="currentColor" />
                </button>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 
                      onClick={() => onSelect?.(property.id)}
                      className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer flex-1"
                    >
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-black text-slate-700">4.9</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1 text-slate-500">
                      <MapPin size={14} />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    {property.agent && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onChannelSelect?.(property.agent!.name);
                        }}
                        className="flex items-center gap-1.5 text-blue-600 font-bold hover:underline underline-offset-4 decoration-2 text-left w-fit"
                      >
                        <Tv size={12} />
                        <span className="text-[11px] uppercase tracking-wider">{property.agent.name}</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-slate-50">
                  {property.beds !== undefined && (
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Beds</span>
                      <div className="flex items-center gap-1 font-semibold text-slate-700">
                        <BedDouble size={16} /> {property.beds}
                      </div>
                    </div>
                  )}
                  {property.baths !== undefined && (
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-[10px] uppercase font-bold">Baths</span>
                      <div className="flex items-center gap-1 font-semibold text-slate-700">
                        <Bath size={16} /> {property.baths}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Area</span>
                    <div className="flex items-center gap-1 font-semibold text-slate-700">
                      <Square size={14} /> {property.sqft} <span className="text-[10px] font-normal">ft²</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-black text-blue-600">
                    ${property.price.toLocaleString()}
                    {property.status === 'FOR_RENT' && <span className="text-sm font-normal text-slate-400">/mo</span>}
                  </p>
                  <button 
                    onClick={() => onSelect?.(property.id)}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
