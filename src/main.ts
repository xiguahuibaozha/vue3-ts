import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import common from './util/common'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { initConstant } from "./util/constant"

// 初始化所有的字典表数据
initConstant()

const app = createApp(App);

app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small',locale: zhCn })
app.use(common)

app.mount('#app')