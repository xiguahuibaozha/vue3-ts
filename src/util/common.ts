import { App,Component } from "vue"
import * as icon from '@element-plus/icons'

type Icon = {
    [name: string]: Component
}

export default {
    install(app:App):void {
        // 将element-ui里面的icon全局注册一遍
        Object.keys(icon).forEach((item:string) => {
            app.component(item, (icon as Icon)[item])
        })
    }
}