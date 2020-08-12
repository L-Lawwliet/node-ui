import Form from '../pages/Form';
import Hello from '../pages/Hello';
import Router from 'vue-router';
import Vue from 'vue';
import index from '../pages/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/index',
      component: index
    }
  ]
});
