import {
  
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
  RESET_USER,

} from '../mutation-type'
import {
  
  reqAutoLogin,
} from '../../api/index'
import router from '../../router'


const state = {
  user:{},//用户登录
  token:localStorage.getItem('token_key'), //当前用户token
}
const mutations = {
  [RECEIVE_USER] (state,{user}){
    console.log(user,'77777777777777777777777')
    state.user = user

  },
  [RECEIVE_TOKEN] (state,{token}){
    
    console.log(token,'++++++++++++++')
    state.token = token
   
  },


  [RESET_USER] (state) {
    state.user = {}
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  },
}
const actions = {
  //保存user数据
  saveUser({commit},user){

    const token = user.token
    console.log(token,user)
    localStorage.setItem('token_key',token)
    commit(RECEIVE_TOKEN,{token})
     
    delete user.token
    commit(RECEIVE_USER,user)
  },
  //退出登录
  logout({commit}){
    commit(RESET_USER)
    commit(RESET_TOKEN)
    localStorage.removeItem('token_key')
  },

  //自动登录
  async autoLogin({commit,state}){
    if(state.token){
      const result = await reqAutoLogin()
      
      if(result.code===0){
        const user = result.data
        
       
        commit(RECEIVE_USER,{user})
      }
    }
  },
}
// const getters = {}


export default {
  state,
  mutations,
  actions,
  // getters
}