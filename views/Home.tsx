
import React, { useState } from 'react';
import { PropertyGrid } from '../components/PropertyGrid';
import { MOCK_PROPERTIES, MOCK_AGENTS } from '../constants';
import { 
  Sparkles, ArrowRight, ShieldCheck, Zap, Home as HomeIcon, 
  Building2, Landmark, MapPin, Star, ChevronLeft, ChevronRight, UserCheck,
  TrendingUp, Globe, Building, Navigation, Clock, Flame
} from 'lucide-react';
import { User, Language } from '../types';
import { t } from '../services/translations';

interface HomeProps {
  user?: User;
  language: Language;
  onSelectProperty?: (id: string) => void;
  onChannelSelect?: (agentName: string) => void;
}

const CATEGORIES = (lang: Language) => [
  { id: 'all', labelKey: 'allListings', icon: <Globe size={18} /> },
  { id: 'villas', labelKey: 'luxuryVillas', icon: <HomeIcon size={18} /> },
  { id: 'apartments', labelKey: 'apartments', icon: <Building2 size={18} /> },
  { id: 'commercial', labelKey: 'commercial', icon: <Landmark size={18} /> },
  { id: 'plots', labelKey: 'plots', icon: <MapPin size={18} /> },
  { id: 'offices', labelKey: 'offices', icon: <Building size={18} /> },
  { id: 'diplomatic', labelKey: 'diplomatic', icon: <ShieldCheck size={18} /> },
];

export const Home: React.FC<HomeProps> = ({ user, language, onSelectProperty, onChannelSelect }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const isAdmin = user?.role === 'ADMIN';
  const promotedProperty = MOCK_PROPERTIES[0];

  // For demonstration "many" properties, we'll repeat the mock list
  const manyRecommended = [...MOCK_PROPERTIES, ...MOCK_PROPERTIES, ...MOCK_PROPERTIES].slice(0, 8);
  const newArrivals = MOCK_PROPERTIES.slice(0, 5); // Treat first 5 as new arrivals

  if (isAdmin) {
    return (
      <div className="space-y-12 animate-fadeIn">
        <section className="bg-slate-900 rounded-[40px] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl font-black tracking-tight">{t(language, 'dashboard')} Control</h1>
            <p className="text-slate-400 max-w-xl font-medium">Global platform analytics and administrative tools.</p>
          </div>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: t(language, 'revenue'), val: '$420k', icon: <Zap className="text-amber-500" /> },
            { label: t(language, 'analytics'), val: '8.4k', icon: <Sparkles className="text-blue-500" /> },
            { label: t(language, 'verification'), val: '1.2k', icon: <ShieldCheck className="text-emerald-500" /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              <div className="p-3 bg-slate-50 rounded-2xl w-fit mb-4">{stat.icon}</div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-fadeIn pb-32">
      {/* 1. Hero Section */}
      <section className="relative h-[500px] rounded-[48px] overflow-hidden group shadow-2xl">
        <img 
          src={promotedProperty.image} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt="promoted"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            {t(language, 'exclusiveOpportunity')}
          </div>
          <h3 className="text-5xl font-black leading-tight max-w-2xl">{t(language, 'heroTitle')}</h3>
          <p className="text-slate-300 text-lg font-medium max-w-xl line-clamp-2">{t(language, 'heroSubtitle')}</p>
          <div className="pt-6 flex gap-4">
            <button 
              onClick={() => onSelectProperty?.(promotedProperty.id)}
              className="px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-blue-50 transition-all text-xs uppercase tracking-widest shadow-xl"
            >
              {t(language, 'viewDetails')}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Topic Bar */}
      <section className="sticky top-0 z-30 -mx-4 px-4 py-2 bg-slate-50/80 backdrop-blur-md">
        <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
          {CATEGORIES(language).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              <span className={activeCategory === cat.id ? 'text-blue-400' : 'text-slate-400'}>
                {cat.icon}
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest">{t(language, cat.labelKey as any)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals (NEW SECTION) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Flame className="text-rose-500" size={28} /> New Arrivals
            </h2>
            <p className="text-slate-500 font-medium italic mt-1 ml-10">Fresh listings added to the market in the last 48 hours.</p>
          </div>
          <div className="flex gap-2">
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
                <ChevronLeft size={20} />
             </button>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 px-2">
          {newArrivals.map((p, idx) => (
            <div 
              key={`new-${p.id}`}
              onClick={() => onSelectProperty?.(p.id)}
              className="min-w-[320px] md:min-w-[400px] bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="new prop" />
                <div className="absolute top-4 left-4">
                  <div className="px-4 py-1.5 bg-rose-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <Clock size={12} strokeWidth={3} /> Just Listed
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                   <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{p.title}</h3>
                   <p className="text-lg font-black text-blue-600 ml-4">${(p.price/1000).toFixed(0)}k</p>
                </div>
                <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-tight">
                  <MapPin size={12} className="text-rose-400" /> {p.location}
                </p>
                <div className="pt-4 flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50">
                  <span className="flex items-center gap-1.5"><HomeIcon size={12} /> {p.type}</span>
                  <span className="flex items-center gap-1.5"><Navigation size={12} /> {p.area}</span>
                </div>
              </div>
            </div>
          ))}
          {/* View More Card */}
          <div className="min-w-[200px] flex flex-col items-center justify-center bg-blue-50 rounded-[40px] border-2 border-dashed border-blue-200 group cursor-pointer hover:bg-blue-100 transition-all">
             <div className="p-4 bg-white rounded-full text-blue-600 shadow-xl mb-4 group-hover:scale-110 transition-transform">
                <ArrowRight size={32} />
             </div>
             <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">See All New</p>
          </div>
        </div>
      </section>

      {/* 4. Recommended Discovery Grid */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Sparkles className="text-amber-500" size={28} /> {t(language, 'recommendedDiscovery')}
            </h2>
            <p className="text-slate-500 font-medium italic mt-1 ml-10">Curated listings based on market trends in Ethiopia.</p>
          </div>
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
             {t(language, 'more')} <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {manyRecommended.map((p, idx) => {
            const verifiedCount = p.agent?.verifiedCategories?.length || 0;
            const trustScore = Math.round((verifiedCount / 7) * 100);
            return (
              <div 
                key={`${p.id}-${idx}`} 
                onClick={() => onSelectProperty?.(p.id)}
                className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col"
              >
                <div className="relative h-64 overflow-hidden shadow-lg">
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="prop" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className={`px-3 py-1 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-sm`}>
                      {p.status.replace('_', ' ')}
                    </span>
                    <div className="px-3 py-1 bg-blue-600/90 backdrop-blur-md text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                      <ShieldCheck size={10} fill="white" className="text-blue-200" /> {trustScore}%
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{p.title}</h3>
                    <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 mt-1 uppercase tracking-tight">
                      <MapPin size={10} className="text-rose-400" /> {p.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <p className="text-xl font-black text-blue-600">${p.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-[9px] font-black uppercase">{p.beds} {language === 'AM' ? 'መኝታ' : language === 'OM' ? 'Siree' : 'Bed'}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="text-[9px] font-black uppercase">{p.sqft} ft²</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Top Agents Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-blue-600" size={28} /> {t(language, 'expertRepresentatives')}
            </h2>
            <p className="text-slate-500 font-medium italic mt-1 ml-10">The most active and responsive agents in East Africa.</p>
          </div>
          <button className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
             {t(language, 'directory')} <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_AGENTS.map((agent) => {
            return (
              <div 
                key={agent.id}
                onClick={() => onChannelSelect?.(agent.name)}
                className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group cursor-pointer text-center space-y-5"
              >
                <div className="relative inline-block">
                  <img 
                    src={agent.avatar} 
                    className="w-24 h-24 rounded-[32px] object-cover border-4 border-slate-50 shadow-lg group-hover:scale-105 transition-transform" 
                    alt={agent.name}
                  />
                  <div className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-500 text-white rounded-xl border-4 border-white">
                    <ShieldCheck size={14} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{agent.name}</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{agent.title}</p>
                </div>
                <div className="flex items-center justify-center gap-4 py-4 border-y border-slate-50">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">{language === 'AM' ? 'ሽያጭ' : language === 'OM' ? 'Gurgurtaa' : 'Deals'}</p>
                    <p className="text-sm font-black text-slate-800">{agent.stats.sold}</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100"></div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">Rating</p>
                    <p className="text-sm font-black text-slate-800 flex items-center gap-1">{agent.stats.rating} <Star size={10} fill="currentColor" className="text-amber-500" /></p>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-[9px] font-black uppercase mb-1.5">
                    <span className="text-slate-400">Response Power</span>
                    <span className="text-blue-600">98%</span>
                  </div>
                  <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="bg-slate-900 rounded-[40px] p-8 text-white flex flex-col justify-center items-center text-center space-y-5 border border-slate-800 relative overflow-hidden group hover:border-blue-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full"></div>
            <div className="p-4 bg-white/5 rounded-3xl border border-white/10 group-hover:scale-110 transition-transform">
              <TrendingUp size={32} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-black text-lg">Sell with Masara</h3>
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tight">Join Ethiopia's Elite Network</p>
            </div>
            <button className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
              Apply as Agent
            </button>
          </div>
        </div>
      </section>

      {/* 6. Top Score Real Estate Section */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <Landmark className="text-blue-900" size={28} /> {t(language, 'highTrustAgencies')}
            </h2>
            <p className="text-slate-500 font-medium italic mt-1 ml-10">Top-tier brands with 100% legal verification scores.</p>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-[60px] p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: 'Luxe Living Realty', score: 98, listings: 42, icon: 'LL' },
            { name: 'Addis Global Homes', score: 96, listings: 28, icon: 'AG' },
            { name: 'Safari Property Group', score: 94, listings: 124, icon: 'SP' },
          ].map((org, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-pointer">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-2xl font-black text-slate-900 shadow-xl border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {org.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{org.name}</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    <ShieldCheck size={12} /> {org.score}% Trust
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{org.listings} {t(language, 'property')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
