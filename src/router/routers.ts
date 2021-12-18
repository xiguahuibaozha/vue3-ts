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
    },{
        path: '/userModule',
        component: Layout,
        name: 'userModule',
        redirect: '/userManage',
        meta: {
            title: '用户模块'
        },
        children: [{
            path: '/userManage',
            name: 'userManage',
            component: _import("userManage"),
            meta: {
                title: '用户管理'
            }
        }]
    },{
        path: '/dynamicModule',
        component: Layout,
        name: 'dynamicModule',
        redirect: '/dynamicManage',
        meta: {
            title: '动态模块'
        },
        children: [{
            path: '/dynamicManage',
            name: 'dynamicManage',
            component: _import("dynamicManage"),
            meta: {
                title: '动态管理'
            }
        }]
    },{
        path: '/storeModule',
        component: Layout,
        name: 'storeModule',
        redirect: '/storeModule',
        meta: {
            title: '门店模块'
        },
        children: [{
            path: '/storeManage',
            name: 'storeManage',
            component: _import("storeManage"),
            meta: {
                title: '门店管理'
            }
        },{
            path: '/storeEdit',
            name: 'storeEdit',
            component: _import("storeEdit"),
            meta: {
                title: '门店编辑',
                hidden: true
            }
        }]
    },{
        path: '/goodsModule',
        component: Layout,
        name: 'goodsModule',
        redirect: '/goodsManage',
        meta: {
            title: '商品模块'
        },
        children: [{
            path: '/goodsManage',
            name: 'goodsManage',
            component: _import("goodsManage"),
            meta: {
                title: '商品管理'
            }
        },{
            path: '/goodsEdit',
            name: 'goodsEdit',
            component: _import("goodsEdit"),
            meta: {
                title: '商品编辑',
                hidden: true
            }
        },{
            path: '/typeManage',
            name: 'typeManage',
            component: _import("typeManage"),
            meta: {
                title: '类型管理'
            }
        },{
            path: '/typeEdit',
            name: 'typeEdit',
            component: _import("typeEdit"),
            meta: {
                title: '编辑类型',
                hidden: true
            }
        },]
    }
]

// 获取默认的router
const getDefaultRouter = (routers:Array<RouteRecordRaw> = otherRouters) => {
    const item = routers[0]
    if(item.children && item.children.length > 0){
        getDefaultRouter(item.children)
    }else {
        return item
    }
}

// 首次进入页面显示的route name
export const defaultRouter:RouteRecordRaw|undefined = getDefaultRouter()

export const routes = [...whiteRoutes,...otherRouters]