import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Dashboard from '@/components/dashboard'
import home from '@/components/home'
import login from '@/components/pages/login'
import products from '@/components/pages/products'
import coupon from '@/components/pages/coupon'
import order from '@/components/pages/order'
// import customer from '@/components/pages/customer'
// import checkout from '@/components/pages/checkout'
import commodity from '@/components/pages/commodity'
import information from '@/components/pages/information'


export default new Router({
  routes: [{
      path: '*',
      redirect: '/login',
    },
    {
      path: '/login',
      name: '登入',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
          path: 'commodity',
          name: 'commodity',
          component: commodity,
        },
        {
          path: 'information',
          name: 'information',
          component: information,
        }
      ]
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
    // {
    //   path: '/',
    //   name: 'dashboard',
    //   component: Dashboard,
    //   children: [{
    //       path: 'customer',
    //       name: 'customer',
    //       component: customer,
    //     },
    //     {
    //       path: 'checkout/:orderId',
    //       name: 'checkout',
    //       component: checkout,
    //     }
    //   ],
    // },
  ]
})
