import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue';
import { auth } from '@/firebase'

// the routes link page components to unique urls
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // metadata to show this is a page for unauthenticated users
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
    // metadata to show this is a page for authenticated users
    meta: { authRequired: true },
  },
  {
    // the problem id is passed to the problem page url
    // this defines which problem is shown
    path: '/problem/:id',
    name: 'Problem',
    props: true,
    // fetches the problem page when required
    component: () => import('@/views/Problem.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { authRequired: true },
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue'),
    meta: { authRequired: true },
  }
];

// creates router with the routes defined above
// the router handles the page url navigation system
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// this function sets up an authentication guard on the pages
router.beforeEach((to, from, next) => {
  // called every time the authentication status is changed
  auth.onAuthStateChanged(authUser => {
    if (to.meta.authRequired) {
      // if the goto page is for authenticated users only
      if (authUser) {
        // continue to page if user is authenticated
        next();
      } else {
        // redirect to login page if user is not authenticated
        next({ path: '/login' });
      }
    } else if (to.meta.login) {
      // if the goto page is for unauthenticated users only
      if (authUser) {
        // redirect to home page if user is already authenticated
        next({ path: '/' });
      } else {
        // continue to page if user is not authenticated
        next();
      }
    } else {
      next();
    }
  });
});

export default router;
