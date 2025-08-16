<script setup lang="ts">
import { useEvents } from '../../composables/useEvents';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const { filters, events } = useEvents();

const categories = computed(() => {
  const uniqueCategories = new Set(events.value.map(event => event.categoryObject.name));
  return Array.from(uniqueCategories);
});

const locations = computed(() => {
  const uniqueLocations = new Set(events.value.map(event => `${event.city}, ${event.country}`));
  return Array.from(uniqueLocations);
});

const clearFilters = () => {
  filters.value = {
    category: '',
    location: '',
    status: '',
    dateRange: { start: '', end: '' },
    isPromoted: null,
    isPaid: null
  };
};
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium text-gray-900">Filters</h3>
      <button
        @click="clearFilters"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        Clear all
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          v-model="filters.category"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Location Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <select
          v-model="filters.location"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">All Locations</option>
          <option v-for="location in locations" :key="location" :value="location">
            {{ location }}
          </option>
        </select>
      </div>

      <!-- Status Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="filters.status"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending Approval</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <!-- Promoted Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Promoted</label>
        <select
          v-model="filters.isPromoted"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option :value="null">All</option>
          <option :value="true">Promoted</option>
          <option :value="false">Not Promoted</option>
        </select>
      </div>

      <!-- Paid Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
        <select
          v-model="filters.isPaid"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option :value="null">All</option>
          <option :value="true">Paid</option>
          <option :value="false">Free</option>
        </select>
      </div>

      <!-- Date Range -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
        <div class="flex space-x-2">
          <input
            v-model="filters.dateRange.start"
            type="date"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <input
            v-model="filters.dateRange.end"
            type="date"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>