<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Event } from '../../types/Event';

interface Props {
  events: Event[];
}

const props = defineProps<Props>();
const mapContainer = ref<HTMLDivElement>();

onMounted(() => {
  // Initialize Google Maps
  if (window.google && window.google.maps) {
    initMap();
  } else {
    // Load Google Maps API if not already loaded
    loadGoogleMapsAPI();
  }
});

function loadGoogleMapsAPI() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  
  (window as any).initMap = initMap;
}

function initMap() {
  if (!mapContainer.value) return;

  const map = new google.maps.Map(mapContainer.value, {
    zoom: 4,
    center: { lat: 40.7128, lng: -74.0060 },
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry.fill',
        stylers: [{ color: '#f5f5f5' }]
      }
    ]
  });

  // Add markers for each event
  props.events.forEach(event => {
    const marker = new google.maps.Marker({
      position: {
        lat: event.location.latitude,
        lng: event.location.longitude
      },
      map: map,
      title: event.title,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#3B82F6"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 24)
      }
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-2">
          <h3 class="font-semibold">${event.title}</h3>
          <p class="text-sm text-gray-600">${event.location.venue}</p>
          <p class="text-sm text-gray-600">${event.city}, ${event.country}</p>
          <p class="text-xs text-gray-500">${new Date(event.startDate).toLocaleDateString()}</p>
        </div>
      `
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}
</script>

<template>
  <div class="h-64 w-full rounded-lg overflow-hidden">
    <div 
      ref="mapContainer" 
      class="w-full h-full bg-gray-100 flex items-center justify-center"
    >
      <div class="text-center text-gray-500">
        <p class="text-sm">Map will load here</p>
        <p class="text-xs mt-1">Configure Google Maps API key to enable</p>
      </div>
    </div>
  </div>
</template>