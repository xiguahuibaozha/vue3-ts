import { RouteComponent } from "vue-router"

type RouterMap = {
    [name:string]: RouteComponent
}

const map:RouterMap = {
    "order": () => import("@/views/order/index.vue"),
    "goods": () => import("@/views/goods/index.vue"),
    "goodsEdit": () => import("@/views/goods/edit.vue")
}

export default (file:string) => {
    return map[file]
}