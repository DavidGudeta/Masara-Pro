
import React from 'react';
import { ChevronLeft, ChevronRight, House, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { User, ViewId, UserRole, Language } from '../types';
import { t } from '../services/translations';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  user: User;
  currentView: ViewId;
  setView: (view: ViewId) => void;
  language: Language;
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, user, currentView, setView, language, isMobile, onClose }) => {
  const filteredItems = NAV_ITEMS.filter(item => (item.roles as readonly UserRole[]).includes(user.role));

  return (
    <aside className={`h-full flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-50 shadow-sm ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 h-20 flex items-center justify-between shrink-0">
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${!isOpen ? 'justify-center w-full' : ''}`}>
          <div className="bg-slate-900 p-2.5 rounded-[14px] text-white shadow-xl shadow-slate-200 flex-shrink-0">
            <House size={20} strokeWidth={2.5} />
          </div>
          {isOpen && <span className="font-black text-xl tracking-tight text-slate-900 animate-fadeIn">Masara</span>}
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 hide-scrollbar">
        {filteredItems.map((item) => {
          const isActive = currentView === item.id;
          const label = t(language, item.labelKey as any);
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id as ViewId)}
              className={`flex items-center gap-3.5 w-full p-3 rounded-2xl transition-all relative group overflow-hidden ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              } ${!isOpen ? 'justify-center' : ''}`}
              title={!isOpen ? label : undefined}
            >
              <div className={`flex-shrink-0 transition-colors duration-300 ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-blue-600'}`}>
                {item.icon}
              </div>
              {isOpen && <span className="text-[13px] font-black whitespace-nowrap tracking-tight animate-fadeIn">{label}</span>}
              
              {!isOpen && isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-600 rounded-l-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {!isMobile && (
        <div className="p-4 border-t border-slate-50 flex justify-center shrink-0">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-center py-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100 group"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      )}
    </aside>
  );
};
