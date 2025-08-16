export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  shortDescription: string;
  category: string;
  categoryObject: {
    id: string;
    name: string;
    description: string;
    image: string;
    order: number;
  };
  startDate: string;
  startTime: string;
  date: string;
  endDate: string;
  endTime: string;
  location: {
    venue: string;
    address: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  city: string;
  country: string;
  tickets: {
    isFree: boolean;
    tiers: any[];
  };
  posterImage: string;
  website: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  organizer: string;
  isPromoted: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    email: string;
    image: string;
  };
  additionalMedia: Array<{
    type: string;
    url: string;
  }>;
  transaction: any | null;
  isPaid: boolean;
  publishedAt: string;
  isPublished: boolean;
  isPublic: boolean;
  isApproved: boolean;
  isActive: boolean;
}

export interface DashboardMetrics {
  totalEvents: number;
  activeEvents: number;
  upcomingEvents: number;
  totalCategories: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface FilterOptions {
  category: string;
  location: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
  isPromoted: boolean | null;
  isPaid: boolean | null;
}