import { RouteComponent } from "vue-router"

type RouterMap = {
    [name:string]: RouteComponent
}

const map:RouterMap = {
    "userManage": () => import("@/views/userModule/userManage/index.vue"),
    "dynamicManage": () => import("@/views/dynamicModule/dynamicManage/index.vue"),
    "storeManage": () => import("@/views/storeModule/storeManage/index.vue"),
    "storeEdit": () => import("@/views/storeModule/storeEdit/index.vue"),
    "goodsManage": () => import("@/views/goodsModule/goodsManage/index.vue"),
    "goodsEdit": () => import("@/views/goodsModule/goodsEdit/index.vue"),
    "typeManage": () => import("@/views/goodsModule/typeManage/index.vue"),
    "typeEdit": () => import("@/views/goodsModule/typeEdit/index.vue"),
}

export default (file:string) => {
    return map[file]
}