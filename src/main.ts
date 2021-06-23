import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import CustomComponent from './components/index'
import Icon from './icons'
import './permission' // permission control
import { mockInstall } from './mock' // mock
import './style/index.css' // css

const app = createApp(App)
app
  .use(ElementPlus)
  .use(CustomComponent)
  .use(Icon)
  .use(mockInstall)
  .use(store)
  .use(router)
  .mount('#app')
