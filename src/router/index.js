import Vue from 'vue';
import Router from 'vue-router';
import lazyLoading from '@/utils/lazyLoading';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: lazyLoading('Home'),
      meta: {
        title: 'Cynthia Fan',
      },
    },
    {
      path: '/pomodoro',
      name: 'pomodoro',
      component: lazyLoading('Pomodoro', true),
      meta: {
        title: 'W1 - 蕃茄鐘',
      },
    },
    {
      path: '/free-cell',
      name: 'freeCell',
      component: lazyLoading('FreeCell', true),
      meta: {
        title: 'W2 - 新接龍',
      },
    },
  ],
});
