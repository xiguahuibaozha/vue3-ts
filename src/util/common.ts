import { App } from "vue"
import * as icon from '@element-plus/icons'
import svgs from "@/icons/index"

export default {
    install(app:App) {
        // 将element-ui里面的icon全局注册一遍
        Object.keys(icon).forEach((item:string) => {
            app.component(item, (icon as Icon)[item])
        })

        // 自定义icon全部注册一遍
        Object.keys(svgs).forEach(item => {
            app.component(item, svgs[item])
        })
    }
}