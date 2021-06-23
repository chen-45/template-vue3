import { App } from '@vue/runtime-core'

const components = []
const install = (app:App):void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export default {
  install,
}
