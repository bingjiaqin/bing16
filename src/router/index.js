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
      name: 'bing16',
      component: HomeView
    },
    {
      path: '/index',
      name: 'index',
      component: HomeView
    },
    {
      path: '/wyzx',
      name: 'wyzx',
      component: HomeView
    },
    {
      path: '/sslx',
      name: 'sslx',
      component: HomeView
    },
    {
      path: '/fgly',
      name: 'fgly',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: HomeView
    },
    {
      path: '/article/:pathMatch(.*)*',
      name: 'article',
      component: () => import('../views/Article.vue')
    }
]

const router = createRouter({
  history: createWebHistory(),
  mode: 'hash',
  routes: routes
})

export default router
