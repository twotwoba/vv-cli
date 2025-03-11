import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './assets/css/style.css'

import { setupStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
    const app = createApp(App)
    setupStore(app)
    await setupRouter(app)
    // solve the problem of native-UI and reset style conflict
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
    app.mount('#app')
}

bootstrap()
