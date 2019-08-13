import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index.js'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})


const paths = ['/a','/b']
//全局前置守卫
router.beforeEach((to,from,next)=>{
  const path = to.path
  if(paths.indexOf(path)!==-1&& !store.state.user.user._id){
    return next('/login')
  }
  next()
})

export default router