import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Dashboard from '@/components/dashboard'
import login from '@/components/pages/login'
import products from '@/components/pages/products'
import coupon from '@/components/pages/coupon'
import customer from '@/components/pages/customer'
import checkout from '@/components/pages/checkout'

export default new Router({
  routes: [
    {
      path: '*',
      redirect:'/login',
    },
    {
      path: '/login',
      name: '登入',
      component: login,
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard,
      children: [
       {
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
      ],
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
        path: 'customer',
        name: 'customer',
        component: customer,
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: checkout,
        }
      ],
    },
  ]
})
