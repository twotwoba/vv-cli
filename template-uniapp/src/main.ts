import { createSSRApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import uviewPlus from 'uview-plus'
import 'uno.css'

export function createApp() {
    const app = createSSRApp(App)
    app.use(createPinia())
    app.use(uviewPlus)

    return {
        app
    }
}
