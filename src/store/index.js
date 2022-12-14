import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createVuexPersisted from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  plugins: [
    createPersistedState({
      reducer(val) {
        return {
          // 只储存state中的token
          user: {
            token: val.user.token,
          },
        }
      },
    }),
  ],
})

export default store
