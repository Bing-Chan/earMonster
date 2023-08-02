import { createApp } from 'vue'
import App from './App.vue'

import EarMonster from '~/index'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)
app.use(EarMonster)
app.use(ElementPlus)
app.mount('#app')
