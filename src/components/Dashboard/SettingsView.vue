<script setup lang="ts">
import { ref, reactive } from 'vue';
import { 
  CogIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon 
} from '@heroicons/vue/24/outline';

const settings = reactive({
  siteName: 'EventAdmin',
  siteDescription: 'Professional event management platform',
  emailNotifications: true,
  pushNotifications: false,
  autoApproval: false,
  publicRegistration: true,
  maintenanceMode: false,
  googleMapsApiKey: '',
  stripeApiKey: '',
  emailProvider: 'smtp',
  smtpHost: '',
  smtpPort: 587,
  smtpUsername: '',
  smtpPassword: ''
});

const saving = ref(false);

const handleSave = async () => {
  saving.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Settings saved:', settings);
  } catch (error) {
    console.error('Error saving settings:', error);
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
    </div>

    <form @submit.prevent="handleSave" class="space-y-6">
      <!-- General Settings -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <div class="flex items-center mb-4">
          <CogIcon class="h-5 w-5 text-gray-400 mr-2" />
          <h2 class="text-lg font-medium text-gray-900">General Settings</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
            <input
              v-model="settings.siteName"
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
            <input
              v-model="settings.siteDescription"
              type="text"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Notification Settings -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <div class="flex items-center mb-4">
          <BellIcon class="h-5 w-5 text-gray-400 mr-2" />
          <h2 class="text-lg font-medium text-gray-900">Notifications</h2>
        </div>
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              v-model="settings.emailNotifications"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Email Notifications</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="settings.pushNotifications"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Push Notifications</label>
          </div>
        </div>
      </div>

      <!-- Security Settings -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <div class="flex items-center mb-4">
          <ShieldCheckIcon class="h-5 w-5 text-gray-400 mr-2" />
          <h2 class="text-lg font-medium text-gray-900">Security & Permissions</h2>
        </div>
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              v-model="settings.autoApproval"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Auto-approve new events</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="settings.publicRegistration"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Allow public event registration</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="settings.maintenanceMode"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Maintenance Mode</label>
          </div>
        </div>
      </div>

      <!-- API Configuration -->
      <div class="bg-white shadow-sm rounded-lg border p-6">
        <div class="flex items-center mb-4">
          <GlobeAltIcon class="h-5 w-5 text-gray-400 mr-2" />
          <h2 class="text-lg font-medium text-gray-900">API Configuration</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Google Maps API Key</label>
            <input
              v-model="settings.googleMapsApiKey"
              type="password"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter API key"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Stripe API Key</label>
            <input
              v-model="settings.stripeApiKey"
              type="password"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter API key"
            />
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end pt-6 border-t">
        <button
          type="submit"
          :disabled="saving"
          class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ saving ? 'Saving...' : 'Save Settings' }}
        </button>
      </div>
    </form>
  </div>
</template>