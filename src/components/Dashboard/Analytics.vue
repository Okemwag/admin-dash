<script setup lang="ts">
import { computed } from 'vue';
import { useEvents } from '../../composables/useEvents';
import { useDashboardMetrics } from '../../composables/useDashboardMetrics';
import MetricCard from './MetricCard.vue';
import EventsChart from './EventsChart.vue';

const { events } = useEvents();
const { metrics, categoryDistribution, locationDistribution } = useDashboardMetrics(events.value);

const revenueMetrics = computed(() => ({
  totalRevenue: metrics.value.totalRevenue,
  monthlyGrowth: metrics.value.monthlyGrowth,
  averagePerEvent: events.value.length > 0 ? metrics.value.totalRevenue / events.value.length : 0
}));
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Analytics</h1>
      <div class="flex space-x-3">
        <select class="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last year</option>
        </select>
      </div>
    </div>

    <!-- Revenue Metrics -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <MetricCard
        title="Total Revenue"
        :value="revenueMetrics.totalRevenue"
        icon="dollar"
        color="green"
        :trend="revenueMetrics.monthlyGrowth"
      />
      <MetricCard
        title="Monthly Growth"
        :value="Math.round(revenueMetrics.monthlyGrowth)"
        icon="trending"
        color="blue"
      />
      <MetricCard
        title="Avg per Event"
        :value="Math.round(revenueMetrics.averagePerEvent)"
        icon="dollar"
        color="purple"
      />
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Events by Category</h3>
        <EventsChart :data="categoryDistribution" />
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Events by Location</h3>
        <EventsChart :data="locationDistribution" />
      </div>
    </div>

    <!-- Detailed Analytics Table -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Event Performance</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registrations
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversion
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="event in events.slice(0, 10)" :key="event.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <img
                    :src="event.posterImage"
                    :alt="event.title"
                    class="w-10 h-10 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ event.title }}</div>
                    <div class="text-sm text-gray-500">{{ event.city }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ Math.floor(Math.random() * 1000) + 100 }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ Math.floor(Math.random() * 200) + 50 }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                ${{ (Math.random() * 5000 + 1000).toFixed(0) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ (Math.random() * 30 + 10).toFixed(1) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>