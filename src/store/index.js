import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import shopping from './shopping'
import user from './user'


export default new Vuex.Store({
  modules: {
    shopping:shopping,
    user:user
  }
})
