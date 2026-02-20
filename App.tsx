
import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Area } from './views/Area';
import { Subscription } from './views/Subscription';
import { Request } from './views/Request';
import { Dashboard } from './views/Dashboard';
import { Account } from './views/Account';
import { Channel } from './views/Channel';
import { Leads } from './views/Leads';
import { Inbox } from './views/Inbox';
import { Directory } from './views/Directory';
import { Settings } from './views/Settings';
import { Searching } from './views/Searching';
import { PropertyDetails } from './views/PropertyDetails';
import { AgentDetails } from './views/AgentDetails';
import { AddProperty } from './views/AddProperty';
import { Tour } from './views/Tour';
import { Landing } from './views/Landing';
import { Saved } from './views/Saved';
import { Notifications } from './views/Notifications';
import { PropertyMgmt } from './views/admin/PropertyMgmt';
import { VerificationMgmt } from './views/admin/VerificationMgmt';
import { RolesMgmt } from './views/admin/RolesMgmt';
import { RevenueMgmt } from './views/admin/RevenueMgmt';
import { GatewayMgmt } from './views/admin/GatewayMgmt';
import { AnalyticsMgmt } from './views/admin/AnalyticsMgmt';
import { ContactsMgmt } from './views/admin/ContactsMgmt';
import { CategoryMgmt } from './views/admin/CategoryMgmt';
import { PropertyGrid } from './components/PropertyGrid';
import { ViewId, User, Language } from './types';
import { MOCK_PROPERTIES, MOCK_AGENTS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentView, setView] = useState<ViewId>('HOME');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('EN');
  
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  // Persist session
  useEffect(() => {
    const savedUser = localStorage.getItem('masara_user');
    const savedToken = localStorage.getItem('masara_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  const handleSignIn = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem('masara_user', JSON.stringify(u));
    localStorage.setItem('masara_token', t);
    
    // Set initial view based on role
    if (u.role === 'ADMIN') {
      setView('ANALYTICS');
    } else if (u.role === 'AGENTS') {
      setView('DASHBOARD');
    } else {
      setView('HOME');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('masara_user');
    localStorage.removeItem('masara_token');
    setView('HOME');
  };

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(p => {
      const min = minPrice === '' ? 0 : minPrice;
      const max = maxPrice === '' ? Infinity : maxPrice;
      return p.price >= min && p.price <= max;
    });
  }, [minPrice, maxPrice]);

  if (!user) {
    return <Landing onSignIn={handleSignIn} />;
  }

  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
    setView('PROPERTY_DETAILS');
  };

  const handleAgentSelect = (agentName: string) => {
    const agent = MOCK_AGENTS.find(a => a.name === agentName);
    if (agent) {
      setSelectedAgentId(agent.id);
      setView('CHANNEL');
    } else {
      setSelectedAgentId('a1');
      setView('CHANNEL');
    }
  };

  const handleAgentDetailsSelect = (agentName: string) => {
    const agent = MOCK_AGENTS.find(a => a.name === agentName);
    if (agent) {
      setSelectedAgentId(agent.id);
      setView('AGENT_DETAILS');
    } else {
      setSelectedAgentId('a1');
      setView('AGENT_DETAILS');
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'HOME': return (
        <Home 
          user={user} 
          language={language} 
          onSelectProperty={handlePropertySelect} 
          onAgentSelect={handleAgentDetailsSelect} 
          onViewSubscriptions={() => setView('SUBSCRIPTION')}
        />
      );
      case 'AREA': return <Area onSelectProperty={handlePropertySelect} onChannelSelect={handleAgentSelect} />;
      case 'TOUR': return <Tour onSelectProperty={handlePropertySelect} onChannelSelect={handleAgentSelect} />;
      case 'WISH': return <Saved onSelectProperty={handlePropertySelect} />;
      case 'NOTIFICATIONS': return <Notifications setView={setView} />;
      case 'DASHBOARD': return <Dashboard user={user} onNewListing={() => setView('ADD_PROPERTY')} />;
      case 'SUBSCRIPTION': return <Subscription />;
      case 'ACCOUNT': return <Account user={user} setUser={setUser} />;
      case 'REQUEST': return <Request language={language} onChannelSelect={handleAgentSelect} />;
      case 'CHANNEL': return <Channel onSelectProperty={handlePropertySelect} onScheduleTour={() => setView('INBOX')} />;
      case 'LEADS': return <Leads user={user} />;
      case 'INBOX': return <Inbox />;
      case 'DIRECTORY': return <Directory user={user} />;
      case 'SETTINGS': return <Settings user={user} />;
      case 'SEARCHING': return <Searching language={language} onSelectProperty={handlePropertySelect} onChannelSelect={handleAgentSelect} />;
      case 'ADD_PROPERTY': return <AddProperty />;
      case 'VERIFICATION': return <VerificationMgmt />;
      case 'PROPERTIES_MGMT': return <PropertyMgmt user={user} onSelectProperty={handlePropertySelect} onAddNewListing={() => setView('ADD_PROPERTY')} />;
      case 'CATEGORY_MGMT': return <CategoryMgmt />;
      case 'ROLES_MGMT': return <RolesMgmt />;
      case 'REVENUE': return <RevenueMgmt />;
      case 'GATEWAY': return <GatewayMgmt />;
      case 'ANALYTICS': return <AnalyticsMgmt />;
      case 'CONTACTS': return <ContactsMgmt />;
      case 'PROPERTY_DETAILS': 
        const prop = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId) || MOCK_PROPERTIES[0];
        return (
          <PropertyDetails 
            property={prop} 
            onBack={() => setView('HOME')} 
            onSelectProperty={handlePropertySelect} 
            onChannelSelect={handleAgentSelect}
            onAgentSelect={handleAgentDetailsSelect}
            onScheduleTour={() => setView('INBOX')}
          />
        );
      case 'AGENT_DETAILS':
        const agent = MOCK_AGENTS.find(a => a.id === selectedAgentId) || MOCK_AGENTS[0];
        return (
          <AgentDetails
            agent={agent}
            onBack={() => setView('HOME')}
            onSelectProperty={handlePropertySelect}
            onSendInquiry={() => setView('INBOX')}
            onScheduleTour={() => setView('INBOX')}
            onViewPortfolio={() => setView('CHANNEL')}
          />
        );
      case 'BUY': return (
        <div className="space-y-6">
          <PropertyGrid onSelect={handlePropertySelect} onChannelSelect={handleAgentSelect} properties={filteredProperties.filter(p => p.status === 'FOR_SALE')} />
        </div>
      );
      case 'RENT': return (
        <div className="space-y-6">
          <PropertyGrid onSelect={handlePropertySelect} onChannelSelect={handleAgentSelect} properties={filteredProperties.filter(p => p.status === 'FOR_RENT')} />
        </div>
      );
      default: return (
        <Home 
          user={user} 
          language={language} 
          onSelectProperty={handlePropertySelect} 
          onAgentSelect={handleAgentDetailsSelect} 
          onViewSubscriptions={() => setView('SUBSCRIPTION')}
        />
      );
    }
  };

  return (
    <Layout 
      user={user} 
      currentView={currentView} 
      setView={setView} 
      language={language} 
      setLanguage={setLanguage}
      setUser={handleLogout}
      minPrice={minPrice}
      setMinPrice={setMinPrice}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
