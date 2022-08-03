// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getTokenTime } from './auth'
const service = axios.create({
  baseURL: 'http://likede2-admin.itheima.net/likede/',
  timeout: 5000,
}) // 创建一个axios的实例
const toeknTimeOut = function () {
  const oldTimeOut = getTokenTime()
  const newTimeOut = Date.now()
  const tiemr = 2 * 60 * 60 * 1000
  return newTimeOut - oldTimeOut > tiemr
}

service.interceptors.request.use(
  (res) => {
    if (store.state.user.token) {
      // 如果token存在 注入token
      // 判断token是否过期
      if (toeknTimeOut()) {
        store.dispatch('user/logout') // 登出操作
        // 跳转到登录页
        router.push('/login')
        store.dispatch('user/getUserInfo')
        return Promise.reject(new Error('token超时了'))
      } else {
        config.headers.Authorization = store.state.user.token
      }
    }

    return res // 必须返回配置
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout') // 登出action 删除token
      router.push('/login')
    } else {
      Message.error(error.message) // 提示错误信息
    }
    return Promise.reject(error)
  },
) // 请求拦截器
service.interceptors.response.use() // 响应拦截器
export default service // 导出axios实例
