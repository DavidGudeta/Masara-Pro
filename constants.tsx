
import React from 'react';
import { 
  Home, Map, ShoppingBag, Key, Flame, Heart, CreditCard, Send, 
  User, Tv, Target, Mail, FolderCheck, LayoutDashboard, Settings, LogOut, Search,
  Users, DollarSign, Shield, Building, Briefcase, PlusCircle, PlayCircle, Settings2,
  ShieldCheck, BarChart3, CreditCard as CardIcon, Globe, UserPen, Lock, Video,
  UserCheck, Layers, Zap
} from 'lucide-react';
import { ViewId, UserRole, Property, Lead, Chat, Message, DirectoryDocument, Agent } from './types';

export const NAV_ITEMS = [
  { id: 'HOME', labelKey: 'home', icon: <Home size={20} />, roles: ['CUSTOMER', 'AGENTS'] },
  { id: 'SEARCHING', labelKey: 'search', icon: <Search size={20} />, roles: ['CUSTOMER'] },
  { id: 'DASHBOARD', labelKey: 'dashboard', icon: <LayoutDashboard size={20} />, roles: ['ADMIN', 'AGENTS'] },
  { id: 'PROPERTIES_MGMT', labelKey: 'property', icon: <Building size={20} />, roles: ['ADMIN', 'AGENTS'] },
  { id: 'CATEGORY_MGMT', labelKey: 'category', icon: <Layers size={20} />, roles: ['ADMIN'] },
  { id: 'VERIFICATION', labelKey: 'verification', icon: <ShieldCheck size={20} />, roles: ['ADMIN'] },
  { id: 'ROLES_MGMT', labelKey: 'role', icon: <Shield size={20} />, roles: ['ADMIN'] },
  { id: 'REVENUE', labelKey: 'revenue', icon: <DollarSign size={20} />, roles: ['ADMIN'] },
  { id: 'GATEWAY', labelKey: 'gateway', icon: <CardIcon size={20} />, roles: ['ADMIN'] },
  { id: 'SUBSCRIPTION', labelKey: 'subscriptions', icon: <Zap size={20} />, roles: ['ADMIN', 'AGENTS'] },
  { id: 'ANALYTICS', labelKey: 'analytics', icon: <BarChart3 size={20} />, roles: ['ADMIN'] },
  { id: 'CONTACTS', labelKey: 'contacts', icon: <Users size={20} />, roles: ['ADMIN'] },
  { id: 'AREA', labelKey: 'area', icon: <Map size={20} />, roles: ['ADMIN', 'CUSTOMER', 'AGENTS'] },
  { id: 'TOUR', labelKey: 'tour', icon: <PlayCircle size={20} />, roles: ['CUSTOMER'] },
  { id: 'WISH', labelKey: 'saved', icon: <Heart size={20} />, roles: ['CUSTOMER', 'AGENTS'] },
  { id: 'TRENDING', labelKey: 'trending', icon: <Flame size={20} />, roles: ['CUSTOMER'] },
  { id: 'REQUEST', labelKey: 'request', icon: <Send size={20} />, roles: ['CUSTOMER'] },
  { id: 'LEADS', labelKey: 'leads', icon: <Target size={20} />, roles: ['AGENTS'] },
] as const;

export const PROFILE_ITEMS = [
  { id: 'ACCOUNT', labelKey: 'account', icon: <User size={18} />, roles: ['CUSTOMER', 'AGENTS', 'ADMIN'] },
  { id: 'REQUEST', labelKey: 'request', icon: <Send size={18} />, roles: ['CUSTOMER'] },
  { id: 'CHANNEL', labelKey: 'portfolio', icon: <Tv size={18} />, roles: ['AGENTS'] },
  { id: 'LEADS', labelKey: 'leads', icon: <Target size={18} />, roles: ['AGENTS'] },
  { id: 'INBOX', labelKey: 'inbox', icon: <Mail size={18} />, roles: ['CUSTOMER', 'AGENTS'] },
  { id: 'DIRECTORY', labelKey: 'directory', icon: <FolderCheck size={18} />, roles: ['AGENTS'] },
  { id: 'DASHBOARD', labelKey: 'dashboard', icon: <LayoutDashboard size={18} />, roles: ['AGENTS'] },
  { id: 'SETTINGS', labelKey: 'settings', icon: <Settings size={18} />, roles: ['AGENTS', 'ADMIN'] },
] as const;

export const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'OM', name: 'Oromo' },
  { code: 'AR', name: 'Arabic' },
  { code: 'TI', name: 'Tigrigna' },
  { code: 'AM', name: 'Amharic' },
  { code: 'SW', name: 'Swahili' },
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=sarahj',
    banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400',
    title: 'Senior Luxury Consultant',
    bio: 'Specializing in high-end villas and commercial spaces across Addis Ababa. With over 12 years of experience in the Ethiopian market.',
    phone: '+251 911 223 344',
    email: 'sarah.jenkins@masara.et',
    location: 'Bole District, Addis Ababa',
    verifiedCategories: ['BUSINESS_LICENSE', 'AGENT_VERIFY', 'ADDRESS_PROOF', 'TAX_COMPLIANCE', 'BACKGROUND_CHECK'],
    stats: {
      listings: 24,
      sold: 142,
      experience: '12 Years',
      rating: 4.9
    }
  },
  {
    id: 'a2',
    name: 'Abebe Dessalegn',
    avatar: 'https://i.pravatar.cc/150?u=abebe',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400',
    title: 'Commercial Specialist',
    bio: 'Focused on the burgeoning Kazanchis business district and industrial spaces around Akaki Kality.',
    phone: '+251 922 345 678',
    email: 'a.dessalegn@addis-realty.et',
    location: 'Kazanchis, Addis Ababa',
    verifiedCategories: ['BUSINESS_LICENSE', 'BACKGROUND_CHECK', 'TAX_COMPLIANCE'],
    stats: {
      listings: 12,
      sold: 86,
      experience: '8 Years',
      rating: 4.8
    }
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Apartment in Bole Olympia',
    headline: 'Prime Investment Opportunity Near Amran Hotel',
    price: 450000,
    price_etb: 23999000,
    location: 'Bole Olympia, Addis Ababa',
    country: 'Ethiopia',
    city: 'Addis Ababa',
    sub_city: 'Bole',
    area: 'Olympia',
    landmark: 'Near Amran Hotel',
    address_description: 'Adjacent to the new commercial development corridor on Bole Road.',
    type: 'APARTMENT',
    status: 'FOR_SALE',
    listing_status: 'ACTIVE',
    status_date: '2026-02-04',
    payment_method: 'Cash',
    monthly_rent_etb: 140000,
    rental_status: 'RENTED',
    furnished: true,
    investment_property: true,
    total_area_sqm: 162,
    net_area_sqm: 124,
    floor_number: 1,
    total_floors: 7,
    beds: 3,
    baths: 2,
    store_room: true,
    units_per_floor: 2,
    building_type: 'Residential',
    structure: 'G+7',
    year_built: 2024,
    parking_available: true,
    elevator: true,
    has_gym: true,
    has_sauna: true,
    has_steam: true,
    has_common_laundry: true,
    has_terrace: true,
    security_type: '24/7 CCTV & Physical Guard',
    water_supply: 'City + 10,000L Reservoir',
    digital_map_available: true,
    ownership_type: 'Freehold Title Deed',
    legal_status: 'Fully Verified & Registered',
    viewing_monday_friday: 'Afternoon (2PM - 5PM)',
    viewing_saturday: 'Morning (10:00 AM)',
    viewing_sunday: 'Full Day Available',
    short_description: 'Spacious 3-bedroom apartment with high-end finishes and extensive building amenities.',
    full_description: 'This premium G+7 development offers unparalleled luxury in the heart of Bole. Featuring a total area of 162 sqm, the unit includes a modern kitchen, high-speed elevator access, and a fully equipped gym/sauna complex.',
    listing_language: 'English',
    created_at: '2025-12-01',
    updated_at: '2026-02-01',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
    tags: ['Luxury', 'Diplomatic Area', 'Investment'],
    sqft: 1744,
    agent: {
      id: 'a1',
      name: 'Sarah Jenkins',
      avatar: 'https://i.pravatar.cc/150?u=sarahj',
      phone: '0955345555',
      website_url: 'www.georgemeelalii.com',
      agent_commission_percent: 2,
      agent_share_percent: 70,
      verifiedCategories: ['BUSINESS_LICENSE', 'AGENT_VERIFY', 'ADDRESS_PROOF', 'TAX_COMPLIANCE', 'PROPERTY_OWNERSHIP']
    }
  },
  {
    id: '2',
    title: 'Lakeside Retreat in Bishoftu',
    price: 12500,
    location: 'Babogaya, Bishoftu',
    country: 'Ethiopia',
    city: 'Bishoftu',
    sub_city: 'Ada\'a',
    area: 'Babogaya',
    type: 'HOUSE',
    status: 'FOR_RENT',
    listing_status: 'ACTIVE',
    status_date: '2026-01-20',
    furnished: true,
    investment_property: false,
    total_area_sqm: 400,
    net_area_sqm: 220,
    beds: 3,
    baths: 2,
    store_room: true,
    building_type: 'Villa',
    structure: 'G+1',
    parking_available: true,
    elevator: false,
    has_gym: false,
    has_sauna: false,
    has_steam: false,
    has_common_laundry: false,
    has_terrace: true,
    digital_map_available: true,
    viewing_monday_friday: 'By Appointment',
    viewing_saturday: 'Full Day',
    viewing_sunday: 'Closed',
    listing_language: 'English',
    created_at: '2026-01-01',
    updated_at: '2026-01-20',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    sqft: 2368,
    tags: ['Vacation', 'Lakeside'],
    agent: {
      id: 'a2',
      name: 'Abebe Dessalegn',
      avatar: 'https://i.pravatar.cc/150?u=abebe',
      phone: '+251 922 345 678',
      verifiedCategories: ['BUSINESS_LICENSE', 'BACKGROUND_CHECK']
    }
  }
];

export const MOCK_DIRECTORY_DOCS: DirectoryDocument[] = [
  { id: 'd1', type: 'BUSINESS_LICENSE', name: 'Ethiopian Trade License 2024', status: 'VERIFIED', date: 'Oct 2023', supplierId: 's1', supplierName: 'Sarah Jenkins' },
  { id: 'd2', type: 'PROPERTY_OWNERSHIP', name: 'Bole Villa Title Deed (Luka)', status: 'PENDING', date: 'Nov 2023', supplierId: 's1', supplierName: 'Sarah Jenkins' },
  { id: 'd3', type: 'TAX_COMPLIANCE', name: 'ERCA Tax Clearance', status: 'VERIFIED', date: 'Jan 2024', supplierId: 's1', supplierName: 'Sarah Jenkins' },
  { id: 'd4', type: 'AGENT_VERIFY', name: 'Real Estate Professional ID', status: 'VERIFIED', date: 'Sep 2023', supplierId: 's1', supplierName: 'Sarah Jenkins' },
  { id: 'd5', type: 'BACKGROUND_CHECK', name: 'Federal Police Clearance', status: 'VERIFIED', date: 'Aug 2023', supplierId: 's1', supplierName: 'Sarah Jenkins' },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    clientName: 'David Chen',
    email: 'david@example.com',
    phone: '+251 912 345 678',
    propertyTitle: 'Modern Luxury Apartment in Bole Olympia',
    propertyId: '1',
    status: 'NEW',
    date: 'Oct 26, 2023',
    lastMessage: 'Interested in the viewing.',
    avatar: 'https://i.pravatar.cc/150?u=david',
    value: 450000,
    source: 'Google Search',
    notes: [
      { id: 'n1', author: 'Sarah Jenkins', date: 'Oct 26, 2023', text: 'Spoke with him today. Very interested.' }
    ],
    tasks: [
      { id: 't1', title: 'Call back tomorrow', dueDate: 'Oct 27, 2023', completed: false }
    ]
  },
  {
    id: 'l2',
    clientName: 'Amina Yusuf',
    email: 'amina@example.com',
    phone: '+251 922 345 678',
    propertyTitle: 'Lakeside Retreat in Bishoftu',
    propertyId: '2',
    status: 'CONTACTED',
    date: 'Oct 25, 2023',
    lastMessage: 'Requested a price reduction.',
    avatar: 'https://i.pravatar.cc/150?u=amina',
    value: 12500,
    source: 'Direct',
    notes: [],
    tasks: []
  }
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    withUser: {
      name: 'Sarah Jenkins',
      avatar: 'https://i.pravatar.cc/150?u=sarahj',
      role: 'Agent'
    },
    lastMessage: 'The viewing is scheduled for 10:30 AM.',
    time: '10:30 AM',
    unread: 2
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'david',
    text: 'Hello, I would like to inquire about the Bole property.',
    timestamp: '10:00 AM',
    isMe: false
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Sure, I can help you with that. When would you like to visit?',
    timestamp: '10:05 AM',
    isMe: true
  }
];
