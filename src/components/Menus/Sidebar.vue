<template>
  <aside class="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col shadow-lg">
    <!-- Logo / App Name -->
    <div class="p-6 text-2xl font-extrabold tracking-wide border-b border-gray-700">
      My App
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-800"
        :class="{ 'bg-gray-800 text-white': $route.path.startsWith(item.to) }"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="font-medium">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-gray-700 text-xs text-gray-500">
      &copy; 2025 My App
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { HomeIcon, CalendarDaysIcon, ChartBarIcon, MapPinIcon, TagIcon, UserGroupIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";

const route = useRoute();

const menuItems = [
  { label: "Dashboard", to: "/admin", icon: HomeIcon },
  { label: "Events", to: "/admin/events", icon: CalendarDaysIcon },
  { label: "Analytics", to: "/admin/analytics", icon: ChartBarIcon },
  { label: "Locations", to: "/admin/locations", icon: MapPinIcon },
  { label: "Categories", to: "/admin/categories", icon: TagIcon },
  { label: "Users", to: "/admin/users", icon: UserGroupIcon },
  { label: "Settings", to: "/admin/settings", icon: Cog6ToothIcon },
];
</script>

<style scoped>
/* Smooth sidebar link transitions */
.router-link-active {
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
