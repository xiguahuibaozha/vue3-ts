import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import common from './util/common'

const app = createApp(App);

// 挂载全局变量
// app.config.globalProperties

app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(common)

app.mount('#app')
    