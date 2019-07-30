// ref. https://router.vuejs.org/zh/guide/advanced/lazy-loading.html

export default (name, index = false) => () =>
  import(/* webpackChunkName: "page-" */ `../views/${name}${index ? '/index' : ''}.vue`);
