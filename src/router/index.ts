import { createRouter, createWebHistory } from 'vue-router'
// import _import from './_import'
import { routes } from './routers'
import store from '@/store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (router.hasRoute(to.name??'')){
    if (to.name === 'login'){ // 判断是否跳转到登录页面,储存上个页面
      store.dispatch('changeState',['app.redirect',from.path])
      next()
    }else if(!store.state.app.token){ // 没有token = 没有登录 = 跳转到登录
      next('/login')
    }else{
      next()
    }
  }else {
    next('/404')
  }
})

export default router