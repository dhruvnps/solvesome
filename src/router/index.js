import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import { auth } from '@/firebase'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { login: true },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Login,
    meta: { login: true },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { authRequired: true },
  },
  {
    path: '/problem/:ID',
    name: 'Problem',
    props: true,
    component: () => import('@/views/Problem.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue'),
    meta: { authRequired: true },
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(authUser => {
    if (to.meta.authRequired) {
      if (authUser) {
        next();
      } else {
        next({ path: '/login' });
      }
    } else if (to.meta.login) {
      if (authUser) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
