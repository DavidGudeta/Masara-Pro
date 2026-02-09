
import React, { useState } from 'react';
import { 
  Send, MapPin, DollarSign, Home, Key, CheckCircle, Zap, 
  Sparkles, Clock, Users, ArrowRight, ShieldCheck, Search,
  PlusCircle, LayoutList, BellRing, MoreVertical, X, Trash2,
  Edit3, ChevronRight, Activity, MessageSquare, Star, Tv, Calendar
} from 'lucide-react';
import { Language } from '../types';

interface RequestProps {
  language: Language;
  onChannelSelect?: (agentName: string) => void;
}

interface ActiveRequest {
  id: string;
  type: 'BUY' | 'RENT';
  propertyType: string;
  budget: string;
  location: string;
  status: 'BROADCASTING' | 'MATCHED' | 'EXPIRED';
  matches: number;
  timestamp: string;
}

interface MatchResponse {
  id: string;
  agentName: string;
  agentAvatar: string;
  trustScore: number;
  message: string;
  rating: number;
  propertiesCount: number;
}

const MOCK_MY_REQUESTS: ActiveRequest[] = [
  {
    id: 'req-1',
    type: 'BUY',
    propertyType: 'Modern Villa',
    budget: '$1.2M',
    location: 'Bole, Addis Ababa',
    status: 'MATCHED',
    matches: 4,
    timestamp: '2 days ago'
  },
  {
    id: 'req-2',
    type: 'RENT',
    propertyType: 'Office Space',
    budget: '$5,000/mo',
    location: 'Westlands, Nairobi',
    status: 'BROADCASTING',
    matches: 0,
    timestamp: '5 hours ago'
  }
];

const MOCK_MATCHES: MatchResponse[] = [
  { id: 'm1', agentName: 'Sarah Jenkins', agentAvatar: 'https://i.pravatar.cc/150?u=sarahj', trustScore: 92, message: "I have 3 off-market villas in Bole that match your criteria perfectly. Let's talk.", rating: 4.9, propertiesCount: 24 },
  { id: 'm2', agentName: 'Michael Ross', agentAvatar: 'https://i.pravatar.cc/150?u=mike', trustScore: 88, message: "Available for a virtual tour this Saturday for a new development near the airport.", rating: 4.8, propertiesCount: 12 },
  { id: 'm3', agentName: 'Elena Gilbert', agentAvatar: 'https://i.pravatar.cc/150?u=elena', trustScore: 96, message: "I specialize in luxury villas in this price range. We should discuss your priority list.", rating: 5.0, propertiesCount: 8 },
];

export const Request: React.FC<RequestProps> = ({ language, onChannelSelect }) => {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'NEW' | 'MY_REQUESTS'>('NEW');
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const propertyTypes = [
    { id: 'HOUSE', label: 'Villa/House', icon: <Home size={18} /> },
    { id: 'APARTMENT', label: 'Apartment', icon: <LayoutList size={18} /> },
    { id: 'OFFICE', label: 'Commercial', icon: <PlusCircle size={18} /> },
    { id: 'LAND', label: 'Raw Land', icon: <MapPin size={18} /> },
  ];

  const handleViewMatches = (id: string) => {
    setSelectedRequestId(id);
  };

  if (submitted) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
            <CheckCircle size={64} />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Broadcast Active!</h2>
          <p className="text-slate-500 max-w-md mx-auto font-medium italic">Sent to 142 verified suppliers.</p>
          <button onClick={() => setSubmitted(false)} className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all text-xs uppercase tracking-widest shadow-xl">Back</button>
        </div>
      </div>
    );
  }

  if (selectedRequestId) {
    const request = MOCK_MY_REQUESTS.find(r => r.id === selectedRequestId);
    return (
      <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
        <button 
          onClick={() => setSelectedRequestId(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-black text-[10px] uppercase tracking-widest"
        >
          <ChevronRight size={14} className="rotate-180" /> Back to My Requests
        </button>

        <div className="bg-slate-900 rounded-[48px] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full"></div>
           <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-blue-600 rounded-2xl">
                    <Activity size={24} />
                 </div>
                 <h1 className="text-3xl font-black tracking-tight">Active Matches</h1>
              </div>
              <p className="text-slate-400 font-medium">Found <span className="text-white font-bold">{MOCK_MATCHES.length} responding agents</span> for your request.</p>
           </div>
           <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] text-center backdrop-blur-md relative z-10">
              <p className="text-[10px] font-black uppercase text-blue-400 tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-2 text-2xl font-black">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                 Active & Live
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
           {MOCK_MATCHES.map(match => (
             <div key={match.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group animate-in slide-in-from-bottom-4">
                <div className="flex flex-col md:flex-row items-center gap-8">
                   <div className="relative shrink-0">
                      <img src={match.agentAvatar} className="w-24 h-24 rounded-[32px] object-cover border-4 border-slate-50 shadow-xl" alt="agent" />
                   </div>
                   <div className="flex-1 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                         <div>
                            <div className="flex items-center gap-3">
                               <h3 className="text-xl font-black text-slate-900">{match.agentName}</h3>
                               <div className="flex items-center gap-1 text-amber-500">
                                  <Star size={14} fill="currentColor" />
                                  <span className="text-xs font-black text-slate-800">{match.rating}</span>
                               </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Trust Score: {match.trustScore}% • {match.propertiesCount} Active Listings</p>
                         </div>
                         <button 
                          onClick={() => onChannelSelect?.(match.agentName)}
                          className="px-6 py-2.5 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-50 transition-all"
                         >
                           View Portfolio
                         </button>
                      </div>
                      <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100/50">
                         <p className="text-sm text-slate-700 font-medium italic leading-relaxed">"{match.message}"</p>
                      </div>
                      <div className="flex items-center gap-3">
                         <button className="flex-1 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl">Message Agent</button>
                         <button className="flex-1 py-4 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl">Schedule Tour</button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            <Sparkles size={14} /> AI-Powered
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Request Center</h1>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] shadow-lg border border-slate-100">
           <button 
             onClick={() => setActiveTab('NEW')}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'NEW' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
           >
             New Broadcast
           </button>
           <button 
             onClick={() => setActiveTab('MY_REQUESTS')}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'MY_REQUESTS' ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
           >
             My Requests ({MOCK_MY_REQUESTS.length})
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {activeTab === 'NEW' ? (
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Key size={14} className="text-blue-600" /> Intent
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-4 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl">Buy</button>
                    <button className="py-4 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest">Rent</button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={14} className="text-blue-600" /> Max Budget
                  </label>
                  <input type="number" placeholder="500,000" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-50" />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Home size={14} className="text-blue-600" /> Property Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {propertyTypes.map(type => (
                      <button key={type.id} className="p-4 rounded-2xl border flex flex-col items-center gap-2 bg-white border-slate-100 text-slate-400">
                        {type.icon}
                        <span className="text-[9px] font-black uppercase">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} className="text-blue-600" /> Preferred Area
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none">
                    <option>Bole, Addis Ababa</option>
                    <option>Westlands, Nairobi</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Clock size={14} className="text-blue-600" /> Move-in
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold outline-none">
                    <option>Within 1 month</option>
                  </select>
                </div>
              </div>

              <button onClick={() => setSubmitted(true)} className="w-full py-6 bg-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest">
                <Zap size={20} fill="currentColor" /> Initiate Global Broadcast
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 space-y-6">
            {MOCK_MY_REQUESTS.map(req => (
              <div key={req.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm animate-fadeIn">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-3xl bg-blue-50 text-blue-600">
                      <Send size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800">{req.propertyType} in {req.location}</h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{req.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {req.matches > 0 && (
                      <button 
                        onClick={() => handleViewMatches(req.id)}
                        className="px-6 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                      >
                        View {req.matches} Matches
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-8 lg:sticky lg:top-24">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 blur-[60px] rounded-full"></div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="p-3 bg-blue-600 rounded-2xl shadow-xl">
                   <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-xl font-black tracking-tight">Broadcast Rules</h3>
              </div>
              <ul className="space-y-4 relative z-10">
                 {[
                   'Verified Suppliers Only',
                   '14 Day Activity Period',
                   'Direct Chat Integration'
                 ].map((text, i) => (
                   <li key={i} className="flex items-start gap-3 text-xs font-medium text-slate-400 italic">
                      <div className="mt-1 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></div>
                      {text}
                   </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};
