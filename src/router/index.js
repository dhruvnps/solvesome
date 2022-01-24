import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
