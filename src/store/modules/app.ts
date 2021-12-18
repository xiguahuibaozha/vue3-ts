import { StoreOptions } from 'vuex'
import { login, loginOut } from "@/api/app"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/util/storage"
import router from '@/router'
import { defaultRouter } from '@/router/routers'

export default <StoreOptions<{[name:string]:any}>>{
    namespaced: true,
    state: {
        token: getLocalStorage('token'),
        // 返回登陆页面时缓存上一个页面的path
        redirect: defaultRouter?.path,
        userInfo: getLocalStorage('userInfo')??{}
    },
    mutations: {
        // 登录
        LOGIN(state, params){
            // 获取路由列表
            login(params).then(({data}) => {
                setLocalStorage('token',data)
                setLocalStorage('userInfo',{username:params.username})
                state.token = data
                state.userInfo = {username:params.username}
                router.push(state.redirect)
            })
        },
        // 退出登录
        LOGIN_OUT(state){
            loginOut().then(() => {
                removeLocalStorage('token')
                removeLocalStorage('userInfo')
                state.token = null
                state.userInfo = {}
                router.push('/login')
            })
        }
    },
    actions: {
        login({ commit },params){
            commit("LOGIN", params)
        },
        loginOut({ commit }){
            commit("LOGIN_OUT")
        }
    }
}