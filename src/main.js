import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import './styles/element/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}