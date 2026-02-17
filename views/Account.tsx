
import React, { useState } from 'react';
import { 
  User, Mail, Shield, Smartphone, Camera, ChevronRight, Lock, Video, 
  Building2, Sparkles, CheckCircle2, ShieldAlert, PlusCircle
} from 'lucide-react';
import { User as UserType } from '../types';

interface AccountProps {
  user: UserType;
  setUser: (user: UserType) => void;
}

type AccountTab = 'PROFILE' | 'PASSWORD' | 'CHANNEL_SETUP' | 'ROLES';

export const Account: React.FC<AccountProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState<AccountTab>('PROFILE');
  const roles: UserType['role'][] = ['CUSTOMER', 'AGENTS', 'ADMIN'];

  const tabs = [
    { id: 'PROFILE' as AccountTab, label: 'Edit Profile', icon: <User size={18} /> },
    { id: 'PASSWORD' as AccountTab, label: 'Change Password', icon: <Lock size={18} /> },
    { id: 'CHANNEL_SETUP' as AccountTab, label: 'Owner Channel Setup', icon: <Building2 size={18} /> },
    { id: 'ROLES' as AccountTab, label: 'Role Management', icon: <Shield size={18} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Account Sub-navigation Sidebar */}
        <div className="w-full lg:w-72 space-y-6">
          <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm text-center">
             <div className="relative inline-block group mb-4">
              <img src={user.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl" />
              <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="text-lg font-black text-slate-800">{user.name}</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mt-1">{user.role}</p>
          </div>

          <div className="bg-white rounded-[32px] p-3 border border-slate-100 shadow-sm space-y-1">
             {tabs.map(tab => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all ${
                  activeTab === tab.id 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
               >
                 <span className={activeTab === tab.id ? 'text-blue-400' : 'text-slate-400'}>{tab.icon}</span>
                 {tab.label}
               </button>
             ))}
          </div>
        </div>

        {/* Dynamic Content Rendering based on Tab */}
        <div className="flex-1 bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm min-h-[600px] animate-in fade-in slide-in-from-right-4 duration-500">
           {activeTab === 'PROFILE' && (
             <div className="space-y-8 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Edit Profile</h3>
                  <p className="text-slate-500 text-sm font-medium">Update your account information and public identity.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Full Name</label>
                    <input 
                      value={user.name} 
                      onChange={e => setUser({...user, name: e.target.value})} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Email Address</label>
                    <input 
                      value={user.email} 
                      className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold text-slate-400 cursor-not-allowed" 
                      readOnly 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Phone Number</label>
                    <input 
                      placeholder="+251 912 345 678" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-50 focus:bg-white outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">Location / Region</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold appearance-none">
                       <option>Ethiopia, Addis Ababa</option>
                       <option>Kenya, Nairobi</option>
                    </select>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 text-xs uppercase tracking-widest">
                    Save Changes
                  </button>
                </div>
             </div>
           )}

           {activeTab === 'PASSWORD' && (
             <div className="space-y-8 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Change Password</h3>
                  <p className="text-slate-500 text-sm font-medium">Keep your account secure with a strong password.</p>
                </div>

                <div className="max-w-md space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold" />
                   </div>
                </div>

                <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center gap-4 max-w-xl text-amber-800">
                   <ShieldAlert size={24} className="shrink-0" />
                   <p className="text-xs font-medium italic">Passwords should be at least 12 characters and contain special characters.</p>
                </div>

                <button className="px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all text-xs uppercase tracking-widest">
                  Update Password
                </button>
             </div>
           )}

           {activeTab === 'CHANNEL_SETUP' && (
             <div className="space-y-8 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Owner Channel Setup</h3>
                  <p className="text-slate-500 text-sm font-medium">Manage your personal property channel or agency brand identity on Masara.</p>
                </div>

                <div className="bg-indigo-50/50 p-10 rounded-[40px] border border-indigo-100 text-center space-y-6">
                   <div className="w-20 h-20 bg-indigo-600 rounded-[24px] flex items-center justify-center mx-auto text-white shadow-xl">
                      <Video size={32} />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-black text-indigo-900">Launch Your Professional Channel</h4>
                      <p className="text-indigo-700/70 text-sm max-w-md mx-auto font-medium">Set up your unique channel to showcase properties with immersive video tours and market insights.</p>
                   </div>
                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <button className="w-full sm:w-auto px-12 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 transition-all text-xs uppercase tracking-widest">
                        Enter Setup
                     </button>
                     <button className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:scale-105 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                        <PlusCircle size={18} /> Create Channel
                     </button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl text-blue-600"><Sparkles size={20} /></div>
                      <div>
                         <p className="text-xs font-black text-slate-800">Portfolio Optimization</p>
                         <p className="text-[10px] text-slate-400 uppercase tracking-widest">AI Brand Analysis</p>
                      </div>
                   </div>
                   <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center gap-4">
                      <div className="p-3 bg-white rounded-2xl text-emerald-600"><CheckCircle2 size={20} /></div>
                      <div>
                         <p className="text-xs font-black text-slate-800">Verified Brand Status</p>
                         <p className="text-[10px] text-slate-400 uppercase tracking-widest">Boosted Trust Scores</p>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'ROLES' && (
             <div className="space-y-8 animate-fadeIn">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Role Management</h3>
                  <p className="text-slate-500 text-sm font-medium">Switch between platform roles to explore different feature sets.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {roles.map(role => (
                    <button
                      key={role}
                      onClick={() => setUser({...user, role})}
                      className={`flex flex-col items-center gap-4 p-8 rounded-[32px] border-2 transition-all ${
                        user.role === role 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-2xl' 
                          : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:text-blue-600'
                      }`}
                    >
                      <div className={`p-4 rounded-2xl ${user.role === role ? 'bg-blue-600' : 'bg-slate-50'}`}>
                         {role === 'ADMIN' ? <Shield size={24} /> : role === 'AGENTS' ? <Building2 size={24} /> : <User size={24} />}
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-black uppercase tracking-widest">{role}</p>
                        <p className={`text-[10px] mt-1 font-medium italic ${user.role === role ? 'text-slate-400' : 'text-slate-400'}`}>
                           {role === 'ADMIN' ? 'Control everything' : role === 'AGENTS' ? 'Sell & Portfolio' : 'Find Homes'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100 text-slate-500 italic text-xs leading-relaxed">
                   Switching your role to <span className="font-bold">AGENTS</span> grants immediate access to the Leads CRM, Dashboard, and Real Estate Portfolio management tools.
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
