
import React, { useState } from 'react';
import { 
  Bell, Check, Trash2, Filter, MoreVertical, 
  Target, Zap, ShieldCheck, PlayCircle, MessageSquare, 
  AlertCircle, ChevronRight, CheckCircle2, Star, Sparkles
} from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../constants';
import { Notification, ViewId } from '../types';

interface NotificationsProps {
  setView: (view: ViewId) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ setView }) => {
  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'IMPORTANT'>('ALL');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'UNREAD') return !n.isRead;
    if (filter === 'IMPORTANT') return n.priority === 'HIGH';
    return true;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotifIcon = (type: Notification['type']) => {
    switch(type) {
      case 'LEAD': return <Target className="text-blue-600" size={24} />;
      case 'PAYMENT': return <Zap className="text-amber-600" size={24} />;
      case 'VERIFICATION': return <ShieldCheck className="text-emerald-600" size={24} />;
      case 'TOUR': return <PlayCircle className="text-purple-600" size={24} />;
      case 'MESSAGE': return <MessageSquare className="text-indigo-600" size={24} />;
      default: return <AlertCircle className="text-slate-600" size={24} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            <Bell size={14} /> Alert Center
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Your Notifications</h1>
          <p className="text-slate-500 font-medium">Stay updated with leads, payments, and platform status.</p>
        </div>

        <div className="flex items-center gap-4">
           <button 
            onClick={markAllRead}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
           >
            Mark all read
           </button>
           <button className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-blue-600 transition-all">
             <Filter size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
        {/* Main List */}
        <div className="lg:col-span-3 space-y-4">
           <div className="flex bg-white p-1.5 rounded-3xl shadow-sm border border-slate-100 w-fit mb-4">
              {(['ALL', 'UNREAD', 'IMPORTANT'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {f}
                </button>
              ))}
           </div>

           <div className="space-y-4">
              {filteredNotifications.length > 0 ? filteredNotifications.map((n) => (
                <div 
                  key={n.id}
                  className={`bg-white p-6 rounded-[40px] border transition-all flex flex-col md:flex-row items-center gap-8 group ${n.isRead ? 'border-slate-100 opacity-80' : 'border-blue-200 shadow-xl shadow-blue-50/50'}`}
                >
                   <div className={`p-5 rounded-3xl shrink-0 transition-transform group-hover:scale-110 ${n.isRead ? 'bg-slate-50' : 'bg-blue-50 shadow-sm'}`}>
                      {getNotifIcon(n.type)}
                   </div>
                   
                   <div className="flex-1 space-y-2 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                         <div className="flex items-center justify-center md:justify-start gap-3">
                            <h3 className="text-lg font-black text-slate-900">{n.title}</h3>
                            {!n.isRead && <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>}
                            {n.priority === 'HIGH' && <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[8px] font-black uppercase rounded">Critical</span>}
                         </div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{n.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"{n.message}"</p>
                      
                      {n.link && (
                        <button 
                          onClick={() => setView(n.link!)}
                          className="flex items-center gap-1.5 text-blue-600 text-[10px] font-black uppercase tracking-widest hover:gap-2 transition-all mt-2"
                        >
                          View Related Activity <ChevronRight size={14} />
                        </button>
                      )}
                   </div>

                   <div className="flex items-center gap-2">
                      {!n.isRead && (
                        <button className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                           <Check size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(n.id)}
                        className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-600 hover:text-white transition-all border border-slate-100"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                </div>
              )) : (
                <div className="py-32 text-center bg-white rounded-[60px] border border-dashed border-slate-200">
                   <Bell size={48} className="mx-auto text-slate-200 mb-4" />
                   <p className="text-slate-400 font-bold uppercase tracking-widest">No notifications found in this category.</p>
                </div>
              )}
           </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full"></div>
              <h3 className="text-xl font-black relative z-10 flex items-center gap-2">
                 <Sparkles className="text-blue-400" size={20} /> Impact Analysis
              </h3>
              <div className="space-y-6 relative z-10">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Unread Alerts</p>
                    <p className="text-3xl font-black">{notifications.filter(n => !n.isRead).length}</p>
                 </div>
                 <p className="text-xs text-slate-400 font-medium italic leading-relaxed">
                    Users who respond to notifications within <span className="text-white font-bold">15 minutes</span> see a <span className="text-emerald-400 font-bold">3.2x higher</span> lead conversion rate in Ethiopia.
                 </p>
                 <button 
                  onClick={() => setView('SETTINGS')}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all"
                 >
                    Adjust Alert Preferences
                 </button>
              </div>
           </div>

           <div className="p-8 bg-blue-50 rounded-[40px] border border-blue-100 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-white rounded-xl shadow-sm text-blue-600"><Star size={18} fill="currentColor" /></div>
                 <h4 className="text-sm font-black text-blue-900">Priority Tips</h4>
              </div>
              <p className="text-xs text-blue-700/80 font-medium italic leading-relaxed">
                 You have <span className="font-bold">2 high-priority</span> verification updates. Completing these will boost your Trust Score to 95%.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};
