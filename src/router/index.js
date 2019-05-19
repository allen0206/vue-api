import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Dashboard from '@/components/dashboard'
import login from '@/components/pages/login'
import products from '@/components/pages/products'
import coupon from '@/components/pages/coupon'
import order from '@/components/pages/order'
import commodity from '@/components/pages/commodity'
import information from '@/components/pages/information'
import payment from '@/components/pages/payment'

export default new Router({
  routes: [{
      path: '*',
      redirect: '/commodity',
    },
    {
      path: '/login',
      name: '登入',
      component: login,
    },
    {
      path: '/commodity',
      name: 'commodity',
      component: commodity,
    },
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    {
      path: '/payment/:orderId',
      name: 'payment',
      component: payment,
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children: [{
          path: 'products',
          name: 'products',
          component: products,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component: coupon,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'order',
          name: 'order',
          component: order,
          meta: {
            requiresAuth: true
          },
        },
      ],
    },
  ]
})
