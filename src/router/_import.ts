import { RouteComponent } from "vue-router"

type RouterMap = {
    [name:string]: RouteComponent
}

const map:RouterMap = {
    "order": () => import("@/views/order/index.vue"),
    "orderEdit": () => import("@/views/order/edit.vue")
}

export default (file:string) => {
    return map[file]
}