
import React, { useState } from 'react';
import { 
  MapPin, BedDouble, Bath, Square, Calendar, ShieldCheck, Heart, Share2, 
  ChevronLeft, Star, CheckCircle2, Phone, Mail, MessageSquare, Play, Info,
  Scale, Landmark, UserCheck, FileText, Gavel, Briefcase, CalendarClock, Tv, 
  User, Building2, Layers, DollarSign, Globe, Smartphone, ArrowRight,
  Zap, Droplets, Shield, Fan, Waves, WashingMachine, Construction, Lock, Map as MapIcon,
  Key, Clock, TrendingUp, HandCoins
} from 'lucide-react';
import { Property, DocumentType } from '../types';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
  onSelectProperty: (id: string) => void;
  onChannelSelect?: (agentName: string) => void;
  onAgentSelect?: (agentName: string) => void;
  onScheduleTour?: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ 
  property, 
  onBack, 
  onSelectProperty, 
  onChannelSelect,
  onAgentSelect,
  onScheduleTour
}) => {
  const [activeTab, setActiveTab] = useState<'FACTS' | 'FINANCE' | 'LEGAL' | 'NEIGHBORHOOD'>('FACTS');
  const verifiedCount = property.agent?.verifiedCategories?.length || 0;
  const trustScore = Math.round((verifiedCount / 7) * 100);

  const DataRow = ({ label, value, icon }: { label: string, value: any, icon?: React.ReactNode }) => (
    <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group">
      <div className="flex items-center gap-3">
        <div className="text-slate-400 group-hover:text-blue-500 transition-colors">{icon}</div>
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      </div>
      <span className="text-sm font-black text-slate-800">{value !== undefined && value !== null ? (typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value) : 'N/A'}</span>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto pb-20 space-y-8 animate-fadeIn">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between px-2">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-black text-[10px] uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to listings
        </button>
        <div className="flex items-center gap-4">
           <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all shadow-sm">
             <Heart size={14} className="text-slate-400" /> Save
           </button>
           <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-all shadow-sm">
             <Share2 size={14} className="text-slate-400" /> Share
           </button>
        </div>
      </div>

      {/* 2. Visual Identity */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[600px]">
        <div className="lg:col-span-3 relative rounded-[40px] overflow-hidden group shadow-2xl h-[400px] lg:h-full">
           <img src={property.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" alt="property" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
           <div className="absolute bottom-10 left-10 text-white">
              <div className="flex gap-3 mb-4">
                 <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={12} /> {property.listing_status}
                 </span>
                 {property.investment_property && <span className="px-4 py-1.5 bg-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Investment Grade</span>}
              </div>
              <h1 className="text-5xl font-black tracking-tight drop-shadow-lg leading-none">{property.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-slate-300 font-medium text-lg">
                <MapPin size={20} className="text-rose-400" /> {property.location}
              </p>
           </div>
           <button className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-all">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                 <Play size={40} fill="white" />
              </div>
           </button>
        </div>
        <div className="hidden lg:flex flex-col gap-4">
           <div className="flex-1 relative rounded-[40px] overflow-hidden shadow-xl border border-white">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="interior" />
           </div>
           <div className="flex-1 relative rounded-[40px] overflow-hidden shadow-xl border border-white">
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="interior" />
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-black uppercase text-[10px] tracking-[0.2em] hover:bg-black/20 transition-all">
                 View all media
              </button>
           </div>
        </div>
      </div>

      {/* 3. Main Data Core */}
      <div className="flex flex-col lg:flex-row gap-12 items-start mt-8">
        
        {/* Left Column: Extensive Features */}
        <div className="flex-1 space-y-12">
          
          {/* Quick Core Bar */}
          <section className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing (Birr)</p>
                <p className="text-2xl font-black text-blue-600">ETB {property.price_etb?.toLocaleString()}</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Structure</p>
                <p className="text-2xl font-black text-slate-800">{property.structure}</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Area</p>
                <p className="text-2xl font-black text-slate-800">{property.net_area_sqm} <span className="text-sm">sqm</span></p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Beds/Baths</p>
                <p className="text-2xl font-black text-slate-800">{property.beds} / {property.baths}</p>
             </div>
          </section>

          {/* Detailed Variable Categorization */}
          <section className="bg-white rounded-[48px] border border-slate-100 shadow-xl overflow-hidden">
             <div className="flex border-b border-slate-50 overflow-x-auto hide-scrollbar">
                {[
                  { id: 'FACTS', label: 'Facts & Features', icon: <Layers size={14}/> },
                  { id: 'FINANCE', label: 'Price & Finance', icon: <DollarSign size={14}/> },
                  { id: 'LEGAL', label: 'Legal & Docs', icon: <Gavel size={14}/> },
                  { id: 'NEIGHBORHOOD', label: 'Neighborhood', icon: <MapPin size={14}/> },
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-10 py-6 text-[11px] font-black uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${
                      activeTab === tab.id ? 'border-blue-600 text-blue-600 bg-blue-50/10' : 'border-transparent text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
             </div>

             <div className="p-10">
                {activeTab === 'FACTS' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 animate-fadeIn">
                     <div className="space-y-8">
                        <div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">Property Core</h3>
                           <DataRow label="Property Type" value={property.type} icon={<Building2 size={16}/>} />
                           <DataRow label="Listing Type" value={property.status.replace('_', ' ')} />
                           <DataRow label="Listing ID" value={`MAS-${property.id}`} />
                           <DataRow label="Status Date" value={property.status_date} icon={<Calendar size={16}/>} />
                           <DataRow label="Move-in Ready" value={true} />
                        </div>
                        <div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">Size & Layout</h3>
                           <DataRow label="Total Area" value={`${property.total_area_sqm} sqm`} icon={<Square size={16}/>} />
                           <DataRow label="Net Area" value={`${property.net_area_sqm} sqm`} />
                           <DataRow label="Floor Number" value={`Level ${property.floor_number}`} />
                           <DataRow label="Total Floors" value={property.total_floors} />
                           <DataRow label="Store Room" value={property.store_room} />
                           <DataRow label="Units per Floor" value={property.units_per_floor} />
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">Building & Amenities</h3>
                           <DataRow label="Structure" value={property.structure} icon={<Construction size={16}/>} />
                           <DataRow label="Building Class" value={property.building_type} />
                           <DataRow label="Elevator" value={property.elevator} />
                           <DataRow label="Parking" value={property.parking_available} icon={<Smartphone size={16}/>} />
                           <DataRow label="Gym" value={property.has_gym} icon={<WashingMachine size={16}/>} />
                           <DataRow label="Sauna / Steam" value={property.has_sauna || property.has_steam} icon={<Waves size={16}/>} />
                           <DataRow label="Common Laundry" value={property.has_common_laundry} />
                           <DataRow label="Terrace" value={property.has_terrace} icon={<Fan size={16}/>} />
                        </div>
                        <div>
                           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6 flex items-center gap-2">Infrastructure</h3>
                           <DataRow label="Security" value={property.security_type || '24/7 Professional'} icon={<Lock size={16}/>} />
                           <DataRow label="Water Supply" value={property.water_supply || 'Utility + Reservoir'} icon={<Droplets size={16}/>} />
                           <DataRow label="Language" value={property.listing_language} icon={<Globe size={16}/>} />
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'FINANCE' && (
                  <div className="space-y-10 animate-fadeIn">
                     <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                           <div className="space-y-4">
                              <h2 className="text-3xl font-black">Financial Snapshot</h2>
                              <p className="text-slate-400 text-sm max-w-md italic">Investment grade property with verified cash transaction history.</p>
                           </div>
                           <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] text-center min-w-[200px]">
                              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Estimated ROI</p>
                              <p className="text-4xl font-black">7.2%</p>
                              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Annual Yield</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 relative z-10">
                           <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                              <DataRow label="Price (ETB)" value={property.price_etb?.toLocaleString()} icon={<HandCoins className="text-blue-400" size={16}/>} />
                              <DataRow label="Price (USD)" value={`$${property.price?.toLocaleString()}`} />
                              <DataRow label="Payment Method" value={property.payment_method} />
                           </div>
                           <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                              <DataRow label="Monthly Rent (ETB)" value={property.monthly_rent_etb?.toLocaleString()} />
                              <DataRow label="Rental Status" value={property.rental_status} />
                              <DataRow label="Investment Grade" value={property.investment_property} />
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'LEGAL' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fadeIn">
                     <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">Title & Ownership</h3>
                        <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-4">
                           <DataRow label="Ownership Type" value={property.ownership_type || 'Freehold'} icon={<Shield size={16}/>} />
                           <DataRow label="Legal Status" value={property.legal_status || 'Fully Verified'} />
                           <DataRow label="Digital Map" value={property.digital_map_available} icon={<MapIcon size={16}/>} />
                        </div>
                     </div>
                     <div className="space-y-8">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">Verification Audit</h3>
                        <div className="bg-emerald-50 p-8 rounded-[32px] border border-emerald-100 flex items-center gap-6">
                           <div className="p-4 bg-white rounded-2xl text-emerald-600 shadow-sm"><ShieldCheck size={32}/></div>
                           <div>
                              <p className="text-lg font-black text-emerald-900">7-Point Audit Passed</p>
                              <p className="text-xs text-emerald-700 font-medium italic">This property has been manually reviewed by Masara legal department.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                )}

                {activeTab === 'NEIGHBORHOOD' && (
                  <div className="space-y-10 animate-fadeIn">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
                           <DataRow label="Country" value={property.country} icon={<Globe size={16}/>} />
                           <DataRow label="City" value={property.city} />
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
                           <DataRow label="Sub-City" value={property.sub_city} />
                           <DataRow label="Area" value={property.area} />
                        </div>
                        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 space-y-4">
                           <DataRow label="Landmark" value={property.landmark} icon={<Landmark size={16}/>} />
                        </div>
                     </div>
                     <div className="p-10 bg-blue-50 rounded-[40px] border border-blue-100 space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Address Description</h3>
                        <p className="text-sm font-medium text-blue-900 leading-relaxed italic">{property.address_description || "Adjacent to the new commercial development corridor."}</p>
                     </div>
                  </div>
                )}
             </div>
          </section>

          {/* Viewing Schedule Section */}
          <section className="bg-slate-900 rounded-[48px] p-10 space-y-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="p-4 bg-blue-600 rounded-[24px] text-white shadow-lg">
                   <Calendar size={28} />
                </div>
                <div>
                   <h2 className="text-2xl font-black tracking-tight">Viewing Schedule</h2>
                   <p className="text-blue-400 font-bold text-sm">Real-time availability for property tours</p>
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {[
                  { day: 'Monday - Friday', time: property.viewing_monday_friday, icon: <Clock size={16}/> },
                  { day: 'Saturday', time: property.viewing_saturday, icon: <Star size={16} fill="currentColor"/> },
                  { day: 'Sunday', time: property.viewing_sunday, icon: <Globe size={16}/> },
                ].map((s, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/10 shadow-sm space-y-2">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.day}</p>
                     <div className="flex items-center gap-2 text-sm font-black text-white">
                        {s.icon} {s.time}
                     </div>
                  </div>
                ))}
             </div>
             
             <button 
                onClick={onScheduleTour}
                className="w-full py-5 bg-white text-slate-900 font-black rounded-3xl shadow-xl hover:bg-blue-50 transition-all uppercase text-[11px] tracking-widest flex items-center justify-center gap-3 relative z-10"
             >
                <CalendarClock size={20} /> Request Viewing Time
             </button>
          </section>

        </div>

        {/* Right Column: Agent & Platform */}
        <div className="w-full lg:w-[400px] lg:sticky lg:top-24 space-y-6">
          
          <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-2xl space-y-8">
             <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <img src={property.agent?.avatar} className="w-28 h-28 rounded-[40px] mx-auto object-cover shadow-2xl border-4 border-slate-50" alt="profile" />
                  <div className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-2xl border-4 border-white">
                     <ShieldCheck size={18} />
                  </div>
                </div>
                <div>
                   <h3 className="text-2xl font-black text-slate-900">{property.agent?.name}</h3>
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Certified Platform Expert</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-amber-500 font-black">
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <span className="text-slate-800 text-xs ml-1">5.0</span>
                </div>
             </div>

             <div className="space-y-3">
                <button 
                  onClick={onScheduleTour}
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-[24px] shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest"
                >
                   <MessageSquare size={18} /> Direct Inquiry
                </button>
                <button 
                  onClick={() => onAgentSelect?.(property.agent?.name || '')}
                  className="w-full py-5 bg-slate-900 text-white font-black rounded-[24px] hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest shadow-lg shadow-slate-200"
                >
                   <UserCheck size={18} /> View Agent Profile
                </button>
                <button 
                  onClick={() => onChannelSelect?.(property.agent?.name || '')}
                  className="w-full py-5 bg-slate-50 text-slate-600 font-black rounded-[24px] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest border border-slate-100"
                >
                   <Tv size={18} /> View Portfolio
                </button>
                <a 
                  href={`tel:${property.agent?.phone}`}
                  className="w-full py-5 border-2 border-slate-100 text-slate-400 font-black rounded-[24px] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 uppercase text-[11px] tracking-widest"
                >
                   <Phone size={18} /> {property.agent?.phone}
                </a>
             </div>

             <div className="pt-6 border-t border-slate-50 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                   <span>Agency Commission</span>
                   <span className="text-slate-900">{property.agent?.agent_commission_percent}%</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                   <span>Platform Status</span>
                   <span className="text-emerald-600 flex items-center gap-1 font-black uppercase text-[9px] tracking-widest"><CheckCircle2 size={12}/> Verified Listing</span>
                </div>
                <div className="pt-2">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Official Website</p>
                   <p className="text-sm font-bold text-blue-600 text-center truncate italic">{property.agent?.website_url}</p>
                </div>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
             <h4 className="text-xl font-black flex items-center gap-2 relative z-10"><Zap size={20} className="text-blue-400"/> Instant Market Value</h4>
             <p className="text-slate-400 text-sm font-medium italic relative z-10">This property is currently priced <span className="text-white font-bold">4.2% below</span> the neighborhood average for {property.area}.</p>
             <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all relative z-10">
                View Full Valuation
             </button>
          </div>
        </div>
      </div>

      {/* 4. Marketing Copy Section */}
      <section className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm space-y-8">
         <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Property Narrative</h2>
            <p className="text-xl font-bold text-blue-600 italic">"{property.headline || 'A Masterpiece of Modern Design'}"</p>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">{property.full_description || property.short_description}</p>
         </div>
      </section>
    </div>
  );
};
