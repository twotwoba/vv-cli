import type { Router } from 'vue-router'
import { LoadingBar } from '@varlet/ui'

export const createPageLoadingGuard = (router: Router) => {
    router.beforeEach(() => {
        LoadingBar.start()
    })

    router.afterEach(() => {
        LoadingBar.finish()
    })

    router.onError(() => {
        LoadingBar.error()
    })
}
