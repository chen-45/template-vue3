import router from './router'
import store from './store'
import { getToken } from './utils/storage'
import NProgress from 'nprogress' // progress bar
import { ElMessage } from 'element-plus'

const whiteList = ['/login']
router.beforeEach(async (to, from) => {
  // start progress bar
  NProgress.start()
  // to and from are both route objects. must call `next`.
  if (getToken()) {
    if (to.path === '/login') {
      return '/'
    } else {
      const hasRoles = store.state.user.roles && store.state.user.roles.length > 0
      if (hasRoles) {
        return true
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const routes = await store.dispatch('permission/generateRoutes', roles)
          for (const route of routes) {
            router.addRoute(route)
          }
          return { ...to, replace: true }
        } catch (error) {
          console.log('error', error)
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          NProgress.done()
          return `/login?redirect=${to.fullPath}`
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      return true
    } else {
      NProgress.done()
      return `/login?redirect=${to.fullPath}`
    }
  }
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
