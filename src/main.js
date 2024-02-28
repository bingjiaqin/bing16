import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import vhCheck from "vh-check";
vhCheck();

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import './styles/font.scss';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

const app = createApp(App)

import router from './router/index'
app.use(router)
import './styles/element/index.scss';

app.mount('#app')
app.use(VueMarkdownEditor);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}