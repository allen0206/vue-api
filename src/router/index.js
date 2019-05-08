import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/pages/login'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: '登入',
      component: login,
    }
  ]
})
