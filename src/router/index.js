import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '../stores/users.store'
import { checkNumericalParams } from '../utils/routes.utils'
// Imports above

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        if (userStore.isLoggedIn) return { name: 'home' }

        return true
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue'),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        if (userStore.isLoggedIn) return { name: 'home' }

        return true
      },
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: (to, from) => {
        const userStore = useUserStore()
        if (userStore.isAdmin || userStore.isManager) {
          return true
        }

        return { name: 'login' }
      },
      children: [
        {
          path: '',
          name: 'admin-dashboard-options',
          component: () => import('../views/admin/DashboardHomeView.vue'),
        },
        {
          path: 'restaurants',
          name: 'admin-monitor-restaurants',
          component: () => import('../views/admin/AdminRestaurantsView.vue'),
        },
        {
          path: 'restaurants/create',
          name: 'admin-create-restaurant',
          component: () =>
            import('../views/admin/AdminCreateRestaurantView.vue'),
        },
        {
          path: 'restaurants/:id',
          name: 'admin-edit',
          component: () => import('../views/admin/AdminEditRestaurantView.vue'),
          beforeEnter: (to, from) => {
            if (!checkNumericalParams(to, ['id'])) {
              return {
                name: 'admin-monitor-restaurants',
              }
            }

            return true
          },
        },
      ],
    },
    // {
    //   path: '/admin/restaurants',
    //   name: 'admin',
    //   component: () => import('../views/admin/AdminRestaurantsView.vue'),
    // },
    // {
    //   path: '/admin/restaurants/addrest',
    //   name: 'addrest',
    //   component: () => import('../views/admin/AddRestView.vue'),
    // },
    // {
    //   path: '/admin/restaurants/:id',
    //   name: 'individual restaurants',
    //   component: () => import('../views/admin/AdminIndividualRestView.vue'),
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ],
})

// before each route, set user from the accessToken  that is present in localStorage
router.beforeEach(() => {
  const userStore = useUserStore()
  userStore.decodeTokenSetUser()
})

export default router
