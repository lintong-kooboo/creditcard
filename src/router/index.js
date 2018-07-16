import Vue from 'vue'
import Router from 'vue-router'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'creditcard',
      component: resolve => { require(['../components/creditcard.vue'], resolve) }
    }
  ]
})
