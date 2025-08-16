<script setup lang="ts">
import { computed } from 'vue';
import { useEvents } from '../../composables/useEvents';
import { TagIcon, PlusIcon } from '@heroicons/vue/24/outline';

const { events } = useEvents();

const categoryStats = computed(() => {
  const stats: Record<string, { count: number; events: any[] }> = {};
  
  events.value.forEach(event => {
    const category = event.categoryObject.name;
    if (!stats[category]) {
      stats[category] = { count: 0, events: [] };
    }
    stats[category].count++;
    stats[category].events.push(event);
  });

  return Object.entries(stats)
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.count - a.count);
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Event Categories</h1>
      <button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
        <PlusIcon class="w-4 h-4 mr-2" />
        Add Category
      </button>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="stat in categoryStats"
        :key="stat.category"
        class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-blue-100 rounded-lg">
              <TagIcon class="h-6 w-6 text-blue-600" />
            </div>
            <h3 class="text-lg font-medium text-gray-900">{{ stat.category }}</h3>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Total Events</span>
            <span class="font-medium text-gray-900">{{ stat.count }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Active</span>
            <span class="font-medium text-green-600">
              {{ stat.events.filter(e => e.isActive).length }}
            </span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">Upcoming</span>
            <span class="font-medium text-blue-600">
              {{ stat.events.filter(e => new Date(e.startDate) > new Date()).length }}
            </span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex space-x-2">
            <button class="flex-1 text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              View Events
            </button>
            <button class="flex-1 text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
              Edit Category
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Management Table -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Category Management</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Events Count
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="stat in categoryStats" :key="stat.category" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <TagIcon class="h-5 w-5 text-gray-400 mr-3" />
                  <div class="text-sm font-medium text-gray-900">{{ stat.category }}</div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ stat.count }}
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-medium">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-900">Edit</button>
                  <button class="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>