import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'TestPage',
      path: '/test',
      component: () => import(/* webpackChunkName: "TestPage" */'./pages/test-page.vue'),
    },
    {
      name: 'AdminPage',
      path: '/:id?',
      component: () => import(/* webpackChunkName: "AdminPage" */'./pages/admin-page/index.vue'),
    },
  ],
});
