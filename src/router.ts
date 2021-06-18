import Vue from 'vue';
import Router from 'vue-router';
import BlankLayout from './modules/app/views/layout/blank/BlankLayout.vue';
import DashboardLayout from '@/modules/app/views/layout/dashboard/DashboardLayout.vue';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/',
          name: 'user',
          meta: {title: 'Личный Кабинет'},
          component: () => import('@/modules/user/views/UserProfile.vue'),
          props: true,
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {title: 'Админ панель'},
          component: () => import('@/modules/admin/views/Dashboard.vue'),
          props: true,
        },
        {
          path: '/drone-model',
          name: 'drone-model',
          meta: {title: 'Модель дрона'},
          component: () => import('@/modules/admin/views/Drone-model.vue'),
          props: true,
        },
        {
          path: '/profile',
          name: 'profile',
          meta: {title: 'Профили'},
          component: () => import('@/modules/user/views/Profiles.vue'),
          props: true,
        },
        {
          path: '/account',
          name: 'account',
          meta: {title: 'Настройки аккаунта'},
          component: () => import('@/modules/account/views/Account.vue'),
        },
        {
          path: '/drone-option',
          name: 'drone-option',
          meta: {title: 'Комплектация дрона'},
          component: () => import('@/modules/admin/views/Drone-option.vue'),
          props: true,
        },
        {
          path: '/drone',
          name: 'drone',
          meta: {title: 'Дрон'},
          component: () => import('@/modules/drone/views/Drone.vue'),
        },
        {
          path: '/add-drone',
          name: 'add-drone',
          meta: {title: 'Добавление дрона'},
          component: () => import('@/modules/drone/views/Add-drone.vue'),
          props: true,
        },
        {
          path: '/add-profile',
          name: 'add-profile',
          meta: {title: 'Добавление профиля'},
          component: () => import('@/modules/user/views/Add-profile.vue'),
        },
        {
          path: '/change-drone',
          name: 'change-drone',
          props: true,
          meta: {title: 'Изменение дрона'},
          component: () => import('@/modules/drone/views/Change-drone.vue'),
        },
        {
          path: '/change-profile',
          name: 'change-profile',
          props: true,
          meta: {title: 'Изменение профиля'},
          component: () => import('@/modules/user/views/Change-profile.vue'),
        },
      ],
    },
    {
      path: '',
      name: '',
      component: BlankLayout,
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: '/auth/login',
          name: 'login',
          component: () => import('./modules/auth/views/LoginPage.vue'),
        },  {
          path: '/auth/register',
          name: 'register',
          component: () => import('./modules/auth/views/RegisterPage.vue'),
        },
        {
          path: '/admin',
          name: 'request',
          component: () => import('@/modules/auth/views/AdminLoginPage.vue'),
          props: true,
        },
        {
          path: '*',
          name: 'not-found',
          component: () => import('./modules/app/views/error/NotFound.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // @ts-ignore
  const authenticated = store.state.auth.status;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !authenticated) {
    next('/auth/login');
  } else if (requiresAuth && authenticated) {
    next();
  } else {
    next();
  }
  if (to.path === '/auth/login' && authenticated) {
    next('');
  }
});

export default router;
