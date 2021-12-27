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
    }, {
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
        }, {
            path: '/levelManage',
            name: 'levelManage',
            component: _import("levelManage"),
            meta: {
                title: '等级管理'
            }
        }]
    }, {
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
        }, {
            path: '/dynamicDetail',
            name: 'dynamicDetail',
            component: _import("dynamicDetail"),
            meta: {
                title: '动态详情',
                hidden: true
            }
        }]
    }, {
        path: '/storeModule',
        component: Layout,
        name: 'storeModule',
        redirect: '/storeModule',
        meta: {
            title: '门店仓库模块'
        },
        children: [{
            path: '/storeManage',
            name: 'storeManage',
            component: _import("storeManage"),
            meta: {
                title: '门店管理'
            }
        }, {
            path: '/storeEdit',
            name: 'storeEdit',
            component: _import("storeEdit"),
            meta: {
                title: '门店编辑',
                hidden: true
            }
        }, {
            path: '/warehouseManage',
            name: 'warehouseManage',
            component: _import("warehouseManage"),
            meta: {
                title: '仓库管理'
            }
        }, {
            path: '/warehouseEdit',
            name: 'warehouseEdit',
            component: _import("warehouseEdit"),
            meta: {
                title: '仓库编辑',
                hidden: true
            }
        }]
    }, {
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
        }, {
            path: '/goodsEdit',
            name: 'goodsEdit',
            component: _import("goodsEdit"),
            meta: {
                title: '商品编辑',
                hidden: true
            }
        }, {
            path: '/typeManage',
            name: 'typeManage',
            component: _import("typeManage"),
            meta: {
                title: '类型管理'
            }
        }, {
            path: '/typeEdit',
            name: 'typeEdit',
            component: _import("typeEdit"),
            meta: {
                title: '编辑类型',
                hidden: true
            }
        }]
    }, {
        path: '/activityModule',
        component: Layout,
        name: 'activityModule',
        redirect: '/activityManage',
        meta: {
            title: '活动模块'
        },
        children: [{
            path: '/activityManage',
            name: 'activityManage',
            component: _import("activityManage"),
            meta: {
                title: '活动管理'
            }
        }, {
            path: '/activityEdit',
            name: 'activityEdit',
            component: _import("activityEdit"),
            meta: {
                title: '活动编辑',
                hidden: true
            }
        }]
    }, {
        path: '/orderModule',
        component: Layout,
        name: 'orderModule',
        redirect: '/orderManage',
        meta: {
            title: '订单模块'
        },
        children: [{
            path: '/orderManage',
            name: 'orderManage',
            component: _import("orderManage"),
            meta: {
                title: '订单管理'
            }
        }, {
            path: '/orderDetail',
            name: 'orderDetail',
            component: _import("orderDetail"),
            meta: {
                title: '订单详情'
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