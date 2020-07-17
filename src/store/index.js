import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

//安装vuex
Vue.use(Vuex)

//创建store对象
const state = {
  cartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//将store对象导出，在main.js中挂载
export default store

