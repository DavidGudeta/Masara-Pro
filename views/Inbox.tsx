import React, { useState } from 'react';
import { 
  Search, Send, Image, Smile, Phone, Video, Info, MoreVertical, 
  Calendar, Clock, MapPin, Video as VideoIcon, CheckCircle2, 
  ChevronRight, CalendarDays, MessageSquare, Zap, Filter, 
  ArrowRight, UserCheck
} from 'lucide-react';
import { MOCK_CHATS, MOCK_MESSAGES } from '../constants';

type InboxView = 'MESSAGES' | 'SCHEDULE' | 'REQUESTS';

interface Appointment {
  id: string;
  title: string;
  time: string;
  date: string;
  type: 'VIDEO' | 'IN_PERSON';
  withUser: {
    name: string;
    avatar: string;
    role: string;
  };
  location?: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
}

interface PropertyRequest {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: 'BUY' | 'RENT';
  propertyType: string;
  budget: string;
  location: string;
  status: 'ACTIVE' | 'MATCHED' | 'EXPIRED';
  timestamp: string;
  details: string;
}

const MOCK_SCHEDULE: Appointment[] = [
  {
    id: 's1',
    title: 'Property Viewing: Modern Villa',
    time: '10:30 AM',
    date: 'Today',
    type: 'IN_PERSON',
    location: 'Bole, Addis Ababa',
    withUser: { name: 'Sarah Jenkins', avatar: 'https://i.pravatar.cc/150?u=sarahj', role: 'Agent' },
    status: 'UPCOMING'
  },
  {
    id: 's2',
    title: 'Initial Consultation: Office Space',
    time: '2:00 PM',
    date: 'Today',
    type: 'VIDEO',
    withUser: { name: 'Michael Ross', avatar: 'https://i.pravatar.cc/150?u=mike', role: 'Buyer' },
    status: 'UPCOMING'
  },
  {
    id: 's3',
    title: 'Lease Agreement Review',
    time: '11:00 AM',
    date: 'Tomorrow',
    type: 'VIDEO',
    withUser: { name: 'Abebe Bikila', avatar: 'https://i.pravatar.cc/150?u=abebe', role: 'Owner' },
    status: 'UPCOMING'
  },
  {
    id: 's4',
    title: 'Neighborhood Tour',
    time: '9:00 AM',
    date: 'Yesterday',
    type: 'IN_PERSON',
    location: 'Downtown, Nairobi',
    withUser: { name: 'Elena Gilbert', avatar: 'https://i.pravatar.cc/150?u=elena', role: 'Renter' },
    status: 'COMPLETED'
  }
];

const MOCK_REQUESTS: PropertyRequest[] = [
  {
    id: 'req1',
    user: { name: 'David Chen', avatar: 'https://i.pravatar.cc/150?u=david' },
    type: 'BUY',
    propertyType: 'Modern Villa',
    budget: '$1M - $1.5M',
    location: 'Bole, Addis Ababa',
    status: 'ACTIVE',
    timestamp: '2 hours ago',
    details: 'Looking for a 4-bedroom villa with a private pool and high security.'
  },
  {
    id: 'req2',
    user: { name: 'Amina Yusuf', avatar: 'https://i.pravatar.cc/150?u=amina' },
    type: 'RENT',
    propertyType: 'Apartment',
    budget: '$2,000 - $3,500',
    location: 'Westlands, Nairobi',
    status: 'MATCHED',
    timestamp: '5 hours ago',
    details: 'Furnished 2-bedroom apartment near the business district.'
  },
  {
    id: 'req3',
    user: { name: 'Robert Baratheon', avatar: 'https://i.pravatar.cc/150?u=robert' },
    type: 'BUY',
    propertyType: 'Raw Land',
    budget: '$500k',
    location: 'Arada District',
    status: 'ACTIVE',
    timestamp: '1 day ago',
    details: 'Commercial plot for mixed-use development, minimum 1000sqm.'
  }
];

export const Inbox: React.FC = () => {
  const [activeView, setActiveView] = useState<InboxView>('MESSAGES');
  const [activeChat, setActiveChat] = useState(MOCK_CHATS[0]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-2xl animate-fadeIn">
      {/* Top Tab Navigation */}
      <div className="flex items-center px-8 border-b border-slate-100 bg-white z-10 overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setActiveView('MESSAGES')}
          className={`flex items-center gap-2 px-6 py-5 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all shrink-0 ${
            activeView === 'MESSAGES' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-900'
          }`}
        >
          <MessageSquare size={16} /> Messages
        </button>
        <button 
          onClick={() => setActiveView('SCHEDULE')}
          className={`flex items-center gap-2 px-6 py-5 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all shrink-0 ${
            activeView === 'SCHEDULE' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-900'
          }`}
        >
          <CalendarDays size={16} /> Schedule
        </button>
        <button 
          onClick={() => setActiveView('REQUESTS')}
          className={`flex items-center gap-2 px-6 py-5 text-[11px] font-black uppercase tracking-widest border-b-2 transition-all shrink-0 ${
            activeView === 'REQUESTS' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-900'
          }`}
        >
          <Zap size={16} /> Requests
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeView === 'MESSAGES' && (
          <>
            {/* Sidebar */}
            <div className="w-full md:w-80 border-r border-slate-100 flex flex-col h-full bg-slate-50/30">
              <div className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-50 transition-all outline-none" placeholder="Search conversations..." />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar px-3 space-y-1 pb-6">
                {MOCK_CHATS.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className={`w-full flex items-center gap-3 p-3 rounded-3xl transition-all ${
                      activeChat.id === chat.id ? 'bg-white shadow-lg border border-slate-100' : 'hover:bg-white/50'
                    }`}
                  >
                    <div className="relative">
                      <img src={chat.withUser.avatar} className="w-12 h-12 rounded-full object-cover border border-slate-100 shadow-sm" />
                      {chat.unread && <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{chat.unread}</span>}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="text-sm font-black text-slate-800">{chat.withUser.name}</h3>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{chat.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{chat.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-full bg-white relative">
              {/* Chat Header */}
              <div className="p-4 md:px-8 h-20 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <img src={activeChat.withUser.avatar} className="w-10 h-10 rounded-full object-cover shadow-md" />
                  <div>
                    <h2 className="text-sm font-black text-slate-800">{activeChat.withUser.name}</h2>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Online • {activeChat.withUser.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <button className="p-2 hover:bg-slate-50 hover:text-blue-600 rounded-xl"><Phone size={20} /></button>
                  <button className="p-2 hover:bg-slate-50 hover:text-blue-600 rounded-xl"><Video size={20} /></button>
                  <button className="p-2 hover:bg-slate-50 hover:text-blue-600 rounded-xl"><Info size={20} /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar">
                {MOCK_MESSAGES.map(msg => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-4 rounded-[24px] text-sm shadow-sm ${
                      msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-2 font-bold uppercase ${msg.isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-6">
                <div className="flex items-center gap-4 p-2 pl-4 pr-2 bg-slate-50 border border-slate-200 rounded-[28px] shadow-sm">
                  <button className="text-slate-400 hover:text-blue-600"><Smile size={20} /></button>
                  <button className="text-slate-400 hover:text-blue-600"><Image size={20} /></button>
                  <input className="flex-1 bg-transparent border-none py-3 text-sm font-bold focus:ring-0 placeholder:text-slate-400" placeholder="Write a message..." />
                  <button className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all">
                    <Send size={18} fill="white" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'SCHEDULE' && (
          <div className="flex-1 flex flex-col h-full bg-slate-50/30 overflow-y-auto hide-scrollbar p-8">
            <div className="max-w-4xl mx-auto w-full space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your Schedule</h2>
                  <p className="text-slate-500 font-medium italic">Manage viewings, consultations, and signing sessions.</p>
                </div>
                <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-blue-600 transition-all">
                  <Calendar size={14} /> Book Appointment
                </button>
              </div>

              {/* Grouped Schedule */}
              {['Today', 'Tomorrow', 'Upcoming'].map(group => {
                const appointments = MOCK_SCHEDULE.filter(a => 
                  group === 'Upcoming' ? (a.date !== 'Today' && a.date !== 'Tomorrow' && a.date !== 'Yesterday') : a.date === group
                );

                if (appointments.length === 0) return null;

                return (
                  <div key={group} className="space-y-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">{group}</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {appointments.map(apt => (
                        <div 
                          key={apt.id} 
                          className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all group"
                        >
                          <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-3xl ${apt.type === 'VIDEO' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'} transition-colors group-hover:bg-blue-600 group-hover:text-white`}>
                              {apt.type === 'VIDEO' ? <VideoIcon size={24} /> : <MapPin size={24} />}
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{apt.title}</h4>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                  <Clock size={14} className="text-slate-400" /> {apt.time}
                                </span>
                                {apt.location && (
                                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                    <MapPin size={14} className="text-slate-400" /> {apt.location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-8 w-full md:w-auto">
                            <div className="hidden lg:flex items-center gap-3">
                              <img src={apt.withUser.avatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
                              <div className="text-left">
                                <p className="text-xs font-black text-slate-800">{apt.withUser.name}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">{apt.withUser.role}</p>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 w-full md:w-auto">
                              {apt.status === 'UPCOMING' ? (
                                <>
                                  <button className="flex-1 md:px-6 py-3 bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 border border-slate-100">Reschedule</button>
                                  <button className={`flex-1 md:px-6 py-3 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg transition-all ${
                                    apt.type === 'VIDEO' ? 'bg-indigo-600 shadow-indigo-100' : 'bg-slate-900 shadow-slate-200'
                                  }`}>
                                    {apt.type === 'VIDEO' ? 'Join Call' : 'Directions'}
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl">
                                  <CheckCircle2 size={14} /> Completed
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeView === 'REQUESTS' && (
          <div className="flex-1 flex flex-col h-full bg-slate-50/30 overflow-y-auto hide-scrollbar p-8">
            <div className="max-w-4xl mx-auto w-full space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Requests</h2>
                  <p className="text-slate-500 font-medium italic">Incoming property broadcasts from potential clients.</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition-all flex items-center gap-2">
                    <Filter size={14} /> Filters
                  </button>
                  <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-200">
                    New Search
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {MOCK_REQUESTS.map(request => (
                  <div 
                    key={request.id} 
                    className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group animate-fadeIn"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0 flex flex-col items-center gap-3">
                        <img src={request.user.avatar} className="w-20 h-20 rounded-[28px] object-cover border-4 border-slate-50 shadow-xl" />
                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          request.status === 'MATCHED' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {request.status}
                        </span>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-black text-slate-800">{request.user.name}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                <Clock size={12} /> {request.timestamp}
                              </span>
                              <span className="text-slate-200">•</span>
                              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-tight">
                                <MapPin size={12} /> {request.location}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget Capacity</p>
                            <p className="text-2xl font-black text-blue-600">{request.budget}</p>
                          </div>
                        </div>

                        <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100/50">
                          <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                            "{request.details}"
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <ArrowRight size={14} className="text-blue-500" /> {request.type}
                          </span>
                          <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                            {request.propertyType}
                          </span>
                          <div className="ml-auto flex gap-2 w-full md:w-auto mt-4 md:mt-0">
                            <button className="flex-1 md:px-8 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                              Send Portfolio <ChevronRight size={14} />
                            </button>
                            <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-900 border border-slate-100 transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button className="w-full py-12 border-2 border-dashed border-slate-200 rounded-[40px] text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all group">
                   <Zap size={32} className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
                   <p className="font-black text-[10px] uppercase tracking-widest">Broadcast your requirements</p>
                   <p className="text-[9px] font-medium mt-1">Let verified suppliers reach out to you with matches.</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
