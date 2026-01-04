import type { App } from 'vue'
import { Button } from './button'
import { Input } from './input'

const components = [Button, Input]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name || '', component)
  })
}

export { Button, Input }

export default {
  install
}

