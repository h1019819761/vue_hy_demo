import axios from 'axios'
import qs from 'qs'


//请求拦截
axios.interceptors.request.use((config)=>{
  const { method , data } = config
  if(method.toUpperCase()==='POST' && data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
  
})
//响应拦截
axios.interceptors.response.use(
  (response)=>{
    return response.data
  },(error)=>{
    alert('失败了')
    return new Promise(()=>{})
  })

  //暴露axios
  export default axios


