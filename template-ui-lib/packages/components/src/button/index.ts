import { App } from 'vue'
import Button from './button.vue'

Button.install = (app: App) => {
  app.component('UiButton', Button)
}

export { Button }
export default Button
export type { ButtonProps } from './button.vue'
