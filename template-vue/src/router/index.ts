import type { App } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { basicRoutes } from '@/router/basic-routes'
import { setupRouterGuards } from './guards'

const basename = import.meta.env.VITE_ROUTE_BASENAME
export const router = createRouter({
    history:
        import.meta.env.VITE_ROUTE_MODE === 'hash'
            ? createWebHashHistory(basename)
            : createWebHistory(basename),
    routes: basicRoutes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app: App) {
    app.use(router)
    setupRouterGuards(router)
    // do something...
    // createMenus(basicRoutes as any)
    await router.isReady()
}
