import { login } from '@/api/user'
import router from '@/router'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    token: '',
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload)
      if (res.data.success) {
        commit('getToken', res.data.token)
        router.push('/')
        Message.success(res.data.msg)
      } else {
        Message.error(res.data.msg)
      }
      console.log(res)
    },
  },
}
