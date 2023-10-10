import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import ListPage from './pages/ListPage.vue';

Vue.use(Router);

const routes = [
    {
      path: '/',
      component: LoginPage
    },
    {
      path: '/list',
      name: 'ListPage',
      component: ListPage,
    },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
