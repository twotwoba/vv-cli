import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import UiComponentLibrary from 'ui-component-library'

const app = createApp(App)
app.use(UiComponentLibrary)
app.mount('#app')
