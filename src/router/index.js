import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/restaurants',
      name: 'admin',
      component: () => import('../views/admin/AdminRestaurantsView.vue'),
    },
    {
      path: '/admin/restaurants/addrest',
      name: 'addrest',
      component: () => import('../views/admin/AddRestView.vue'),
    },
    {
      path: '/admin/restaurants/:id',
      name: 'individual restaurants',
      component: () => import('../views/admin/AdminIndividualRestView.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
});

export default router;
