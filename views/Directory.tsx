
import React, { useState } from 'react';
import { 
  FileText, CheckCircle, Clock, AlertCircle, Upload, Eye, Check, X, 
  ShieldCheck, Landmark, Briefcase, UserCheck, MapPin, Scale, Gavel, Search
} from 'lucide-react';
import { User, DocumentType, VerificationStatus, DirectoryDocument } from '../types';
import { MOCK_DIRECTORY_DOCS } from '../constants';

interface DirectoryProps {
  user?: User;
}

const CATEGORIES: { type: DocumentType; label: string; icon: React.ReactNode; desc: string }[] = [
  { type: 'BUSINESS_LICENSE', label: 'Business Licenses', icon: <Briefcase />, desc: 'Trade permits and registration documents.' },
  { type: 'PROPERTY_OWNERSHIP', label: 'Property Ownership', icon: <Landmark />, desc: 'Verified title deeds and lease agreements.' },
  { type: 'AGENT_VERIFY', label: 'Agent Verify', icon: <UserCheck />, desc: 'Identity verification and professional credentials.' },
  { type: 'TAX_COMPLIANCE', label: 'Tax Compliance', icon: <FileText />, desc: 'Valid tax clearance and certificates.' },
  { type: 'ADDRESS_PROOF', label: 'Address Proof', icon: <MapPin />, desc: 'Utility bills or physical office verification.' },
  { type: 'BACKGROUND_CHECK', label: 'Background & Risk', icon: <ShieldCheck />, desc: 'Credit scores, bank debt check, and risk reports.' },
  { type: 'LEGAL_MATTERS', label: 'Legal Matters', icon: <Gavel />, desc: 'Litigation history and legal standing records.' },
];

export const Directory: React.FC<DirectoryProps> = ({ user }) => {
  const isAdmin = user?.role === 'ADMIN';
  const [selectedCategory, setSelectedCategory] = useState<DocumentType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = MOCK_DIRECTORY_DOCS.filter(doc => 
    (selectedCategory === 'ALL' || doc.type === selectedCategory) &&
    (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.supplierName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: VerificationStatus) => {
    switch(status) {
      case 'VERIFIED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  if (isAdmin) {
    return (
      <div className="space-y-8 pb-20 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Compliance Center</h1>
            <p className="text-slate-500 max-w-xl font-medium">Global verification system for property owners, agencies, and risk assessment.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search suppliers..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-blue-50 outline-none w-64" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setSelectedCategory('ALL')}
              className={`w-full text-left px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-between transition-all ${selectedCategory === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}
            >
              All Items
              <span className="bg-white/10 px-2 py-0.5 rounded-lg text-[10px]">{MOCK_DIRECTORY_DOCS.length}</span>
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat.type}
                onClick={() => setSelectedCategory(cat.type)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${selectedCategory === cat.type ? 'bg-blue-600 text-white' : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50'}`}
              >
                {React.cloneElement(cat.icon as React.ReactElement, { size: 16 })}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Verification Queue */}
          <div className="lg:col-span-3 space-y-4">
             {filteredDocs.length > 0 ? filteredDocs.map((doc) => (
               <div key={doc.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group animate-fadeIn">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                       <div className="p-4 bg-slate-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {CATEGORIES.find(c => c.type === doc.type)?.icon || <FileText />}
                       </div>
                       <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-slate-800">{doc.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Supplier: <span className="text-blue-600">{doc.supplierName}</span> • Submitted {doc.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                       <button className="flex-1 md:px-6 py-3 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 border border-slate-100 flex items-center justify-center gap-2">
                          <Eye size={16} /> Review
                       </button>
                       {doc.status === 'PENDING' && (
                         <>
                           <button className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all">
                              <X size={18} />
                           </button>
                           <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                              <Check size={18} />
                           </button>
                         </>
                       )}
                    </div>
                 </div>
               </div>
             )) : (
               <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
                  <ShieldCheck size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold uppercase tracking-widest">No documents found in this category.</p>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  }

  // Agent/Agency View
  return (
    <div className="space-y-12 pb-20 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight tracking-tight">Your Directory</h1>
          <p className="text-slate-500 max-w-2xl font-medium">Verify your agency through these 7 legal pillars to gain higher trust scores and boosted visibility.</p>
        </div>
        <div className="px-5 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl flex items-center gap-2">
          <ShieldCheck size={18} />
          <span className="text-[10px] font-black uppercase tracking-widest">Trust Level: High (82%)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, i) => {
          const doc = MOCK_DIRECTORY_DOCS.find(d => d.type === cat.type);
          const status = doc?.status || 'MISSING';
          
          return (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`p-4 rounded-2xl ${status === 'VERIFIED' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'} transition-all`}>
                    {cat.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">{cat.label}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{cat.desc}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 space-y-3">
                 {status === 'VERIFIED' ? (
                   <div className="flex items-center justify-between px-2">
                      <span className="text-[10px] font-black text-emerald-600 flex items-center gap-1.5"><CheckCircle size={14} /> Verified Aug 2023</span>
                      <button className="text-[10px] font-black text-slate-400 hover:text-blue-600 uppercase">View</button>
                   </div>
                 ) : (
                   <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2">
                     <Upload size={14} /> Upload Documents
                   </button>
                 )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 p-12 rounded-[48px] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
         <div className="space-y-4 max-w-xl text-center lg:text-left relative z-10">
            <h2 className="text-3xl font-black tracking-tight">The Trust Factor</h2>
            <p className="text-slate-400 font-medium leading-relaxed italic">
              Properties listed by fully verified agencies (7/7 categories) receive <span className="text-blue-400">3x more leads</span> and are featured on the homepage "Promoted" section automatically.
            </p>
         </div>
         <div className="flex gap-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
               <p className="text-4xl font-black">94%</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Trust Score</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center">
               <p className="text-4xl font-black">5/7</p>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Verified</p>
            </div>
         </div>
      </div>
    </div>
  );
};
