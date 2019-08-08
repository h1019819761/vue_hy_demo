import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

const routernew = new VueRouter({
  mode: 'history',
  routes
})
export default routernew