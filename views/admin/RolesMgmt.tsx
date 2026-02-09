
import React from 'react';
import { Users, Shield, UserCheck, MoreVertical, Search, Filter, ShieldAlert } from 'lucide-react';
import { UserRole } from '../../types';

export const RolesMgmt: React.FC = () => {
  const mockUsers = [
    { id: 'u1', name: 'Abebe Bikila', email: 'abebe@ethio.com', role: 'CUSTOMER', joined: 'Oct 2023', avatar: 'https://i.pravatar.cc/150?u=abebe' },
    { id: 'u2', name: 'Sarah Jenkins', email: 's.jenkins@realty.com', role: 'AGENTS', joined: 'Sep 2023', avatar: 'https://i.pravatar.cc/150?u=sarahj' },
    { id: 'u3', name: 'Michael Ross', email: 'mike@pearson.com', role: 'ADMIN', joined: 'Aug 2022', avatar: 'https://i.pravatar.cc/150?u=mike' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Role Management</h1>
          <p className="text-slate-500 font-medium">Control global access levels and promote verified agencies.</p>
        </div>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
             <input placeholder="Search users..." className="pl-10 pr-4 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold outline-none w-64 shadow-sm" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Total Users', val: '12.4k', icon: <Users className="text-blue-600" /> },
           { label: 'Active Agents', val: '862', icon: <UserCheck className="text-emerald-600" /> },
           { label: 'System Admins', val: '14', icon: <Shield className="text-rose-600" /> },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl">{stat.icon}</div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-800">{stat.val}</p>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
         <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">User Identity</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Current Role</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {mockUsers.map(user => (
                 <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <img src={user.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                          <div>
                             <p className="font-black text-slate-900">{user.name}</p>
                             <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <select className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all outline-none ${
                         user.role === 'ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                         user.role === 'AGENTS' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                         'bg-slate-50 text-slate-500 border-slate-100'
                       }`}>
                          <option>CUSTOMER</option>
                          <option>AGENTS</option>
                          <option>ADMIN</option>
                       </select>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-400">{user.joined}</td>
                    <td className="px-8 py-6 text-right">
                       <button className="p-2 text-slate-400 hover:text-slate-900"><MoreVertical size={18} /></button>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};
