import router from '@/router'
import store from '@/store'

// 配置全局路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  const isLoginClous = ['/login', '/404']
  if (token) {
    to.path === '/login' ? next('/') : next()
  } else {
    isLoginClous.includes(to.path) ? next() : next('/login')
  }
})
