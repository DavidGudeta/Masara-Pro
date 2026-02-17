
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, Globe, ChevronDown, User as UserIcon, LogOut, Menu, 
  DollarSign, X, ShoppingBag, Key, CheckCircle2, Zap, 
  Target, PlayCircle, MessageSquare, ShieldCheck, AlertCircle
} from 'lucide-react';
import { User, ViewId, Language, UserRole, Notification } from '../types';
import { LANGUAGES, PROFILE_ITEMS, MOCK_NOTIFICATIONS } from '../constants';
import { t } from '../services/translations';

interface HeaderProps {
  user: User;
  setView: (view: ViewId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setUser: (user: User | null) => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  minPrice: number | '';
  setMinPrice: (val: number | '') => void;
  maxPrice: number | '';
  setMaxPrice: (val: number | '') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  setView, 
  language, 
  setLanguage, 
  setUser, 
  toggleSidebar, 
  toggleMobileMenu,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
        setLangOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(target)) {
        setPriceOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  const filteredProfileItems = PROFILE_ITEMS.filter(item => (item.roles as readonly UserRole[]).includes(user.role));
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.isRead).length;

  const getNotifIcon = (type: Notification['type']) => {
    switch(type) {
      case 'LEAD': return <Target className="text-blue-500" size={16} />;
      case 'PAYMENT': return <Zap className="text-amber-500" size={16} />;
      case 'VERIFICATION': return <ShieldCheck className="text-emerald-500" size={16} />;
      case 'TOUR': return <PlayCircle className="text-purple-500" size={16} />;
      case 'MESSAGE': return <MessageSquare className="text-indigo-500" size={16} />;
      default: return <AlertCircle className="text-slate-500" size={16} />;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="hidden md:flex p-2.5 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"
        >
          <Menu size={18} strokeWidth={2.5} />
        </button>
        
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2.5 rounded-2xl text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <Menu size={18} strokeWidth={2.5} />
        </button>

        <div className="relative hidden xl:block" ref={priceRef}>
          <button 
            onClick={() => setPriceOpen(!priceOpen)}
            className={`p-2.5 h-10 px-4 rounded-2xl border flex items-center gap-2 transition-all ${
              minPrice !== '' || maxPrice !== '' 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
            }`}
          >
            <DollarSign size={16} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {minPrice || maxPrice ? `$${minPrice || 0}-$${maxPrice || '∞'}` : t(language, 'globalFilter')}
            </span>
            <ChevronDown size={12} className={`transition-transform ${priceOpen ? 'rotate-180' : ''}`} />
          </button>

          {priceOpen && (
            <div className="absolute left-0 mt-3 w-72 bg-white rounded-[24px] shadow-2xl border border-slate-100 p-6 animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t(language, 'globalFilter')}</span>
                <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"><X size={14} /></button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Min Price</p>
                  <input 
                    type="number" 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-50"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Max Price</p>
                  <input 
                    type="number" 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Any"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-blue-50"
                  />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50">
                <button onClick={() => setPriceOpen(false)} className="w-full py-2.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 transition-colors">{t(language, 'apply')}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2">
          <button 
            onClick={() => setView('BUY')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <ShoppingBag size={14} strokeWidth={2.5} /> {t(language, 'buy')}
          </button>
          <button 
            onClick={() => setView('RENT')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
          >
            <Key size={14} strokeWidth={2.5} /> {t(language, 'rent')}
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setLangOpen(!langOpen)}
            className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-500 flex items-center gap-2 transition-all"
          >
            <Globe size={18} strokeWidth={2.5} />
            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest">{language}</span>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-[24px] shadow-2xl border border-slate-100 py-3 animate-in slide-in-from-top-4 duration-300">
              <div className="px-5 py-2 border-b border-slate-50 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Language</span>
              </div>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code as Language); setLangOpen(false); }}
                  className={`w-full text-left px-5 py-2.5 text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-between ${language === lang.code ? 'text-blue-600' : 'text-slate-600'}`}
                >
                  {lang.name}
                  {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={`p-2.5 rounded-2xl hover:bg-slate-50 text-slate-500 relative transition-all group ${notificationsOpen ? 'bg-slate-100 text-blue-600' : ''}`}
          >
            <Bell size={18} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-600 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-[-60px] md:right-0 mt-3 w-80 md:w-96 bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 py-4 animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-slate-50 mb-3 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-black text-slate-900">Notifications</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{unreadCount} Unread Messages</p>
                 </div>
                 <button className="text-[10px] font-black text-blue-600 uppercase hover:underline decoration-2">Mark all read</button>
              </div>

              <div className="max-h-[400px] overflow-y-auto hide-scrollbar px-2 space-y-1">
                 {MOCK_NOTIFICATIONS.map((n) => (
                   <button 
                    key={n.id}
                    onClick={() => { n.link && setView(n.link); setNotificationsOpen(false); }}
                    className={`w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all ${n.isRead ? 'hover:bg-slate-50 opacity-60' : 'bg-blue-50/30 hover:bg-blue-50/50'}`}
                   >
                     <div className={`p-2 rounded-xl shrink-0 ${n.isRead ? 'bg-slate-100' : 'bg-white shadow-sm'}`}>
                        {getNotifIcon(n.type)}
                     </div>
                     <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                           <p className={`text-xs font-black ${n.isRead ? 'text-slate-600' : 'text-slate-900'}`}>{n.title}</p>
                           <span className="text-[9px] font-bold text-slate-400 uppercase">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-2">{n.message}</p>
                     </div>
                   </button>
                 ))}
              </div>

              <div className="px-4 pt-4 border-t border-slate-50 mt-2">
                 <button 
                  onClick={() => { setView('NOTIFICATIONS'); setNotificationsOpen(false); }}
                  className="w-full py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors"
                 >
                  View All Alerts
                 </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-slate-100 mx-1 hidden sm:block"></div>

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-50 transition-all group"
          >
            <div className="relative">
              <img 
                src={user.avatar} 
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-lg group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden lg:block text-left pr-2">
              <p className="text-xs font-black text-slate-900 leading-tight">{user.name}</p>
              <p className="text-[9px] text-blue-600 font-black uppercase tracking-widest flex items-center gap-1">
                {user.role} <ChevronDown size={8} className={`transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
              </p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 py-4 animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-slate-50 mb-3">
                <p className="text-sm font-black text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate uppercase tracking-widest font-bold">{user.email}</p>
              </div>
              
              <div className="px-2 space-y-0.5 max-h-[60vh] overflow-y-auto hide-scrollbar">
                {filteredProfileItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setView(item.id as ViewId); setProfileOpen(false); }}
                    className="w-full flex items-center gap-4 px-4 py-3 text-[13px] font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-2xl transition-all group"
                  >
                    <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                      {/* Fix: cast to ReactElement<any> to allow 'size' and 'strokeWidth' props */}
                      {React.cloneElement(item.icon as React.ReactElement<any>, { size: 18, strokeWidth: 2.5 })}
                    </div>
                    {t(language, item.labelKey as any)}
                  </button>
                ))}
              </div>

              <div className="h-px bg-slate-100 my-3 mx-4"></div>
              <div className="px-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-4 py-3 text-[13px] font-black text-rose-600 hover:bg-rose-50 rounded-2xl transition-all group"
                >
                  <LogOut size={18} strokeWidth={2.5} />
                  {t(language, 'logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
