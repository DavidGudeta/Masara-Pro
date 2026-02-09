
import React, { useState, useMemo } from 'react';
import { 
  Play, Heart, MessageCircle, Share2, MoreVertical, Tv, Grid, List, 
  Search, Map as MapIcon, Info, Users, CheckCircle, Bell, ChevronRight,
  MapPin, Filter, Globe, BarChart3, TrendingUp, Star, Phone, Mail,
  CalendarDays, ShieldCheck
} from 'lucide-react';
import { Property, DocumentType } from '../types';
import { MOCK_PROPERTIES, MOCK_DIRECTORY_DOCS } from '../constants';

type ChannelTab = 'HOME' | 'VIDEOS' | 'PERFORMANCE' | 'MAP' | 'ABOUT';

interface ChannelProps {
  onSelectProperty?: (id: string) => void;
  onScheduleTour?: () => void;
}

export const Channel: React.FC<ChannelProps> = ({ onSelectProperty, onScheduleTour }) => {
  const [activeTab, setActiveTab] = useState<ChannelTab>('VIDEOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Calculate Trust Score based on verified documents in the mock directory
  // In a real app, we'd filter by the specific supplier ID
  const verifiedCount = MOCK_DIRECTORY_DOCS.filter(d => d.status === 'VERIFIED').length;
  const trustScore = Math.round((verifiedCount / 7) * 100);

  // Filter properties based on search query
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const featuredProperty = MOCK_PROPERTIES[0];

  return (
    <div className="space-y-0 pb-20 -mt-8 -mx-4 md:-mx-8 animate-fadeIn">
      {/* 1. YouTube-style Banner */}
      <div className="relative h-48 md:h-80 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1400" 
          className="w-full h-full object-cover"
          alt="Portfolio Banner"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
        
        {/* Floating Trust Badge on Banner */}
        <div className="absolute bottom-6 right-8 hidden md:block">
           <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-3xl flex items-center gap-4 shadow-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                 <ShieldCheck size={24} />
              </div>
              <div>
                 <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Legal Trust Score</p>
                 <p className="text-2xl font-black text-white leading-none">{trustScore}%</p>
              </div>
           </div>
        </div>
      </div>

      {/* 2. Channel Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative flex-shrink-0">
            <img 
              src="https://i.pravatar.cc/150?u=luxechannel" 
              className="w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-slate-50 shadow-2xl object-cover"
              alt="Owner Profile"
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Luxe Living Realty</h1>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 shadow-sm">
                <CheckCircle size={12} fill="currentColor" className="text-blue-200" />
                Verified Agency
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-bold text-slate-500">
              <span className="text-slate-900">@luxeliving</span>
              <span>12.4k followers</span>
              <span>86 property tours</span>
              <span className="md:hidden text-blue-600">Trust Score: {trustScore}%</span>
            </div>
            <p className="text-slate-500 text-sm max-w-2xl font-medium leading-relaxed">
              Experience elite living in East Africa. Our portfolio features exclusive 4K video tours, neighborhood deep-dives, and market insights for luxury seekers.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg ${
                  isSubscribed 
                  ? 'bg-slate-100 text-slate-600' 
                  : 'bg-slate-900 text-white hover:bg-red-600 shadow-slate-200'
                }`}
              >
                {isSubscribed ? <Bell size={16} /> : null}
                {isSubscribed ? 'Following' : 'Follow Brand'}
              </button>
              
              <button 
                onClick={onScheduleTour}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <CalendarDays size={16} /> Schedule Tour
              </button>

              <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>

        {/* 3. Sub-Navigation / Tabs */}
        <div className="flex items-center border-b border-slate-200 overflow-x-auto hide-scrollbar">
          {(['HOME', 'VIDEOS', 'PERFORMANCE', 'MAP', 'ABOUT'] as ChannelTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 pb-4 text-xs font-black uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab 
                ? 'border-slate-900 text-slate-900' 
                : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab === 'VIDEOS' ? 'Portfolio' : tab}
            </button>
          ))}
          
          <div className="ml-auto hidden md:flex items-center pb-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text"
                placeholder="Search portfolio"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-transparent text-sm font-medium border-none focus:ring-0 w-48 transition-all focus:w-64 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Tab Content Rendering */}
        <div className="py-8">
          {activeTab === 'HOME' && (
            <div className="space-y-12">
              {/* Trust Score & Verification Summary on Home Tab */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 <div className="md:col-span-1 bg-slate-900 rounded-[32px] p-6 text-white flex flex-col justify-between aspect-square">
                    <div>
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Overall Trust</p>
                       <h4 className="text-4xl font-black">{trustScore}%</h4>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-bold text-slate-400 leading-tight">Verified in 5/7 core legal and risk categories.</p>
                       <button onClick={() => setActiveTab('ABOUT')} className="text-[9px] font-black uppercase text-blue-400 hover:text-white transition-colors">View Directory Documents</button>
                    </div>
                 </div>
                 <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 items-center bg-slate-100/50 rounded-[40px] p-6 text-slate-900 relative overflow-hidden">
                    <div className="lg:col-span-2 space-y-4">
                       <h3 className="text-xl font-black">Featured Listing</h3>
                       <div className="flex items-center gap-4">
                          <img src={featuredProperty.image} className="w-24 h-24 rounded-2xl object-cover shadow-lg" alt="featured" />
                          <div>
                             <p className="font-black text-slate-800 line-clamp-1">{featuredProperty.title}</p>
                             <p className="text-xs text-slate-500 font-bold mb-2">{featuredProperty.location}</p>
                             <button 
                              onClick={() => onSelectProperty?.(featuredProperty.id)}
                              className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-blue-600 transition-colors"
                             >
                              View Tour
                             </button>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 uppercase">Avg. Rating</span>
                          <span className="flex items-center gap-1 text-sm font-black text-slate-800">4.9 <Star size={12} fill="currentColor" className="text-amber-500" /></span>
                       </div>
                       <hr className="border-slate-100" />
                       <button 
                        onClick={onScheduleTour}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                       >
                         <CalendarDays size={14} /> Schedule Now
                       </button>
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-900">Recently Uploaded</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MOCK_PROPERTIES.slice(0, 4).map((prop) => (
                    <VideoThumbnail 
                      key={prop.id} 
                      property={prop} 
                      onClick={() => onSelectProperty?.(prop.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'VIDEOS' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-widest">Latest</button>
                  <button className="px-4 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest hover:bg-slate-200">Popular</button>
                </div>
                <button className="flex items-center gap-2 text-slate-500 text-xs font-bold"><Filter size={14} /> Sort by</button>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                  {filteredProperties.map((prop) => (
                    <VideoThumbnail 
                      key={prop.id} 
                      property={prop} 
                      onClick={() => onSelectProperty?.(prop.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                   <div className="p-4 bg-slate-100 rounded-full w-fit mx-auto text-slate-400">
                      <Search size={32} />
                   </div>
                   <p className="text-slate-500 font-bold italic">No listings found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'PERFORMANCE' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { label: 'Properties Sold', val: '42', icon: <CheckCircle className="text-emerald-500" />, trend: '+12%' },
                   { label: 'Client Rating', val: '4.9/5', icon: <Star className="text-amber-500" fill="currentColor" />, trend: 'Top 1%' },
                   { label: 'Avg. Response', val: '15 min', icon: <MessageCircle className="text-blue-500" />, trend: 'Lightning fast' },
                 ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
                    </div>
                    <div className="mt-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-3xl font-black text-slate-800">{stat.val}</p>
                    </div>
                  </div>
                 ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-slate-800">Success Metrics</h3>
                    <div className="space-y-6">
                       {[
                         { label: 'Response Rate', value: 98, color: 'bg-blue-600' },
                         { label: 'Closing Rate', value: 76, color: 'bg-emerald-600' },
                         { label: 'Inquiry Conversion', value: 84, color: 'bg-indigo-600' },
                       ].map((metric, i) => (
                         <div key={i} className="space-y-2">
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                               <span className="text-slate-500">{metric.label}</span>
                               <span className="text-slate-900">{metric.value}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                               <div className={`h-full ${metric.color} transition-all duration-1000`} style={{ width: `${metric.value}%` }}></div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-black">Market Influence</h3>
                       <TrendingUp className="text-blue-400" />
                    </div>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed">
                       Ranked in the top 5% of verified agents in the Addis Ababa region based on transaction volume and customer satisfaction scores in Q4 2023.
                    </p>
                    <div className="pt-4 flex gap-4">
                       <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Views (30d)</p>
                          <p className="text-xl font-black">12.4k</p>
                       </div>
                       <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/10">
                          <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Inquiries</p>
                          <p className="text-xl font-black">156</p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'MAP' && (
            <div className="h-[600px] bg-slate-50 rounded-[40px] border border-slate-200 overflow-hidden relative shadow-inner animate-in zoom-in-95 duration-500">
               <div className="absolute inset-0 opacity-40" style={{backgroundImage: 'radial-gradient(#94a3b8 1.5px, transparent 0)', backgroundSize: '40px 40px'}}></div>
               {MOCK_PROPERTIES.map((p, i) => (
                 <div 
                   key={p.id} 
                   className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                   style={{ top: `${30 + i * 15}%`, left: `${40 + i * 10}%` }}
                   onClick={() => onSelectProperty?.(p.id)}
                 >
                   <div className="relative">
                      <div className="bg-slate-900 text-white px-3 py-2 rounded-2xl shadow-2xl border border-white/20 group-hover:bg-blue-600 transition-all flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={p.image} className="w-full h-full object-cover" alt="pin-thumb" />
                         </div>
                         <div className="text-left">
                            <p className="text-[10px] font-black whitespace-nowrap">{p.title}</p>
                            <p className="text-[9px] text-slate-400 group-hover:text-blue-100 font-bold">${(p.price/1000).toFixed(0)}k</p>
                         </div>
                      </div>
                      <div className="w-0.5 h-4 bg-slate-900 group-hover:bg-blue-600 mx-auto -mt-0.5"></div>
                   </div>
                 </div>
               ))}
               <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <button className="p-3 bg-white rounded-2xl shadow-xl text-slate-600 hover:text-blue-600 border border-slate-100"><Users size={18} /></button>
                  <button className="p-3 bg-white rounded-2xl shadow-xl text-slate-600 hover:text-blue-600 border border-slate-100"><MapIcon size={18} /></button>
               </div>
            </div>
          )}

          {activeTab === 'ABOUT' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <div className="lg:col-span-2 space-y-8">
                  <section className="space-y-4">
                     <h2 className="text-xl font-black text-slate-900">Description</h2>
                     <p className="text-slate-600 font-medium leading-relaxed">
                        Luxe Living Realty is East Africa's premier luxury real estate brand. We don't just list properties; we showcase lifestyles. 
                        Our team of professional cinematographers and real estate experts travel across Ethiopia, Kenya, and beyond to bring you the most exclusive developments and hidden gems.
                     </p>
                  </section>
                  <hr className="border-slate-100" />
                  <section className="space-y-4">
                     <h2 className="text-xl font-black text-slate-900">Full Contact Info</h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-1">
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Business Email</p>
                           <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
                             <Mail size={16} /> inquiry@luxeliving.com
                           </div>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Direct Line</p>
                           <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                             <Phone size={16} className="text-blue-600" /> +251 911 223 344
                           </div>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">HQ Location</p>
                           <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                             <MapPin size={16} className="text-blue-600" /> 4th Floor, Bole Medhanialem Tower, Addis Ababa
                           </div>
                        </div>
                     </div>
                  </section>
               </div>
               <div className="space-y-8">
                  <section className="space-y-4">
                     <h2 className="text-xl font-black text-slate-900">Verification Snapshot</h2>
                     <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                        <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                           <span className="text-slate-500">Legal Trust Score</span>
                           <span className="text-blue-600">{trustScore}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-600" style={{ width: `${trustScore}%` }}></div>
                        </div>
                        <p className="text-[10px] text-slate-400 italic">5 categories verified by Platform Admin team.</p>
                     </div>
                     <hr className="border-slate-100" />
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-600">
                           <Globe size={18} />
                           <span className="text-sm font-medium italic">Joined October 2021</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600">
                           <Tv size={18} />
                           <span className="text-sm font-medium italic">14.2M channel views</span>
                        </div>
                     </div>
                     <hr className="border-slate-100" />
                  </section>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                     <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><Share2 size={16} className="text-blue-600" /> Social Links</h3>
                     <div className="space-y-3">
                        <a href="#" className="flex items-center justify-between group">
                           <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">Instagram</span>
                           <ChevronRight size={14} className="text-slate-300" />
                        </a>
                        <a href="#" className="flex items-center justify-between group">
                           <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">TikTok</span>
                           <ChevronRight size={14} className="text-slate-300" />
                        </a>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VideoThumbnail: React.FC<{ property: Property, onClick?: () => void }> = ({ property, onClick }) => (
  <div className="group space-y-3 cursor-pointer" onClick={onClick}>
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-sm border border-slate-100 transition-all duration-300 group-hover:shadow-xl group-hover:border-blue-100">
      <img src={property.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={property.title} />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all"></div>
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 rounded text-[10px] font-black text-white uppercase tracking-widest">
        4:20
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white">
            <Play size={24} fill="currentColor" />
         </div>
      </div>
    </div>
    <div className="flex gap-3 px-1">
      <div className="flex-shrink-0 pt-1">
        <img src="https://i.pravatar.cc/150?u=luxechannel" className="w-9 h-9 rounded-full object-cover border border-slate-100" alt="uploader" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {property.title} in {property.location}
        </h4>
        <div className="flex flex-col text-[11px] font-bold text-slate-500 uppercase tracking-tight">
          <span>Luxe Living Realty</span>
          <div className="flex items-center gap-1">
            <span>2.4k views</span>
            <span className="text-slate-300">•</span>
            <span>2 days ago</span>
          </div>
        </div>
      </div>
      <button className="ml-auto p-1 opacity-0 group-hover:opacity-100 text-slate-400">
        <MoreVertical size={16} />
      </button>
    </div>
  </div>
);
