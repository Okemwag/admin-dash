import { createRouter, createWebHistory } from 'vue-router';
import DashboardOverview from '../components/Dashboard/DashboardOverview.vue';
import EventsTable from '../components/Dashboard/EventsTable.vue';
import EventForm from '../components/Dashboard/EventForm.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('../layouts/AdminDashboard.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: DashboardOverview
        },
        {
          path: 'events',
          name: 'Events',
          component: EventsTable
        },
        {
          path: 'events/create',
          name: 'CreateEvent',
          component: () => import('../layouts/FormLayout.vue'),
          children: [
            {
              path: '',
              component: EventForm,
              props: { mode: 'create' }
            }
          ]
        },
        {
          path: 'events/:id/edit',
          name: 'EditEvent',
          component: () => import('../layouts/FormLayout.vue'),
          children: [
            {
              path: '',
              component: EventForm,
              props: { mode: 'edit' }
            }
          ]
        },
        {
          path: 'analytics',
          name: 'Analytics',
          component: () => import('../components/Dashboard/Analytics.vue')
        },
        {
          path: 'locations',
          name: 'Locations',
          component: () => import('../components/Dashboard/LocationsView.vue')
        },
        {
          path: 'categories',
          name: 'Categories',
          component: () => import('../components/Dashboard/CategoriesView.vue')
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../components/Dashboard/UsersView.vue')
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('../components/Dashboard/SettingsView.vue')
        }
      ]
    }
  ]
});

export default router;