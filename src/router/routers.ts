import Layout from '@/layout/Layout.vue'
import { RouteRecordRaw } from 'vue-router'
import _import from './_import'

// 路由白名单
export const whiteRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    }
]

// 其他路由
export const otherRouters: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        name: 'layout',
        redirect: '/dashboard',
        children: [{
            path: '/dashboard',
            name: 'dashboard',
            component: () => import("@/views/dashboard/index.vue"),
            meta: {
                // 是否隐藏菜单
                // hidden: true,
                title: '控制台',
                icon: 'svg-dashboard'
            }
        }]
    },
    {
        path: '/goodsModule',
        component: Layout,
        name: 'goodsModule',
        redirect: '/goods',
        meta: {
            title: '商品模块',
            icon: 'ShoppingBag'
        },
        children: [{
            path: '/goods',
            name: 'goods',
            component: _import("goods"),
            meta: {
                title: '商品管理',
                icon: 'ShoppingBag'
            }
        },{
            path: '/goodsEdit',
            name: 'goodsEdit',
            component: _import("goodsEdit"),
            meta: {
                hidden: true,
                title: '商品编辑',
                icon: 'ShoppingBag'
            }
        }]
    },
    {
        path: '/orderModule',
        component: Layout,
        name: 'orderModule',
        redirect: '/order',
        children: [{
            path: '/order',
            name: 'order',
            component: _import("order"),
            meta: {
                title: '订单管理',
                icon: 'Tickets'
            }
        }]
    }
]

// 获取默认的router
const getDefaultRouter = (routers: Array<RouteRecordRaw> = otherRouters) => {
    const item = routers[0]
    if (item.children && item.children.length > 0) {
        getDefaultRouter(item.children)
    } else {
        return item
    }
}

// 首次进入页面显示的route name
export const defaultRouter: RouteRecordRaw | undefined = getDefaultRouter()

export const routes = [...whiteRoutes, ...otherRouters]