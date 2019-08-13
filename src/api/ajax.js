import axios from 'axios'
import qs from 'qs'
import  store from '../store'
import router from '../router'
import {Toast} from 'mint-ui'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 1. 处理post请求的请求休参数: 转换为urlencode格式(默认用的json格式): 请求拦截器
  const {
    method,
    data
  } = config
  if (method.toUpperCase() === 'POST' && data instanceof Object) {
    config.data = qs.stringify(data)
  }

  // 4. 如果需要携带token的请求, 从state中取出token
  if (config.headers.needToken) {
    const token = store.state.user.token
    // 1). 没有, 不发请求, 直接进入失败的流程
    if (!token) {
      const error = new Error('没有token, 不能发请求')
      
      throw error
    } else {
       // 2). 有, 添加到请求头中: Authorization=token
       config.headers['Authorization'] = token
    }
  }

  return config
})

/* //请求拦截
axios.interceptors.request.use((config)=>{
  const { method , data } = config
  if(method.toUpperCase()==='POST' && data instanceof Object){
    config.data = qs.stringify(data)
    
  }

  if(config.headers.needToken){
    const token = store.state.token
    if(!token){
      const error = new Error('没有token')
      // error.code = 401
      throw error
    }else{
      config.headers['Authorization'] = token
    }
  }
  return config
  
}) */


// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 2. 让成功的结果不是response, 而是response.data : 响应拦截器的成功回调
  return response.data
  // 3. 统一处理请求错误: 响应拦截器的失败回调
}, error => {
  const {response, status, message} = error
  // 发请求前没有需要的token就失败
  if (!response) {
    if (status === 401) {
      if (router.currentRoute.path!=='/login') {
        console.log('-------')
        // 提示
        Toast(message)
        // 跳转到登陆页面
        router.replace('/login')
      }
    }
  } else {
    const status = response.status
    // 发了请求, token过期了
    if (status === 401) {
      if (router.currentRoute.path !== '/login') { 
        Toast(response.data.message)
        // 退出登陆
        
        store.dispatch('logout')
        // 跳转到登陆页面
        router.replace('/login')
      }
    } else if (status === 404) { // 请求的资源不存在
      Toast('请求的资源不存在')
    } else {
      Toast('请求错误: ' + message)
    }
  }




  // 中断promise链
  return new Promise(() => {})
})
/* //响应拦截
axios.interceptors.response.use(
  (response)=>{
    return response.data
  },(error)=>{
    const {response,code,message} = error
    if(!response){
      if(code===401){
        if(router.currentRoute.path!=='/login'){
          Toast(message)
          router.replace('/login')
        }
        
      }
    }else{
     
      if(code===401){
        if(router.currentRoute.path!=='/login'){
          Toast(response.data.massage)
          store.dispatch('logout')
          router.replace('/login')
        }
        store.dispatch('logout')
        router.replace('/login')
      }else if(code===404){
        Toast('请求资源不存在')
      }else{
        Toast('请求错误'+message)
      }
    }

    
    return new Promise(()=>{})
  }) */

  //暴露axios
  export default axios


