import router from './index';

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;

  return next();
});

// router.afterEach((to, from) => {

// })
