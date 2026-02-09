
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Building2, LogIn, Sparkles, Globe, Shield, Users } from 'lucide-react';

interface SignInProps {
  onSignIn: (user: User) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');

  const demoUsers: Record<UserRole, User> = {
    CUSTOMER: {
      id: 'c1',
      name: 'John Buyer',
      email: 'john@example.com',
      role: 'CUSTOMER',
      avatar: 'https://i.pravatar.cc/150?u=john'
    },
    AGENTS: {
      id: 's1',
      name: 'Alex Supplier',
      email: 'alex@masara.com',
      role: 'AGENTS',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      subscriptionTier: 'PRO'
    },
    ADMIN: {
      id: 'a1',
      name: 'Super Admin',
      email: 'admin@masara.com',
      role: 'ADMIN',
      avatar: 'https://i.pravatar.cc/150?u=admin'
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side: Brand & Visuals */}
      <div className="hidden lg:flex flex-1 bg-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] translate-y-1/3 -translate-x-1/3 rounded-full"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-2xl shadow-blue-500/20">
            <Building2 className="text-white" size={32} />
          </div>
          <span className="text-3xl font-black text-white tracking-tight">Masara</span>
        </div>

        <div className="relative z-10 space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} /> AI-Powered Real Estate
          </div>
          <h1 className="text-6xl font-black text-white leading-tight">Your gateway to modern living.</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            The most advanced real estate platform in Africa. Buy, rent, and manage properties with ease using our integrated toolset.
          </p>
        </div>

        <div className="relative z-10 flex gap-12 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
          <div className="flex items-center gap-2"><Globe size={14} /> Global Reach</div>
          <div className="flex items-center gap-2"><Shield size={14} /> Secure Trading</div>
          <div className="flex items-center gap-2"><Users size={14} /> Verified Owners</div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-10 animate-fadeIn">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sign In</h2>
            <p className="text-slate-500 font-medium">Choose a role to explore the platform tailored for you.</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {(['CUSTOMER', 'AGENTS', 'ADMIN'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all group ${
                    selectedRole === role 
                      ? 'border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-100' 
                      : 'border-slate-100 hover:border-blue-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors ${
                      selectedRole === role ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                    }`}>
                      {role === 'ADMIN' ? <Shield size={24} /> : role === 'AGENTS' ? <Building2 size={24} /> : <Users size={24} />}
                    </div>
                    <div className="text-left">
                      <p className={`font-black text-sm uppercase tracking-wider ${selectedRole === role ? 'text-blue-900' : 'text-slate-700'}`}>{role}</p>
                      <p className="text-[11px] text-slate-400 font-medium italic">
                        {role === 'ADMIN' ? 'Platform Management' : role === 'AGENTS' ? 'Sell & Rent Properties' : 'Find Your Dream Home'}
                      </p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedRole === role ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200'
                  }`}>
                    {selectedRole === role && <LogIn size={12} />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => onSignIn(demoUsers[selectedRole])}
            className="w-full py-5 bg-slate-900 text-white font-black rounded-3xl shadow-2xl shadow-slate-200 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            Enter Platform <LogIn size={20} />
          </button>

          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            Don't have an account? <button className="text-blue-600 hover:underline">Create One</button>
          </p>
        </div>
      </div>
    </div>
  );
};
