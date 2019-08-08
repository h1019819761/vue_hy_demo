
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-type'
export default {
  [RECEIVE_ADDRESS] (state,address){
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,address){
    state.categorys = address
  },
  [RECEIVE_SHOPS] (state,address){
    state.shops = address
  }
}