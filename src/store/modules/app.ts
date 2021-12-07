import { StoreOptions } from 'vuex'
import { getMenu } from "@/api/app";
import { setLocalStorage,getLocalStorage } from "@/util/storage";

export default <StoreOptions<{[name:string]:any}>>{
    namespaced: true,
    state: {
        menuList: getLocalStorage('menuList')
    },
    mutations: {
        GET_MENULIST(state){
            // 获取路由列表
            getMenu().then(({data}) => {
                state.menuList = data
                setLocalStorage("menuList",data)
            })
        }
    },
    actions: {
        getMenuList({ commit }){
            commit("GET_MENULIST")
        }
    }
}