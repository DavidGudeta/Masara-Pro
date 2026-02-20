
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { 
  Building2, LogIn, Sparkles, Globe, Shield, Users, 
  ChevronRight, Play, CheckCircle,
  Search, ArrowRight, UserPlus, Loader2, AlertCircle
} from 'lucide-react';

interface LandingProps {
  onSignIn: (user: User, token: string) => void;
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
  }
];

export const Landing: React.FC<LandingProps> = ({ onSignIn }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (isSignUp) {
        // Mock Signup
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: name || 'Demo User',
          email: email,
          role: selectedRole,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          subscriptionTier: 'BASIC'
        };
        
        // In a real app we'd save this to a DB. Here we just simulate success.
        setIsSignUp(false);
        setError('Account created! Please sign in with your credentials.');
      } else {
        // Mock Login
        let mockUser: User | null = null;

        // Special demo accounts
        if (email === 'admin@masara.com') {
          mockUser = {
            id: 'admin-1',
            name: 'System Admin',
            email: 'admin@masara.com',
            role: 'ADMIN',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          };
        } else if (email === 'agent@masara.com') {
          mockUser = {
            id: 'agent-1',
            name: 'Premium Agent',
            email: 'agent@masara.com',
            role: 'AGENTS',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=agent',
            subscriptionTier: 'PRO'
          };
        } else if (email === 'customer@masara.com') {
          mockUser = {
            id: 'customer-1',
            name: 'Home Seeker',
            email: 'customer@masara.com',
            role: 'CUSTOMER',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=customer',
          };
        } else {
          // Generic login for any other email
          mockUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email: email,
            role: 'CUSTOMER',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          };
        }

        onSignIn(mockUser, 'mock-jwt-token');
      }
    } catch (err: any) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-inter">
      {/* Visual Section: Hero Carousel */}
      <div className="relative flex-1 bg-slate-900 h-[300px] lg:h-screen overflow-hidden">
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

        <div className="absolute bottom-20 left-10 right-10 z-20 space-y-6 max-w-xl hidden lg:block">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-blue-400 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} /> AI-Powered Real Estate
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-none tracking-tight">
            {CAROUSEL_SLIDES[activeSlide].title}
          </h1>
          <p className="text-slate-300 text-lg lg:text-xl font-medium leading-relaxed">
            {CAROUSEL_SLIDES[activeSlide].subtitle}
          </p>
        </div>
      </div>

      {/* Interface Section */}
      <div className="flex-1 flex flex-col h-full lg:overflow-y-auto hide-scrollbar bg-slate-50/50 justify-center">
        <div className="max-w-lg mx-auto w-full px-8 py-12 lg:py-20 space-y-12">
          <div className="bg-white p-8 lg:p-12 rounded-[48px] shadow-2xl shadow-slate-200 border border-white space-y-10 relative">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-slate-500 font-medium">
                {isSignUp ? 'Join Ethiopia\'s most advanced property network.' : 'Sign in to access your dashboard.'}
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold animate-in fade-in zoom-in-95">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">I want to...</p>
                    <div className="grid grid-cols-2 gap-2">
                      {(['CUSTOMER', 'AGENTS'] as UserRole[]).map((role) => (
                        <button
                          key={role}
                          type="button"
                          onClick={() => setSelectedRole(role)}
                          className={`py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ${
                            selectedRole === role 
                              ? 'border-blue-600 bg-blue-50/50 text-blue-900' 
                              : 'border-slate-50 bg-slate-50/50 text-slate-400'
                          }`}
                        >
                          <span className="text-[10px] font-black uppercase">{role === 'AGENTS' ? 'Sell Property' : 'Find a Home'}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <input 
                    type="text" 
                    required
                    placeholder="Full Name"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </>
              )}
              
              <input 
                type="email" 
                required
                placeholder="Email Address"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <input 
                type="password" 
                required
                placeholder="Password"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button 
                disabled={loading}
                className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl shadow-slate-200 hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : isSignUp ? <><UserPlus size={20} /> Join Masara</> : <><LogIn size={20} /> Enter Platform</>}
              </button>
            </form>

            <div className="text-center">
              <button 
                onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'New to Masara? Create Account'}
              </button>
            </div>

            {!isSignUp && (
              <div className="pt-6 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center mb-4">Quick Demo Access</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { role: 'Admin', email: 'admin@masara.com' },
                    { role: 'Agent', email: 'agent@masara.com' },
                    { role: 'Customer', email: 'customer@masara.com' }
                  ].map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => {
                        setEmail(demo.email);
                        setPassword('password123');
                      }}
                      className="py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all"
                    >
                      {demo.role}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
