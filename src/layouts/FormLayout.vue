<script lang="ts" setup>
</script>

<template>
  <section class="w-full h-screen flex flex-col bg-gray-50">
    <header class="px-6 py-4 bg-white border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Event Management</h1>
        <router-link
          to="/admin/events"
          class="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to Events
        </router-link>
      </div>
    </header>
    <main class="flex-1 overflow-auto">
      <div class="w-full max-w-6xl mx-auto py-6">
        <RouterView />
      </div>
    </main>
  </section>
</template>