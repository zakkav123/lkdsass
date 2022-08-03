import { login, userInfo } from '@/api/user'
import router from '@/router'
import { Message } from 'element-ui'
import { setTokenTime, setUserId, getUserId } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfoList: {},
    userId: '',
  },
  mutations: {
    getToken(state, payload) {
      state.token = payload
    },
    getUserInfos(state, payload) {
      state.userInfoList = payload
    },
  },
  actions: {
    // 获取token
    async getToken({ commit }, payload) {
      const res = await login(payload)
      //
      setUserId(res.data.userId)
      if (res.data.success) {
        commit('getToken', res.data.token)
        router.push('/')
        Message.success(res.data.msg)

        setTokenTime()
      } else {
        Message.error(res.data.msg)
      }
      console.log(res)
    },
    async getUserInfo({ commit }) {
      const userId = getUserId()
      const res = await userInfo(userId)
      commit('getUserInfos', res)
    },
    logout({ commit }) {
      commit('getToken', '')
      router.push('/')
    },
  },
}
