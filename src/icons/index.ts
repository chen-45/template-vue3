
import {
  App,
} from '@vue/runtime-core'
import SvgIcon from '@/components/svgIcon/index.vue'

const components = [SvgIcon]
const install = (app: App): void => {
  components.forEach(component => {
    app.component(component.name, component)
  })
  const req = require.context('./svg', false, /\.svg$/)
  const requireAll = requireContext => requireContext.keys().map(requireContext)
  requireAll(req)
}

export default {
  install,
}
