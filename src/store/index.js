import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const common = {
  state: {
      isCollapse: false
  },
  mutations: {
    toggleSliderBar(state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
export default new Vuex.Store({
  modules: {
    common
  }
})