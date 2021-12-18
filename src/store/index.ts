import { createStore } from 'vuex'
import layout from "./modules/layout"
import settings from "./modules/settings"
import app from "./modules/app"

export default createStore<{[name:string]:any}>({
  mutations: {
    CHANGE_STATE(state,[key,value]:[string,any]){
      const keys = key.split(".")
      keys.slice(0,keys.length-1).forEach(item => {
        state = state[item]
      })
      state[keys[keys.length-1]] = value
    }
  },
  actions: {
    changeState({commit},data:[string,any]){
      commit("CHANGE_STATE",data)
    }
  },
  modules: {
    layout,
    settings,
    app
  }
})
