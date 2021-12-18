import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import common from './util/common'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App);

app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small',locale: zhCn })
app.use(common)

app.mount('#app')
    