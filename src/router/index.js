import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bing16',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue')
    // }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
