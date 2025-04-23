import { lazy, Suspense } from 'react'

/**
 * dynamically load route page
 */
const loadPage = (
    importFn: () => Promise<{
        default: React.ComponentType<any>
    }>
) => {
    const LazyComponent = lazy(importFn)

    return (
        <Suspense fallback={null}>
            <LazyComponent />
        </Suspense>
    )
}

export default loadPage
