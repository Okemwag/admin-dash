<script lang="ts" setup>
import DashboardHeaderVue from '../components/Menus/DashboardHeader.vue';
import SidebarMenu from '../components/Menus/Sidebar.vue';
</script>

<template>
  <section class="w-full h-screen flex">
    <div class="w-64 flex-shrink-0 hidden lg:block">
      <SidebarMenu />
    </div>

    <section class="flex-1 flex flex-col min-w-0">
      <header class="flex-shrink-0">
        <DashboardHeaderVue />
      </header>

      <main class="flex-1 overflow-auto bg-gray-50">
        <router-view />
      </main>
    </section>
  </section>
</template>