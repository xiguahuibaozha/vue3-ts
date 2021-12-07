import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import _import from "./_import"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/menu',
    name: 'layout',
    component: () => import('@/layout/layout.vue'),
    redirect: "/menu/menu01",
    children: [{
      path: '/menu/menu01',
      name: 'menu01',
      component: () => import('@/views/pages/menu01/index.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
