<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEvents } from '../../composables/useEvents';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/vue/24/outline';
import SearchFilters from './SearchFilters.vue';
import BulkActions from './BulkActions.vue';

const { 
  events, 
  selectedEvents, 
  filteredEvents, 
  searchEvents, 
  deleteEvent 
} = useEvents();

const searchQuery = ref('');
const showFilters = ref(false);
const showBulkActions = ref(false);

const displayedEvents = computed(() => {
  return searchEvents(searchQuery.value);
});

const allSelected = computed({
  get: () => selectedEvents.value.length === displayedEvents.value.length && displayedEvents.value.length > 0,
  set: (value: boolean) => {
    selectedEvents.value = value ? displayedEvents.value.map(e => e.id) : [];
  }
});

const toggleEventSelection = (eventId: string) => {
  const index = selectedEvents.value.indexOf(eventId);
  if (index > -1) {
    selectedEvents.value.splice(index, 1);
  } else {
    selectedEvents.value.push(eventId);
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};

const getStatusColor = (event: any) => {
  if (!event.isActive) return 'bg-gray-100 text-gray-800';
  if (!event.isApproved) return 'bg-red-100 text-red-800';
  if (event.isPublished) return 'bg-green-100 text-green-800';
  return 'bg-yellow-100 text-yellow-800';
};

const getStatusText = (event: any) => {
  if (!event.isActive) return 'Inactive';
  if (!event.isApproved) return 'Pending';
  if (event.isPublished) return 'Published';
  return 'Draft';
};
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Events Management</h1>
      <div class="mt-4 sm:mt-0 flex space-x-3">
        <button
          @click="showFilters = !showFilters"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FunnelIcon class="w-4 h-4 mr-2" />
          Filters
        </button>
        <router-link
          to="/admin/events/create"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Event
        </router-link>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="mb-6 space-y-4">
      <!-- Search Bar -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search events by title, description, city, or organizer..."
          class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Filters Panel -->
      <SearchFilters v-if="showFilters" />
    </div>

    <!-- Bulk Actions -->
    <BulkActions 
      v-if="selectedEvents.length > 0" 
      :selected-count="selectedEvents.length"
      @close="selectedEvents = []"
    />

    <!-- Events Table -->
    <div class="bg-white shadow-sm rounded-lg border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">
                <input
                  v-model="allSelected"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
            <tr
              v-for="event in displayedEvents"
              :key="event.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <input
                  :checked="selectedEvents.includes(event.id)"
                  @change="toggleEventSelection(event.id)"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <img
                    :src="event.posterImage"
                    :alt="event.title"
                    class="w-12 h-12 rounded-lg object-cover mr-4"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ event.title }}</div>
                    <div class="text-sm text-gray-500">{{ event.organizer }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ event.categoryObject.name }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                <div>{{ event.city }}</div>
                <div class="text-gray-500">{{ event.country }}</div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ formatDate(event.startDate) }}
              </td>
              <td class="px-6 py-4">
                <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusColor(event)]">
                  {{ getStatusText(event) }}
                </span>
                <span
                  v-if="event.isPromoted"
                  class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  Promoted
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    class="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                    title="View Event"
                  >
                    <EyeIcon class="w-4 h-4" />
                  </button>
                  <button
                    class="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-50"
                    title="Edit Event"
                  >
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteEvent(event.id)"
                    class="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                    title="Delete Event"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="displayedEvents.length === 0" class="text-center py-12">
        <div class="text-gray-500">
          <CalendarIcon class="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p class="text-sm">Try adjusting your search or filters to find events.</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-6 flex items-center justify-between">
      <div class="text-sm text-gray-700">
        Showing {{ displayedEvents.length }} of {{ events.length }} events
      </div>
      <div class="flex space-x-2">
        <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
          Previous
        </button>
        <button class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  </div>
</template>