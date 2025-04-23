import { Router } from 'vue-router'

const WHITE_LIST = ['/404']
export function createPermissionGuard(router: Router) {
    router.beforeEach(async (to) => {
        /** not login */
        // if (Not Login) {
        //     if (WHITE_LIST.includes(to.path)) return true
        //     return { path: '/login', query: { ...to.query, redirect: to.path } }
        // }

        /** logged in */
        if (to.path === '/login') return { path: '/' }
        if (WHITE_LIST.includes(to.path)) return true

        const routes = router.getRoutes()
        if (routes.find((route) => route.name === to.name)) return true

        return { name: '404' }
    })
}
