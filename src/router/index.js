import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue'; // Adjust paths as necessary
import CustomPage from '@/pages/CustomPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/custom', name: 'CustomPage', component: CustomPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
