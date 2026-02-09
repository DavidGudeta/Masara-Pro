
import React, { useState } from 'react';
import { Mail, Search, Filter, MessageSquare, CheckCircle, Clock, MoreVertical, X, Phone, User } from 'lucide-react';

export const ContactsMgmt: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'INBOX' | 'RESOLVED' | 'ARCHIVE'>('INBOX');

  const mockInquiries = [
    { id: 'i1', name: 'David Chen', type: 'SUPPORT', subject: 'Payout Issue', time: '12m ago', priority: 'HIGH' },
    { id: 'i2', name: 'Amina Yusuf', type: 'INQUIRY', subject: 'Enterprise Pricing', time: '2h ago', priority: 'MEDIUM' },
    { id: 'i3', name: 'Robert B.', type: 'REPORT', subject: 'Spam Listing #422', time: '5h ago', priority: 'LOW' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Support Desk</h1>
          <p className="text-slate-500 font-medium">Global inbox for customer support, bug reports, and agent inquiries.</p>
        </div>
        
        <div className="flex bg-white p-1.5 rounded-[24px] shadow-lg border border-slate-100">
           {(['INBOX', 'RESOLVED', 'ARCHIVE'] as const).map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 activeTab === tab ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900'
               }`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-1 space-y-4">
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input placeholder="Search support..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold shadow-sm" />
            </div>
            <div className="space-y-2">
               {mockInquiries.map(inq => (
                 <button key={inq.id} className="w-full p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all text-left group">
                    <div className="flex justify-between items-start mb-2">
                       <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase ${
                         inq.priority === 'HIGH' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                       }`}>{inq.priority}</span>
                       <span className="text-[9px] font-bold text-slate-400">{inq.time}</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">{inq.subject}</h4>
                    <p className="text-xs text-slate-400 font-bold mt-1">{inq.name} • {inq.type}</p>
                 </button>
               ))}
            </div>
         </div>

         <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                     <User size={24} />
                  </div>
                  <div>
                     <h3 className="font-black text-slate-900">David Chen</h3>
                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Enterprise Supplier ID #9242</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-emerald-500"><CheckCircle size={20} /></button>
                  <button className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 hover:text-rose-500"><X size={20} /></button>
               </div>
            </div>

            <div className="flex-1 p-8 space-y-6 overflow-y-auto hide-scrollbar">
               <div className="bg-slate-50 p-6 rounded-[32px] rounded-tl-none border border-slate-100 max-w-[80%] space-y-2">
                  <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                     "Hi support team, I'm having trouble with my recent commission withdrawal for the Bole project. It's been pending for 48 hours. Can you investigate?"
                  </p>
                  <p className="text-[9px] font-black text-slate-400 uppercase">12:42 PM • Oct 26</p>
               </div>
            </div>

            <div className="p-8 bg-slate-50/50 border-t border-slate-100">
               <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-white border border-slate-200 rounded-[24px] shadow-sm">
                  <input className="flex-1 bg-transparent border-none py-3 text-sm font-bold focus:ring-0 outline-none" placeholder="Type your official response..." />
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">Send Reply</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
