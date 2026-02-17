
export type UserRole = 'ADMIN' | 'CUSTOMER' | 'AGENTS';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  subscriptionTier?: 'BASIC' | 'PRO' | 'BUSINESS';
}

export type NotificationType = 'LEAD' | 'PAYMENT' | 'SYSTEM' | 'VERIFICATION' | 'TOUR' | 'MESSAGE';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  link?: ViewId;
}

export type DocumentType = 
  | 'BUSINESS_LICENSE' 
  | 'PROPERTY_OWNERSHIP' 
  | 'AGENT_VERIFY' 
  | 'TAX_COMPLIANCE' 
  | 'ADDRESS_PROOF' 
  | 'BACKGROUND_CHECK' 
  | 'LEGAL_MATTERS';

export type VerificationStatus = 'MISSING' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface DirectoryDocument {
  id: string;
  type: DocumentType;
  name: string;
  status: VerificationStatus;
  date?: string;
  fileUrl?: string;
  supplierId: string;
  supplierName: string;
}

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  location: string;
  verifiedCategories: DocumentType[];
  stats: {
    listings: number;
    sold: number;
    experience: string;
    rating: number;
  };
}

export type ViewId = 
  | 'HOME' | 'AREA' | 'BUY' | 'RENT' | 'TRENDING' | 'WISH' | 'SUBSCRIPTION' | 'REQUEST' | 'TOUR'
  | 'ACCOUNT' | 'CHANNEL' | 'LEADS' | 'INBOX' | 'DIRECTORY' | 'DASHBOARD' | 'SETTINGS' | 'SEARCHING'
  | 'PROPERTY_DETAILS' | 'AGENT_DETAILS' | 'ADD_PROPERTY' | 'SYSTEM'
  | 'VERIFICATION' | 'PROPERTIES_MGMT' | 'ROLES_MGMT' | 'REVENUE' | 'GATEWAY' | 'ANALYTICS' | 'CONTACTS' | 'CATEGORY_MGMT'
  | 'EDIT_PROFILE' | 'CHANGE_PASSWORD' | 'CHANNEL_CREATION' | 'NOTIFICATIONS';

export interface Property {
  id: string;
  title: string;
  price: number; 
  price_etb?: number; 
  location: string;
  
  country: string;
  city: string;
  sub_city: string;
  area: string;
  landmark?: string;
  address_description?: string;

  type: 'HOUSE' | 'APARTMENT' | 'LAND' | 'OFFICE';
  status: 'FOR_SALE' | 'FOR_RENT';
  listing_status: 'ACTIVE' | 'SOLD' | 'PENDING';
  status_date: string;
  
  payment_method?: string;
  monthly_rent_etb?: number;
  rental_status?: 'RENTED' | 'VACANT';
  furnished: boolean;
  investment_property: boolean;

  total_area_sqm: number;
  net_area_sqm: number;
  floor_number?: number;
  total_floors?: number;
  beds?: number;
  baths?: number;
  store_room: boolean;
  units_per_floor?: number;

  building_type: string;
  structure: string; 
  year_built?: number;
  parking_available: boolean;
  elevator: boolean;

  has_gym: boolean;
  has_sauna: boolean;
  has_steam: boolean;
  has_common_laundry: boolean;
  has_terrace: boolean;
  security_type?: string;
  water_supply?: string;

  digital_map_available: boolean;
  ownership_type?: string;
  legal_status?: string;

  viewing_monday_friday: string;
  viewing_saturday: string;
  viewing_sunday: string;

  headline?: string;
  short_description?: string;
  full_description?: string;
  listing_language: string;
  created_at: string;
  updated_at: string;

  image: string;
  videoUrl?: string;
  tags: string[];
  amenities?: string[]; 
  sqft: number; 
  
  agent?: {
    id?: string;
    name: string;
    avatar: string;
    phone: string;
    website_url?: string;
    agent_commission_percent?: number;
    agent_share_percent?: number;
    verifiedCategories?: DocumentType[];
  };
}

export type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'WON' | 'LOST';

export interface LeadNote {
  id: string;
  author: string;
  date: string;
  text: string;
}

export interface LeadTask {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface Lead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  propertyTitle: string;
  propertyId: string;
  status: LeadStage;
  date: string;
  lastMessage: string;
  avatar: string;
  value: number;
  source: string;
  notes: LeadNote[];
  tasks: LeadTask[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Chat {
  id: string;
  withUser: {
    name: string;
    avatar: string;
    role: string;
  };
  lastMessage: string;
  time: string;
  unread?: number;
}

export type Language = 'EN' | 'OM' | 'AR' | 'TI' | 'AM' | 'SW';
