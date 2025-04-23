import { Router } from 'vue-router'
import { createPageLoadingGuard } from './page-loading-guard'
import { createPageTitleGuard } from './page-title-guard'
import { createPermissionGuard } from './permission-guard'

export function setupRouterGuards(router: Router) {
    createPageLoadingGuard(router)
    createPageTitleGuard(router)
    createPermissionGuard(router)
}
