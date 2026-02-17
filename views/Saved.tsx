
import React, { useState, useEffect } from 'react';
import { 
  Heart, Bookmark, Trash2, ChevronRight, MapPin, 
  BedDouble, Bath, Square, Play, ArrowRightLeft, 
  Sparkles, Clock, ExternalLink, Loader2
} from 'lucide-react';
import api from '../services/api';
import { Property } from '../types';

export const Saved: React.FC<{ onSelectProperty: (id: string) => void }> = ({ onSelectProperty }) => {
  const [wishList, setWishList] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get('/users/wishlist');
        setWishList(res.data);
      } catch (err) {
        console.error("Wishlist fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const removeFromList = async (id: string) => {
    try {
      await api.delete(`/users/wishlist/${id}`);
      setWishList(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Removal failed");
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-rose-500" size={48} />
      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Curating Your Collection...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100">
            <Heart size={14} fill="currentColor" /> Personal Collection
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Saved Collections</h1>
        </div>
      </div>

      {wishList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {wishList.map((property) => (
            <div 
              key={property.id} 
              className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
            >
               {/* Visual & Detail structure same as original */}
               <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-72 h-56 rounded-[32px] overflow-hidden relative shrink-0 shadow-2xl">
                  <img src={property.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="prop" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-slate-900 shadow-lg">
                      {property.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{property.title}</h3>
                        <p className="text-sm text-slate-400 font-bold flex items-center gap-2 mt-1">
                          <MapPin size={14} className="text-rose-400" /> {property.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                    <button 
                      onClick={() => onSelectProperty(property.id)}
                      className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all flex items-center gap-2"
                    >
                      View Details <ChevronRight size={14} />
                    </button>
                    <button 
                      onClick={() => removeFromList(property.id)}
                      className="p-3 bg-rose-50 text-rose-400 hover:bg-rose-600 hover:text-white rounded-2xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 bg-white rounded-[60px] border border-dashed border-slate-200 text-center space-y-6">
           <Heart size={64} className="mx-auto text-slate-200" />
           <p className="text-slate-400 font-bold uppercase tracking-widest">No saved properties yet</p>
        </div>
      )}
    </div>
  );
};
