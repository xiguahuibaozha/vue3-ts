import { StoreOptions } from 'vuex'
import { defaultRouter } from '@/router/routers'

export default <StoreOptions<{[name:string]:any}>>{
    namespaced: true,
    state: {
        sideWidth: "230px",
        showAsideMenu: false,
        // header 面包屑
        breadcrumb: [defaultRouter?.meta?.title],
        iconSize: 18,
        timeout: '0.5s'
    },
    mutations: {
        ISSHOW_SIDEWIDTH(state,type){
            state.showAsideMenu = !type
            
            if(!type) state.sideWidth = '65px'
            else state.sideWidth = '230px'
        }
    },
    actions: {
        // type：showAsideMenu的值，true隐藏，false显示
        changeSideWidth({commit},type){
            commit("ISSHOW_SIDEWIDTH",type)
        }
    }
}