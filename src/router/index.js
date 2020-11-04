import Vue from 'vue';
import Router from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active', // 指定被激活的router为active
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'goods',
      redirect: '/goods'
    }, {
      path: '/goods',
      name: 'goods1',
      component: goods
    }, {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    }, {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
