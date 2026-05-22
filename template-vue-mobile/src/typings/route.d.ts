import type { RouteRecordRaw, RouteMeta as VueRouteMeta } from 'vue-router'

declare namespace AppRoute {
    type MenuType = 'dir' | 'page'

    /** 单个路由所携带的meta标识 */
    interface RouteMeta extends VueRouteMeta {
        /* 页面标题 */
        title: string
        /* 图标，一般配合菜单使用 */
        icon?: string
        /* 是否开启页面缓存 */
        keepAlive?: boolean
        /** 当前路由不在左侧菜单显示，但需要高亮某个菜单的情况 */
        activeMenu?: string
        /* 是否为 menu */
        isMenu?: boolean
    }

    /** 静态路由类型（对应 basic-routes.ts 中的结构） */
    type StaticRoute = RouteRecordRaw & {
        meta?: RouteMeta
        children?: StaticRoute[]
    }

    /** 后端返回的动态路由原始数据 */
    interface RemoteRouteRaw {
        /** 路由名称 */
        name: string
        /** 路由路径 */
        path: string
        /** 路由重定向 */
        redirect?: string
        /** 页面组件路径 */
        componentPath?: string | null
        /** 路由id */
        id: number
        /** 父级路由id，顶级页面为null */
        pid: number | null
        /** 路由meta信息 */
        meta?: RouteMeta
    }

    /** 转换后可挂载的动态路由 */
    interface DynamicRoute extends Omit<RouteRecordRaw, 'meta'> {
        meta?: RouteMeta
        children?: DynamicRoute[]
    }
}
