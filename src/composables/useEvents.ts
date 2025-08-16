import { ref, computed } from 'vue';
import type { Event, FilterOptions } from '../types/Event';

// Mock data for demonstration
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference',
    longDescription: 'A comprehensive technology conference featuring the latest innovations...',
    shortDescription: 'Annual tech conference',
    category: 'technology',
    categoryObject: {
      id: 'tech',
      name: 'Technology',
      description: 'Tech events',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      order: 1
    },
    startDate: '2025-03-15',
    startTime: '09:00',
    date: '2025-03-15',
    endDate: '2025-03-17',
    endTime: '18:00',
    location: {
      venue: 'Convention Center',
      address: '123 Main St',
      latitude: 40.7128,
      longitude: -74.0060,
      city: 'New York',
      country: 'USA'
    },
    city: 'New York',
    country: 'USA',
    tickets: { isFree: false, tiers: [] },
    posterImage: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    website: 'https://techconf.com',
    socialLinks: { facebook: '', twitter: '', instagram: '', linkedin: '' },
    organizer: 'Tech Corp',
    isPromoted: true,
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z',
    createdBy: { id: '1', email: 'admin@example.com', image: '' },
    additionalMedia: [],
    transaction: null,
    isPaid: true,
    publishedAt: '2025-01-01T00:00:00Z',
    isPublished: true,
    isPublic: true,
    isApproved: true,
    isActive: true
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'Summer music festival',
    longDescription: 'Three days of amazing music performances...',
    shortDescription: 'Summer music fest',
    category: 'music',
    categoryObject: {
      id: 'music',
      name: 'Music',
      description: 'Music events',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
      order: 2
    },
    startDate: '2025-07-20',
    startTime: '14:00',
    date: '2025-07-20',
    endDate: '2025-07-22',
    endTime: '23:00',
    location: {
      venue: 'Central Park',
      address: 'Central Park West',
      latitude: 40.7829,
      longitude: -73.9654,
      city: 'New York',
      country: 'USA'
    },
    city: 'New York',
    country: 'USA',
    tickets: { isFree: false, tiers: [] },
    posterImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
    website: 'https://musicfest.com',
    socialLinks: { facebook: '', twitter: '', instagram: '', linkedin: '' },
    organizer: 'Music Events Inc',
    isPromoted: false,
    createdAt: '2025-01-02T00:00:00Z',
    updatedAt: '2025-01-02T00:00:00Z',
    createdBy: { id: '1', email: 'admin@example.com', image: '' },
    additionalMedia: [],
    transaction: null,
    isPaid: true,
    publishedAt: '2025-01-02T00:00:00Z',
    isPublished: true,
    isPublic: true,
    isApproved: true,
    isActive: true
  }
];

export function useEvents() {
  const events = ref<Event[]>(mockEvents);
  const loading = ref(false);
  const selectedEvents = ref<string[]>([]);
  const filters = ref<FilterOptions>({
    category: '',
    location: '',
    status: '',
    dateRange: { start: '', end: '' },
    isPromoted: null,
    isPaid: null
  });

  const filteredEvents = computed(() => {
    return events.value.filter(event => {
      if (filters.value.category && event.category !== filters.value.category) return false;
      if (filters.value.location && !event.city.toLowerCase().includes(filters.value.location.toLowerCase())) return false;
      if (filters.value.isPromoted !== null && event.isPromoted !== filters.value.isPromoted) return false;
      if (filters.value.isPaid !== null && event.isPaid !== filters.value.isPaid) return false;
      return true;
    });
  });

  const searchEvents = (query: string) => {
    if (!query) return filteredEvents.value;
    
    return filteredEvents.value.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.city.toLowerCase().includes(query.toLowerCase()) ||
      event.organizer.toLowerCase().includes(query.toLowerCase())
    );
  };

  const deleteEvent = (id: string) => {
    events.value = events.value.filter(event => event.id !== id);
  };

  const bulkDelete = () => {
    events.value = events.value.filter(event => !selectedEvents.value.includes(event.id));
    selectedEvents.value = [];
  };

  const bulkApprove = () => {
    events.value = events.value.map(event => 
      selectedEvents.value.includes(event.id) 
        ? { ...event, isApproved: true }
        : event
    );
    selectedEvents.value = [];
  };

  const bulkPromote = () => {
    events.value = events.value.map(event => 
      selectedEvents.value.includes(event.id) 
        ? { ...event, isPromoted: true }
        : event
    );
    selectedEvents.value = [];
  };

  return {
    events,
    loading,
    selectedEvents,
    filters,
    filteredEvents,
    searchEvents,
    deleteEvent,
    bulkDelete,
    bulkApprove,
    bulkPromote
  };
}