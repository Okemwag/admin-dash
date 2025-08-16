<script setup lang="ts">
import { ref } from 'vue';
import { 
  BellIcon, 
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline';

const showProfileMenu = ref(false);
const notifications = ref(3);
</script>

<template>
  <div class="bg-white shadow-sm border-b border-gray-200">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Search -->
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search events, users, or anything..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
            <BellIcon class="h-6 w-6" />
            <span
              v-if="notifications > 0"
              class="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
            >
              {{ notifications }}
            </span>
          </button>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button
              @click="showProfileMenu = !showProfileMenu"
              class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100"
                alt="Admin"
              />
              <div class="hidden sm:block text-left">
                <p class="text-sm font-medium text-gray-900">Admin User</p>
                <p class="text-xs text-gray-500">Administrator</p>
              </div>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="showProfileMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <UserCircleIcon class="mr-3 h-4 w-4" />
                Your Profile
              </a>
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Cog6ToothIcon class="mr-3 h-4 w-4" />
                Settings
              </a>
              <hr class="my-1" />
              <a
                href="#"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon class="mr-3 h-4 w-4" />
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>