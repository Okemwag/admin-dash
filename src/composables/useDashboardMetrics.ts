import { computed } from 'vue';
import type { Event, DashboardMetrics } from '../types/Event';

export function useDashboardMetrics(events: Event[]) {
  const metrics = computed<DashboardMetrics>(() => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const activeEvents = events.filter(event => event.isActive && event.isPublished);
    const upcomingEvents = events.filter(event => new Date(event.startDate) > now);
    const thisMonthEvents = events.filter(event => new Date(event.createdAt) >= thisMonth);
    const lastMonthEvents = events.filter(event => 
      new Date(event.createdAt) >= lastMonth && new Date(event.createdAt) < thisMonth
    );

    const categories = new Set(events.map(event => event.category));
    const totalRevenue = events.reduce((sum, event) => {
      return sum + (event.isPaid ? 1000 : 0); // Mock revenue calculation
    }, 0);

    const monthlyGrowth = lastMonthEvents.length > 0 
      ? ((thisMonthEvents.length - lastMonthEvents.length) / lastMonthEvents.length) * 100
      : 0;

    return {
      totalEvents: events.length,
      activeEvents: activeEvents.length,
      upcomingEvents: upcomingEvents.length,
      totalCategories: categories.size,
      totalRevenue,
      monthlyGrowth
    };
  });

  const categoryDistribution = computed(() => {
    const distribution: Record<string, number> = {};
    events.forEach(event => {
      distribution[event.categoryObject.name] = (distribution[event.categoryObject.name] || 0) + 1;
    });
    return distribution;
  });

  const locationDistribution = computed(() => {
    const distribution: Record<string, number> = {};
    events.forEach(event => {
      const location = `${event.city}, ${event.country}`;
      distribution[location] = (distribution[location] || 0) + 1;
    });
    return distribution;
  });

  return {
    metrics,
    categoryDistribution,
    locationDistribution
  };
}