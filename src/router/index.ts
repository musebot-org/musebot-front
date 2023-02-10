import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/feature',
    name: 'feature',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/started',
    name: 'started',
    component: () => import('../views/Home.vue')
  },
  // 不匹配路由重定向
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
