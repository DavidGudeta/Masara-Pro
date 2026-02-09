
import React, { useState, useMemo } from 'react';
import { 
  Target, Search, Filter, MoreHorizontal, Phone, Mail, 
  MessageSquare, PieChart, TrendingUp, Users, Calendar, 
  DollarSign, CheckCircle2, ChevronRight, X, Send, 
  Paperclip, Clock, Plus, ArrowRightLeft, FileText,
  Home
} from 'lucide-react';
import { MOCK_LEADS } from '../constants';
import { User, Lead, LeadStage, LeadTask, LeadNote } from '../types';

interface LeadsProps {
  user?: User;
}

export const Leads: React.FC<LeadsProps> = ({ user }) => {
  const isAdmin = user?.role === 'ADMIN';
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'NOTES' | 'TASKS' | 'EMAIL'>('DETAILS');
  const [searchQuery, setSearchQuery] = useState('');

  const stages: { id: LeadStage; label: string; color: string }[] = [
    { id: 'NEW', label: 'Inquiry', color: 'bg-blue-500' },
    { id: 'CONTACTED', label: 'Engaged', color: 'bg-indigo-500' },
    { id: 'QUALIFIED', label: 'Qualified', color: 'bg-amber-500' },
    { id: 'PROPOSAL', label: 'Proposal', color: 'bg-purple-500' },
    { id: 'WON', label: 'Closed Won', color: 'bg-emerald-500' },
  ];

  const filteredLeads = useMemo(() => {
    return MOCK_LEADS.filter(l => 
      l.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (isAdmin) {
    return (
      <div className="space-y-8 pb-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leads Analytics</h1>
            <p className="text-slate-500 text-sm font-medium">Cross-platform pipeline performance and conversion insights.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Export Report</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Value', val: '$14.2M', icon: <DollarSign />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
             { label: 'Active Leads', val: '2,842', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
             { label: 'Won Deals', val: '124', icon: <CheckCircle2 />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
             { label: 'Conv. Rate', val: '14.8%', icon: <TrendingUp />, color: 'text-rose-600', bg: 'bg-rose-50' },
           ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-3">
              <div className={`p-3 rounded-2xl w-fit ${stat.color} ${stat.bg}`}>{stat.icon}</div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
            </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-800 mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                     <div className="flex items-center gap-4">
                       <img src={`https://i.pravatar.cc/150?u=cl${i}`} className="w-10 h-10 rounded-full" />
                       <div>
                         <p className="text-sm font-black text-slate-800">Closed Won: Modern Villa</p>
                         <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight">Agent: @luxehomes • Addis Ababa</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <p className="text-sm font-black text-emerald-600">+$1.2M</p>
                       <p className="text-[10px] text-slate-400 font-bold">Value</p>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">Pipeline Health</h3>
                <PieChart className="text-blue-400" />
              </div>
              <div className="space-y-6">
                {stages.map(s => {
                  const count = MOCK_LEADS.filter(l => l.status === s.id).length;
                  const percent = (count / MOCK_LEADS.length) * 100;
                  return (
                    <div key={s.id} className="space-y-2">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                        <span className="text-slate-400">{s.label}</span>
                        <span>{count} Leads</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color}`} style={{ width: `${percent || 10}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 h-[calc(100vh-140px)] flex flex-col relative overflow-hidden">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Leads</h1>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-1">Manage prospects and closing operations</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all outline-none" 
              placeholder="Search leads, properties, emails..." 
            />
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:scale-105 transition-all flex items-center gap-2">
            <Plus size={16} /> New Lead
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
        {stages.map(stage => {
          const leadsInStage = filteredLeads.filter(l => l.status === stage.id);
          const totalValue = leadsInStage.reduce((acc, curr) => acc + curr.value, 0);
          
          return (
            <div key={stage.id} className="w-80 flex-shrink-0 flex flex-col gap-4">
              <div className="flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                  <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest">{stage.label}</h3>
                  <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{leadsInStage.length}</span>
                </div>
                <div className="text-[10px] font-black text-slate-500">${(totalValue / 1000).toFixed(0)}k</div>
              </div>

              <div className="flex-1 bg-slate-100/30 rounded-[32px] p-2 space-y-3 overflow-y-auto hide-scrollbar">
                {leadsInStage.map(lead => (
                  <div 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group active:scale-95"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <img src={lead.avatar} className="w-10 h-10 rounded-full border-2 border-slate-50" />
                      <button className="text-slate-300 group-hover:text-slate-900 transition-colors"><MoreHorizontal size={16} /></button>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-slate-800">{lead.clientName}</h4>
                      <p className="text-[10px] text-slate-400 font-bold truncate">{lead.propertyTitle}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
                      <span className="text-xs font-black text-blue-600">${(lead.value / 1000).toFixed(0)}k</span>
                      <div className="flex gap-2">
                        {lead.tasks.some(t => !t.completed) && <Clock size={12} className="text-amber-500" />}
                        <span className="text-[9px] font-black text-slate-300 uppercase">{lead.date.split(',')[0]}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all text-[10px] font-black uppercase tracking-widest">
                  + Drop Lead Here
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lead Detail Drawer / Modal Overlay */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60] flex justify-end animate-in fade-in duration-300">
          <div 
            className="w-full max-w-2xl bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-6">
                <img src={selectedLead.avatar} className="w-16 h-16 rounded-3xl object-cover shadow-2xl border-4 border-white" />
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedLead.clientName}</h2>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase rounded-lg tracking-widest">{selectedLead.status}</span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 uppercase tracking-tight">
                      <Target size={10} /> Lead Source: {selectedLead.source}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-3 hover:bg-white rounded-2xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200">
                <X size={20} />
              </button>
            </div>

            {/* Drawer Tabs */}
            <div className="flex border-b border-slate-100 px-8">
              {(['DETAILS', 'EMAIL', 'NOTES', 'TASKS'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
                    activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
              {activeTab === 'DETAILS' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                      <div className="flex items-center gap-2 group">
                        <Mail size={14} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{selectedLead.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone Number</p>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{selectedLead.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Interested Property</p>
                      <div className="flex items-center gap-2">
                        <Home size={14} className="text-blue-500" />
                        <span className="text-sm font-bold text-slate-700">{selectedLead.propertyTitle}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Est. Deal Value</p>
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-emerald-500" />
                        <span className="text-sm font-black text-slate-900">${selectedLead.value.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-50" />

                  <div className="space-y-4">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <ArrowRightLeft size={14} className="text-blue-600" /> Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all group">
                        <MessageSquare size={16} className="text-blue-600 group-hover:text-white" /> Open Chat
                      </button>
                      <button className="flex items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all group">
                        <Calendar size={16} className="text-blue-600 group-hover:text-white" /> Schedule Viewing
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-[32px] text-white flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Pipeline Management</p>
                      <p className="text-sm font-bold mt-1">Move to next stage: Qualified</p>
                    </div>
                    <button className="p-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'EMAIL' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 flex flex-col h-full">
                  <div className="space-y-4 flex-1">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">To:</div>
                      <div className="text-sm font-bold text-slate-700">{selectedLead.email}</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Subject:</div>
                      <input className="w-full bg-transparent border-none p-0 text-sm font-bold focus:ring-0 outline-none" placeholder="Enter subject..." defaultValue={`Inquiry: ${selectedLead.propertyTitle}`} />
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-3xl p-6 border border-slate-100 min-h-[300px]">
                      <textarea className="w-full h-full bg-transparent border-none p-0 text-sm font-medium focus:ring-0 outline-none resize-none" placeholder="Write your professional follow-up here..."></textarea>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex gap-2">
                      <button className="p-3 text-slate-400 hover:bg-slate-100 rounded-xl"><Paperclip size={18} /></button>
                      <button className="p-3 text-slate-400 hover:bg-slate-100 rounded-xl text-xs font-bold">Use AI Draft</button>
                    </div>
                    <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 flex items-center gap-2">
                      <Send size={16} /> Send Email
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'NOTES' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                   <div className="relative group">
                    <textarea className="w-full bg-slate-50 border border-slate-100 rounded-[32px] p-6 text-sm font-medium outline-none focus:ring-4 focus:ring-blue-50" rows={3} placeholder="Add a private note about this client..."></textarea>
                    <button className="absolute bottom-4 right-4 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 transition-transform"><Plus size={16} /></button>
                   </div>
                   
                   <div className="space-y-4">
                     {selectedLead.notes.length > 0 ? selectedLead.notes.map(note => (
                       <div key={note.id} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-2">
                         <div className="flex justify-between items-center">
                           <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{note.author}</span>
                           <span className="text-[9px] text-slate-400 font-bold">{note.date}</span>
                         </div>
                         <p className="text-sm text-slate-600 font-medium">{note.text}</p>
                       </div>
                     )) : (
                       <div className="py-20 text-center space-y-3">
                         <FileText size={32} className="mx-auto text-slate-200" />
                         <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No notes yet</p>
                       </div>
                     )}
                   </div>
                </div>
              )}

              {activeTab === 'TASKS' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between bg-slate-900 text-white p-6 rounded-[32px]">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl"><Calendar size={20} /></div>
                      <div>
                        <p className="text-xs font-bold text-blue-400">Up Next</p>
                        <p className="text-sm font-black">Call with Sarah</p>
                      </div>
                    </div>
                    <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><MoreHorizontal size={18} /></button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Pending Tasks</h3>
                    {selectedLead.tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-3xl shadow-sm hover:border-blue-100 transition-all">
                         <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'}`}>
                           {task.completed && <CheckCircle2 size={12} />}
                         </button>
                         <div className="flex-1">
                           <p className={`text-sm font-bold ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{task.title}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight flex items-center gap-1 mt-0.5"><Clock size={10} /> {task.dueDate}</p>
                         </div>
                      </div>
                    ))}
                    <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all text-[10px] font-black uppercase tracking-widest">
                      + Add Task
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
