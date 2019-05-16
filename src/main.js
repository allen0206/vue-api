// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import App from './App'
import router from './router'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import './bus';
import currency from './filters/currency'
import VeeValidate from 'vee-validate';
import validationMessages from 'vee-validate/dist/locale/zh_TW';

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
Vue.component('Loading', Loading);
Vue.filter('currency', currency);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',validationMessages)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  // ...
  console.log(to, from, next);
  if (to.meta.requiresAuth) {
    console.log('需要驗證');
    const api = `${process.env.APIPATH}api/user/check`;
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path:'/login'
        })
      }
    });
  } else {
      next();
  }
})
