<template>
  <div class="p-6 space-y-6">
    <!-- Page Title -->
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      <p class="text-gray-500">Quick summary of your event platform's performance</p>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="metric in metricsList"
        :key="metric.label"
        class="bg-white shadow rounded-lg p-5 flex flex-col items-start"
      >
        <p class="text-sm text-gray-500">{{ metric.label }}</p>
        <p class="mt-2 text-2xl font-bold text-gray-800">{{ metric.value }}</p>
      </div>
    </div>

    <!-- Upcoming Events Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">Upcoming Events</h2>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Date</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Location</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="event in upcomingEvents" :key="event.id">
            <td class="px-4 py-2 text-sm text-gray-800">{{ event.title }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ event.categoryObject.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ event.startDate }} {{ event.startTime }}</td>
            <td class="px-4 py-2 text-sm text-gray-500">{{ event.location.city }}, {{ event.location.country }}</td>
            <td>
              <span
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="event.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
              >
                {{ event.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event, DashboardMetrics } from '../../types/Event';

// Sample Metrics Data (You will fetch this from API later)
const metrics: DashboardMetrics = {
  totalEvents: 120,
  activeEvents: 75,
  upcomingEvents: 15,
  totalCategories: 8,
  totalRevenue: 15400,
  monthlyGrowth: 12.5
}

// Prepare metrics for display
const metricsList = [
  { label: 'Total Events', value: metrics.totalEvents },
  { label: 'Active Events', value: metrics.activeEvents },
  { label: 'Upcoming Events', value: metrics.upcomingEvents },
  { label: 'Total Categories', value: metrics.totalCategories },
  { label: 'Total Revenue', value: `$${metrics.totalRevenue.toLocaleString()}` },
  { label: 'Monthly Growth', value: `${metrics.monthlyGrowth}%` }
]

// Sample Upcoming Events (You will fetch from API later)
const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: '',
    longDescription: '',
    shortDescription: '',
    category: 'tech',
    categoryObject: { id: 'c1', name: 'Technology', description: '', image: '', order: 1 },
    startDate: '2025-09-01',
    startTime: '10:00 AM',
    date: '',
    endDate: '2025-09-01',
    endTime: '4:00 PM',
    location: { venue: '', address: '', latitude: 0, longitude: 0, city: 'Nairobi', country: 'Kenya' },
    city: '',
    country: '',
    tickets: { isFree: false, tiers: [] },
    posterImage: '',
    website: '',
    socialLinks: { facebook: '', twitter: '', instagram: '', linkedin: '' },
    organizer: '',
    isPromoted: false,
    createdAt: '',
    updatedAt: '',
    createdBy: { id: '', email: '', image: '' },
    additionalMedia: [],
    transaction: null,
    isPaid: true,
    publishedAt: '',
    isPublished: true,
    isPublic: true,
    isApproved: true,
    isActive: true
  }
]
</script>

<style scoped>
/* Additional fine-tuned styles if needed */
</style>
