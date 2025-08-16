<script setup lang="ts">
import { computed } from 'vue';
import { useEvents } from '../../composables/useEvents';
import { MapPinIcon } from '@heroicons/vue/24/outline';
import LocationMap from './LocationMap.vue';

const { events } = useEvents();

const locationStats = computed(() => {
  const stats: Record<string, { count: number; events: any[] }> = {};
  
  events.value.forEach(event => {
    const key = `${event.city}, ${event.country}`;
    if (!stats[key]) {
      stats[key] = { count: 0, events: [] };
    }
    stats[key].count++;
    stats[key].events.push(event);
  });

  return Object.entries(stats)
    .map(([location, data]) => ({ location, ...data }))
    .sort((a, b) => b.count - a.count);
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Event Locations</h1>
    </div>

    <!-- Map View -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">All Event Locations</h3>
      <div class="h-96">
        <LocationMap :events="events" />
      </div>
    </div>

    <!-- Location Statistics -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Location Statistics</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div
          v-for="stat in locationStats"
          :key="stat.location"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <MapPinIcon class="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ stat.location }}</h4>
                <p class="text-sm text-gray-500">{{ stat.count }} event{{ stat.count !== 1 ? 's' : '' }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">
                  {{ stat.events.filter(e => e.isActive).length }} Active
                </div>
                <div class="text-sm text-gray-500">
                  {{ stat.events.filter(e => new Date(e.startDate) > new Date()).length }} Upcoming
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>