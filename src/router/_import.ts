import { RouteComponent } from "vue-router"

type RouterMap = {
    [name:string]: RouteComponent
}

const map:RouterMap = {
    "menu01": () => import("@/views/pages/menu01/index.vue"),
    "menu02": () => import("@/views/pages/menu02/index.vue"),
    "menu03": () => import("@/views/pages/menu03/index.vue")
}

export default (file:string) => {
    return map[file]
}