import { createApp } from 'vue'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import App from './App.vue'
import 'virtual:svg-icons-register'

// 样式引入顺序很重要：reset -> varlet -> unocss -> custom
import '@unocss/reset/tailwind.css'
import '@varlet/ui/es/style'
import 'uno.css'
import '@/assets/css/style.css'

import { setupStore } from './store'
import { setupRouter } from './router'

// 创建 QueryClient 实例
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // 失败重试次数
            retry: 2,
            // 重试延迟
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // 窗口聚焦时不自动重新获取
            refetchOnWindowFocus: false,
            // 网络重连时重新获取
            refetchOnReconnect: true,
            // 数据过期时间（5分钟）
            staleTime: 5 * 60 * 1000,
            // 缓存时间（10分钟）
            gcTime: 10 * 60 * 1000
        },
        mutations: {
            // mutation 失败不重试
            retry: false
        }
    }
})

async function bootstrap() {
    const app = createApp(App)
    setupStore(app)
    app.use(VueQueryPlugin, { queryClient })
    await setupRouter(app)
    app.mount('#app')
}

bootstrap()
