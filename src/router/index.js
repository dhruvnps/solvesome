import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import { computed } from 'vue';
import { store } from '@/store';

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

router.beforeEach(async function (to, from, next) {
  await store.dispatch("authAction");
  var isAuth = computed(() => store.getters.isUserAuth).value
  if (to.meta.authRequired) {
    if (isAuth) {
      next();
    } else {
      next({ path: '/login' });
    }
  } else if (to.meta.login) {
    if (isAuth) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
