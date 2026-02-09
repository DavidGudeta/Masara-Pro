
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { 
  Building2, LogIn, Sparkles, Globe, Shield, Users, 
  ChevronRight, ChevronLeft, MapPin, Play, CheckCircle,
  Search, Video, CreditCard, ArrowRight, UserPlus
} from 'lucide-react';

interface LandingProps {
  onSignIn: (user: User) => void;
}

const CAROUSEL_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1600",
    title: "Luxury in Bole Atlas",
    subtitle: "The most prestigious residences in the heart of Addis Ababa."
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    title: "Kazanchis Business District",
    subtitle: "Premium commercial spaces for growing enterprises in the capital."
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600",
    title: "Bishoftu Lakeside Retreats",
    subtitle: "Experience tranquility just 45 minutes from the city."
  }
];

export const Landing: React.FC<LandingProps> = ({ onSignIn }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const demoUsers: Record<UserRole, User> = {
    CUSTOMER: { id: 'c1', name: 'John Buyer', email: 'john@example.com', role: 'CUSTOMER', avatar: 'https://i.pravatar.cc/150?u=john' },
    AGENTS: { id: 's1', name: 'Alex Supplier', email: 'alex@masara.et', role: 'AGENTS', avatar: 'https://i.pravatar.cc/150?u=alex', subscriptionTier: 'PRO' },
    ADMIN: { id: 'a1', name: 'Super Admin', email: 'admin@masara.et', role: 'ADMIN', avatar: 'https://i.pravatar.cc/150?u=admin' }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-inter">
      {/* Visual Section: Hero Carousel */}
      <div className="relative flex-1 bg-slate-900 h-[400px] lg:h-screen overflow-hidden">
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={slide.image} className="w-full h-full object-cover opacity-60" alt="hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30"></div>
          </div>
        ))}

        <div className="absolute top-10 left-10 z-20 flex items-center gap-3">
          <div className="bg-blue-600 p-2.5 rounded-2xl shadow-2xl">
            <Building2 className="text-white" size={28} />
          </div>
          <span className="text-2xl font-black text-white tracking-tight">Masara</span>
        </div>

        <div className="absolute bottom-20 left-10 right-10 z-20 space-y-6 max-w-xl animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} /> AI-Powered Real Estate
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tight">
            {CAROUSEL_SLIDES[activeSlide].title}
          </h1>
          <p className="text-slate-300 text-lg lg:text-xl font-medium leading-relaxed">
            {CAROUSEL_SLIDES[activeSlide].subtitle}
          </p>
          <div className="flex gap-2">
            {CAROUSEL_SLIDES.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === activeSlide ? 'w-10 bg-blue-600' : 'w-4 bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-10 right-10 z-20 hidden lg:flex gap-8 text-slate-500 font-bold uppercase tracking-widest text-[9px]">
          <div className="flex items-center gap-2 text-white/50"><Globe size={12} /> Ethiopia Exclusive</div>
          <div className="flex items-center gap-2 text-white/50"><Shield size={12} /> Verified Titles</div>
          <div className="flex items-center gap-2 text-white/50"><Users size={12} /> Local Expertise</div>
        </div>
      </div>

      {/* Interface Section */}
      <div className="flex-1 flex flex-col h-full lg:overflow-y-auto hide-scrollbar bg-slate-50/50 justify-center">
        <div className="max-w-lg mx-auto w-full px-8 py-12 lg:py-20 space-y-12">
          {/* Sign In / Sign Up Form */}
          <div className="bg-white p-8 lg:p-12 rounded-[48px] shadow-2xl shadow-slate-200 border border-white space-y-10 relative">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-slate-500 font-medium">
                {isSignUp ? 'Join Ethiopia\'s most advanced property network.' : 'Sign in to access your dashboard.'}
              </p>
            </div>

            {/* Role Switcher */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Identity Mode</p>
              <div className="grid grid-cols-3 gap-2">
                {(['CUSTOMER', 'AGENTS', 'ADMIN'] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                      selectedRole === role 
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900' 
                        : 'border-slate-50 bg-slate-50/50 text-slate-400 hover:border-slate-100'
                    }`}
                  >
                    {role === 'ADMIN' ? <Shield size={18} /> : role === 'AGENTS' ? <Building2 size={18} /> : <Users size={18} />}
                    <span className="text-[9px] font-black uppercase">{role}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  defaultValue={demoUsers[selectedRole].email}
                />
              </div>
              <div className="space-y-2">
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  defaultValue="••••••••"
                />
              </div>
            </div>

            <button 
              onClick={() => onSignIn(demoUsers[selectedRole])}
              className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
            >
              {isSignUp ? (
                <><UserPlus size={20} /> Join Masara</>
              ) : (
                <><LogIn size={20} /> Enter Platform</>
              )}
            </button>

            <div className="text-center">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'New to Masara? Create Account'}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden group cursor-pointer" onClick={() => onSignIn(demoUsers['CUSTOMER'])}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Ready to Start?</p>
                <h3 className="text-xl font-black">Browse properties now</h3>
              </div>
              <div className="p-3 bg-blue-600 rounded-full group-hover:translate-x-2 transition-transform">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
