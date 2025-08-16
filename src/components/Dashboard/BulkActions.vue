<script setup lang="ts">
import { useEvents } from '../../composables/useEvents';
import { 
  CheckIcon, 
  StarIcon, 
  TrashIcon, 
  XMarkIcon 
} from '@heroicons/vue/24/outline';

interface Props {
  selectedCount: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const { bulkDelete, bulkApprove, bulkPromote } = useEvents();

const handleBulkDelete = () => {
  if (confirm(`Are you sure you want to delete ${props.selectedCount} events?`)) {
    bulkDelete();
    emit('close');
  }
};

const handleBulkApprove = () => {
  bulkApprove();
  emit('close');
};

const handleBulkPromote = () => {
  bulkPromote();
  emit('close');
};
</script>

<template>
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <span class="text-sm font-medium text-blue-900">
          {{ selectedCount }} event{{ selectedCount !== 1 ? 's' : '' }} selected
        </span>
        <div class="flex space-x-2">
          <button
            @click="handleBulkApprove"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <CheckIcon class="w-4 h-4 mr-1" />
            Approve
          </button>
          <button
            @click="handleBulkPromote"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <StarIcon class="w-4 h-4 mr-1" />
            Promote
          </button>
          <button
            @click="handleBulkDelete"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <TrashIcon class="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
      <button
        @click="emit('close')"
        class="text-blue-400 hover:text-blue-600"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>