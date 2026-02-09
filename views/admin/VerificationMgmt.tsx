
import React, { useState } from 'react';
import { 
  ShieldCheck, Search, Filter, Eye, Check, X, FileText, 
  UserCheck, Landmark, Briefcase, MapPin, Gavel, Clock 
} from 'lucide-react';
import { MOCK_DIRECTORY_DOCS } from '../../constants';

export const VerificationMgmt: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PENDING' | 'VERIFIED' | 'REJECTED'>('PENDING');

  const filteredDocs = MOCK_DIRECTORY_DOCS.filter(d => 
    activeTab === 'PENDING' ? d.status === 'PENDING' :
    activeTab === 'VERIFIED' ? d.status === 'VERIFIED' : 
    d.status === 'REJECTED'
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Compliance Audit</h1>
          <p className="text-slate-500 font-medium">Verify legal documentation and risk assessments for platform users.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] shadow-lg border border-slate-100">
           {(['PENDING', 'VERIFIED', 'REJECTED'] as const).map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900'
               }`}
             >
               {tab} ({MOCK_DIRECTORY_DOCS.filter(d => d.status === tab).length})
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDocs.map(doc => (
          <div key={doc.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                   <div className="p-5 bg-blue-50 text-blue-600 rounded-3xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <FileText size={28} />
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-slate-900">{doc.name}</h3>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Submitted by: <span className="text-blue-600">{doc.supplierName}</span> • {doc.date}</p>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                   <button className="flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 border border-slate-100">
                      <Eye size={16} /> View Document
                   </button>
                   {activeTab === 'PENDING' && (
                     <>
                        <button className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><X size={20} /></button>
                        <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Check size={20} /></button>
                     </>
                   )}
                </div>
             </div>
          </div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="py-24 text-center space-y-4">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ShieldCheck size={40} />
             </div>
             <p className="text-slate-400 font-black uppercase tracking-widest italic text-sm">Clear Queue: No {activeTab.toLowerCase()} items.</p>
          </div>
        )}
      </div>
    </div>
  );
};
