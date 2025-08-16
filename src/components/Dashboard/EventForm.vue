<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { Event } from '../../types/Event';

interface Props {
  event?: Event;
  mode: 'create' | 'edit';
}

const props = defineProps<Props>();
const router = useRouter();

const form = reactive({
  title: props.event?.title || '',
  description: props.event?.description || '',
  longDescription: props.event?.longDescription || '',
  shortDescription: props.event?.shortDescription || '',
  category: props.event?.category || '',
  startDate: props.event?.startDate || '',
  startTime: props.event?.startTime || '',
  endDate: props.event?.endDate || '',
  endTime: props.event?.endTime || '',
  venue: props.event?.location.venue || '',
  address: props.event?.location.address || '',
  city: props.event?.city || '',
  country: props.event?.country || '',
  latitude: props.event?.location.latitude || 0,
  longitude: props.event?.location.longitude || 0,
  posterImage: props.event?.posterImage || '',
  website: props.event?.website || '',
  organizer: props.event?.organizer || '',
  isFree: props.event?.tickets.isFree || true,
  isPromoted: props.event?.isPromoted || false,
  isPublished: props.event?.isPublished || false,
  isPublic: props.event?.isPublic || true,
  facebook: props.event?.socialLinks.facebook || '',
  twitter: props.event?.socialLinks.twitter || '',
  instagram: props.event?.socialLinks.instagram || '',
  linkedin: props.event?.socialLinks.linkedin || ''
});

const categories = [
  'Technology',
  'Music',
  'Sports',
  'Business',
  'Education',
  'Arts',
  'Food',
  'Health'
];

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', form);
    router.push('/admin/events');
  } catch (error) {
    console.error('Error saving event:', error);
  } finally {
    loading.value = false;
  }
};

const handleCancel = () => {
  router.push('/admin/events');
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ mode === 'create' ? 'Create New Event' : 'Edit Event' }}
      </h1>
      <p class="mt-2 text-sm text-gray-600">
        {{ mode === 'create' ? 'Fill in the details below to create a new event.' : 'Update the event details below.' }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input
              v-model="form.title"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter event title"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="form.category"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option v-for="category in categories" :key="category" :value="category.toLowerCase()">
                {{ category }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
            <input
              v-model="form.organizer"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Event organizer"
            />
          </div>

          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <input
              v-model="form.shortDescription"
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description for listings"
            />
          </div>

          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Event description"
            ></textarea>
          </div>

          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Long Description</label>
            <textarea
              v-model="form.longDescription"
              rows="5"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed event description"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Date and Time -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Date & Time</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              v-model="form.startDate"
              type="date"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              v-model="form.startTime"
              type="time"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              v-model="form.endDate"
              type="date"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              v-model="form.endTime"
              type="time"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Location -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Location</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Venue</label>
            <input
              v-model="form.venue"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Venue name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              v-model="form.address"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Street address"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              v-model="form.city"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="City"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <input
              v-model="form.country"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Country"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
            <input
              v-model.number="form.latitude"
              type="number"
              step="any"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.000000"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
            <input
              v-model.number="form.longitude"
              type="number"
              step="any"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.000000"
            />
          </div>
        </div>
      </div>

      <!-- Media & Links -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Media & Links</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Poster Image URL</label>
            <input
              v-model="form.posterImage"
              type="url"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <input
              v-model="form.website"
              type="url"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://event-website.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
            <input
              v-model="form.facebook"
              type="url"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://facebook.com/event"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
            <input
              v-model="form.twitter"
              type="url"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://twitter.com/event"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <input
              v-model="form.instagram"
              type="url"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://instagram.com/event"
            />
          </div>
        </div>
      </div>

      <!-- Settings -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Event Settings</h2>
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              v-model="form.isFree"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Free Event</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="form.isPromoted"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Promote Event</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="form.isPublished"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Publish Event</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="form.isPublic"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Public Event</label>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          @click="handleCancel"
          class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : (mode === 'create' ? 'Create Event' : 'Update Event') }}
        </button>
      </div>
    </form>
  </div>
</template>