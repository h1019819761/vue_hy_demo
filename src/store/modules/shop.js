import Vue from 'vue'
import {
 
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  REDUCE_FOOD_COUNT,
  ADD_FOOD_COUNT,
  CLEAR_CART,
} from '../mutation-type'
import {

  reqGoods,
  reqInfo,
  reqRatings
  
} from '../../api/index'
const state = {
  goods:[],
  ratings:[],
  info:{},
  cartFoods:[],
}
const mutations = {
  [RECEIVE_GOODS](state,{goods}){
    state.goods = goods
  },
   [RECEIVE_RATINGS](state,{ratings}){
     console.log(ratings)
    state.ratings = ratings
  },
   [RECEIVE_INFO](state,{info}){
    console.log(info)
    state.info = info
  },


  [ADD_FOOD_COUNT](state,{food}){
    if(!food.count){
      // food.count = 1//新增的属性没有数据绑定
      Vue.set(food,'count',1)
      state.cartFoods.push(food)
    }else{
      food.count++

    }
  },
  [REDUCE_FOOD_COUNT](state,{food}){
    if(food.count>0){
      food.count--
      if(food.count===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART](state){
    state.cartFoods.forEach(food => {
      food.count = 0
    });
    state.cartFoods = []
  }
}
const actions = {
   // 异步获取商家信息
   async getInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})

      typeof cb === 'function' && cb()
    }
  },

  // 异步获取商家评价列表
  async getRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      typeof cb === 'function' && cb()
    }
  },

  // 异步获取商家商品列表
  async getGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      
      typeof cb === 'function' && cb()
    }
  },
  updateFoodCount({commit},{isAdd,food}){
    if(isAdd){
      commit(ADD_FOOD_COUNT,{ food })
    }else{
      commit(REDUCE_FOOD_COUNT,{ food })
    }
  }
}
const getters = {
  totalCount(state){
    return state.cartFoods.reduce((pre,food)=>pre+food.count,0)
  },
  totalPrice(state){
    return state.cartFoods.reduce((pre,food)=>pre+food.count*food.price,0)
  }
  // cartFoods(state){
  //   const {goods} = state 
  //   const arr = []
  //   goods.forEach(food => {
  //     if(food.count>0){
  //       arr.push(food)
  //     }
  //   })
  // }
}


export default {
  state,
  mutations,
  actions,
  getters
}