import { RouteComponent } from "vue-router"

type RouterMap = {
    [name:string]: RouteComponent
}

const map:RouterMap = {
    "userManage": () => import("@/views/userModule/userManage/index.vue"),
    "dynamicManage": () => import("@/views/dynamicModule/dynamicManage/index.vue"),
    "dynamicDetail":  () => import("@/views/dynamicModule/dynamicManage/detail.vue"),
    "storeManage": () => import("@/views/storeModule/storeManage/index.vue"),
    "storeEdit": () => import("@/views/storeModule/storeManage/edit.vue"),
    "goodsManage": () => import("@/views/goodsModule/goodsManage/index.vue"),
    "goodsEdit": () => import("@/views/goodsModule/goodsManage/edit.vue"),
    "typeManage": () => import("@/views/goodsModule/typeManage/index.vue"),
    "typeEdit": () => import("@/views/goodsModule/typeManage/edit.vue"),
    "warehouseManage": () => import("@/views/storeModule/warehouseManage/index.vue"),
    "warehouseEdit": () => import("@/views/storeModule/warehouseManage/edit.vue"),
    "levelManage": () => import("@/views/userModule/levelManage/index.vue"),
    "activityManage": () => import("@/views/activityModule/activityManage/index.vue"),
    "activityEdit": () => import("@/views/activityModule/activityManage/edit.vue"),
    "orderManage": () => import("@/views/orderModule/orderManage/index.vue"),
    "orderDetail": () => import("@/views/orderModule/orderManage/detail.vue"),
}

export default (file:string) => {
    return map[file]
}