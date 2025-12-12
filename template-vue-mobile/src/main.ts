import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

// 样式引入顺序很重要：reset -> varlet -> unocss -> custom
import '@unocss/reset/tailwind.css'
import '@varlet/ui/es/style'
import 'uno.css'
import '@/assets/css/style.css'

import { setupStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
    const app = createApp(App)
    setupStore(app)
    await setupRouter(app)
    app.mount('#app')
}

bootstrap()
