import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/home-view.vue';
import { ROUTENAMES } from '@/enums/route-names';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTENAMES.Home,
      component: HomeView,
    },
  ],
});

export default router;
