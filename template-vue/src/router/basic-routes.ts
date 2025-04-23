/**
 * 基础路由
 */
export const basicRoutes = [
    {
        name: 'root',
        path: '/',
        redirect: import.meta.env.VITE_HOME_PATH,
        // component: Layout, // someone layout component
        children: [
            {
                name: 'emailAccount',
                path: '/hello-world',
                component: () => import('@/views/hello-world/index.vue'),
                meta: {
                    title: 'Hello World',
                    isMenu: true
                }
            }
        ]
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
            title: '页面飞走了'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/error-page/404.vue'),
        name: '404',
        meta: {
            title: '页面飞走了'
        }
    }
]
