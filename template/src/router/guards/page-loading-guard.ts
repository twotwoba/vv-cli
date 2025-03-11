import type { Router } from 'vue-router'

export const createPageLoadingGuard = (router: Router) => {
    router.beforeEach(() => {
        setTimeout(() => {
            window.$loadingBar?.start()
        }, 100)
    })

    router.afterEach(() => {
        setTimeout(() => {
            window.$loadingBar?.finish()
        }, 200)
    })

    router.onError(() => {
        setTimeout(() => {
            window.$loadingBar?.finish()
        }, 100)
    })
}
