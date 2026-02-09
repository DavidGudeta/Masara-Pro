
import React from 'react';
import { 
  ShieldCheck, MapPin, Phone, Mail, Star, Users, Briefcase, 
  CheckCircle2, ChevronRight, Play, Info, Landmark, UserCheck, 
  FileText, Gavel, CalendarClock, MessageSquare, Heart, Share2, 
  ArrowRight, Tv
} from 'lucide-react';
import { Agent, DocumentType, Property } from '../types';
import { MOCK_PROPERTIES } from '../constants';
import { PropertyGrid } from '../components/PropertyGrid';

interface AgentDetailsProps {
  agent: Agent;
  onBack: () => void;
  onSelectProperty: (id: string) => void;
  onSendInquiry?: () => void;
  onScheduleTour?: () => void;
  onViewPortfolio?: () => void;
}

const CATEGORIES: { type: DocumentType; label: string; icon: React.ReactNode }[] = [
  { type: 'BUSINESS_LICENSE', label: 'Business License', icon: <Briefcase size={16} /> },
  { type: 'PROPERTY_OWNERSHIP', label: 'Ownership Deeds', icon: <Landmark size={16} /> },
  { type: 'AGENT_VERIFY', label: 'Identity Check', icon: <UserCheck size={16} /> },
  { type: 'TAX_COMPLIANCE', label: 'Tax Compliant', icon: <FileText size={16} /> },
  { type: 'ADDRESS_PROOF', label: 'Address Verified', icon: <MapPin size={16} /> },
  { type: 'BACKGROUND_CHECK', label: 'Risk & Debt', icon: <ShieldCheck size={16} /> },
  { type: 'LEGAL_MATTERS', label: 'Legal Clear', icon: <Gavel size={16} /> },
];

export const AgentDetails: React.FC<AgentDetailsProps> = ({ 
  agent, 
  onBack, 
  onSelectProperty, 
  onSendInquiry,
  onScheduleTour,
  onViewPortfolio
}) => {
  const trustScore = Math.round((agent.verifiedCategories.length / 7) * 100);
  const agentProperties = MOCK_PROPERTIES.filter(p => p.agent?.name === agent.name);

  return (
    <div className="max-w-6xl mx-auto pb-20 space-y-8 animate-fadeIn">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest"
      >
        <ChevronRight size={16} className="rotate-180" /> Back to listings
      </button>

      {/* Hero Section */}
      <div className="relative h-96 rounded-[48px] overflow-hidden bg-slate-900 shadow-2xl">
        <img src={agent.banner} className="w-full h-full object-cover opacity-40" alt="banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        
        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
           <div className="flex items-center gap-8">
              <div className="relative">
                <img 
                  src={agent.avatar} 
                  className="w-32 h-32 rounded-[32px] border-4 border-white shadow-2xl object-cover" 
                  alt={agent.name} 
                />
                <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 text-white rounded-xl border-4 border-white">
                  <ShieldCheck size={16} />
                </div>
              </div>
              <div className="text-white space-y-1">
                 <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black tracking-tight">{agent.name}</h1>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20">
                      Verified {agent.title}
                    </span>
                 </div>
                 <p className="flex items-center gap-2 text-slate-300 font-medium">
                    <MapPin size={16} className="text-blue-400" /> {agent.location}
                 </p>
              </div>
           </div>
           
           <div className="flex gap-3">
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 hover:bg-white/20 transition-all shadow-xl">
                 <Heart size={20} />
              </button>
              <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20 hover:bg-white/20 transition-all shadow-xl">
                 <Share2 size={20} />
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Main Info Column */}
        <div className="lg:col-span-2 space-y-12">
           {/* Stats Summary */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Properties', val: agent.stats.listings, icon: <Briefcase size={20} /> },
                { label: 'Sold/Rented', val: agent.stats.sold, icon: <Users size={20} /> },
                { label: 'Experience', val: agent.stats.experience, icon: <CalendarClock size={20} /> },
                { label: 'Rating', val: `${agent.stats.rating}/5`, icon: <Star size={20} className="text-amber-500" fill="currentColor" /> },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-2">
                   <div className="text-blue-600">{stat.icon}</div>
                   <div>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{stat.label}</p>
                      <p className="text-lg font-black text-slate-800">{stat.val}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* About Section */}
           <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Professional Profile</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium italic">
                 {agent.bio}
              </p>
           </section>

           {/* Trust & Verification Section */}
           <section className="bg-slate-900 rounded-[40px] p-10 text-white space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight">Legal & Risk Profile</h2>
                    <p className="text-slate-400 text-sm font-medium italic">Comprehensive compliance verification for your safety.</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] text-center min-w-[140px] shadow-2xl">
                    <p className="text-5xl font-black text-blue-400">{trustScore}%</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Platform Trust Score</p>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                 {CATEGORIES.map((cat, i) => {
                    const isVerified = agent.verifiedCategories.includes(cat.type);
                    return (
                      <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${isVerified ? 'bg-white/5 border-white/10 text-white shadow-xl' : 'bg-transparent border-white/5 text-slate-600'}`}>
                         <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${isVerified ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-700'}`}>
                               {cat.icon}
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-widest">{cat.label}</span>
                         </div>
                         {isVerified ? (
                           <CheckCircle2 size={18} className="text-emerald-500" />
                         ) : (
                           <span className="text-[9px] font-black opacity-30 italic">Not Verified</span>
                         )}
                      </div>
                    );
                 })}
              </div>

              <div className="pt-8 border-t border-white/5 flex items-start gap-4 text-xs font-bold text-slate-500 italic">
                 <Info size={18} className="text-blue-500 shrink-0" />
                 <span>Our Compliance Department manually reviews every document submitted by agents. A 100% score indicates the agency has passed every legal and financial risk assessment on our platform.</span>
              </div>
           </section>

           {/* Active Portfolio */}
           <section className="space-y-8">
              <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-black text-slate-800 tracking-tight">Active Portfolio</h2>
                 <button className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                    View All {agent.stats.listings} Listings <ArrowRight size={14} />
                 </button>
              </div>
              <PropertyGrid 
                properties={agentProperties} 
                onSelect={onSelectProperty}
              />
           </section>
        </div>

        {/* Action Sidebar */}
        <div className="lg:sticky lg:top-24 space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl space-y-8">
              <div className="space-y-4 text-center">
                 <img src={agent.avatar} className="w-24 h-24 rounded-[32px] mx-auto object-cover shadow-xl border-4 border-slate-50" alt="profile" />
                 <div>
                    <h3 className="text-xl font-black text-slate-900">{agent.name}</h3>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{agent.title}</p>
                 </div>
              </div>

              <div className="space-y-3">
                 <button 
                   onClick={onSendInquiry}
                   className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest"
                 >
                    <MessageSquare size={18} /> Initiate Conversation
                 </button>
                 <button 
                   onClick={onScheduleTour}
                   className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest"
                 >
                    <CalendarClock size={18} /> Book Consultation
                 </button>
                 <button 
                   onClick={onViewPortfolio}
                   className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest shadow-lg shadow-slate-200"
                 >
                    <Tv size={18} /> Enter Channel
                 </button>
                 <a 
                   href={`tel:${agent.phone}`}
                   className="w-full py-4 bg-slate-50 text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 uppercase text-[11px] tracking-widest"
                 >
                    <Phone size={18} /> Direct Call
                 </a>
              </div>

              <hr className="border-slate-50" />

              <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Availability</p>
                 <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700">
                    <CalendarClock size={16} className="text-blue-500" />
                    Mon - Sat • 9:00 - 18:00
                 </div>
              </div>
           </div>

           <div className="bg-blue-50 p-6 rounded-[32px] border border-blue-100/50 space-y-3">
              <h4 className="text-sm font-black text-blue-900 flex items-center gap-2">
                 <ShieldCheck size={16} /> Trust Guarantee
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                 All transactions handled by {agent.name.split(' ')[0]} are protected by our platform legal insurance up to $50k.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
