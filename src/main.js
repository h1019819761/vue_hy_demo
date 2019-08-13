import Vue from 'vue'
import App from './App.vue'
import router from './router'

import  './mock/mock-server'
import {Button} from 'mint-ui'
import store from './store/index'
import './validate'
import Star from './components/Star/Star.vue'
import Header from './components/Header/Header.vue'
import CartControl from './components/CartControl/CartControl.vue'
import loading from './common/images/tim.gif'
import  './api'
import VueLazyload from 'vue-lazyload';
Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component(Button.name,Button)
Vue.component('CartControl',CartControl)
Vue.use(VueLazyload,{
  loading
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
