import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Dashboard from '@/components/dashboard'
import login from '@/components/pages/login'
import products from '@/components/pages/products'

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
      name: 'HelloWorld',
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
      ],
    },
  ]
})
