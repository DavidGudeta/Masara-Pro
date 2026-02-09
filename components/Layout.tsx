
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User, ViewId, Language } from '../types';

interface LayoutProps {
  user: User;
  currentView: ViewId;
  setView: (view: ViewId) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setUser: (user: User | null) => void;
  children: React.ReactNode;
  minPrice: number | '';
  setMinPrice: (val: number | '') => void;
  maxPrice: number | '';
  setMaxPrice: (val: number | '') => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  user, 
  currentView, 
  setView, 
  language, 
  setLanguage, 
  setUser,
  children,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <div className="hidden md:flex h-full">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          user={user} 
          currentView={currentView} 
          setView={setView} 
          language={language}
        />
      </div>

      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-72 h-full bg-white shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar 
              isOpen={true} 
              setIsOpen={() => {}} 
              user={user} 
              currentView={currentView} 
              setView={(v) => { setView(v); setMobileMenuOpen(false); }} 
              language={language}
              isMobile
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Header 
          user={user} 
          setView={setView} 
          language={language} 
          setLanguage={setLanguage} 
          setUser={setUser}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth hide-scrollbar">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
