import { App } from 'vue'
import Input from './input.vue'

Input.install = (app: App) => {
    app.component('UiInput', Input)
}

export { Input }
export default Input
export type { InputProps } from './input.vue'
