import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/problem/:ID',
    name: 'Problem',
    props: true,
    component: () => import('@/views/Problem.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
