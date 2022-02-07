import E from 'wangeditor'
import config from "@/settings"
import { ElMessage } from "element-plus";


const editorObj:any = {}
export const initEditor = (selector: string, callback?:(html:string) => void) => {
    // 如果存在则销毁
    if(editorObj[selector]){
        editorObj[selector].destroy()
        editorObj[selector] = null
    }

    editorObj[selector] = new E(selector)

    const editor = editorObj[selector]

    // 设置z-index
    editor.config.zIndex = 1

    // 图片上传
    editor.config.uploadImgServer = config.imgUpUrl + `/other/fdfs`;
    editor.config.uploadFileName = 'files'
    editor.config.uploadImgMaxSize = 2 * 1024 * 1024, // 2M
    editor.config.height = 500
    editor.config.uploadImgHooks = {
        error() {
            ElMessage({
                message: "图片上传出错了",
                type: "error",
            });
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        customInsert (insertImgFn:any, {data}:any) {
            // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
            insertImgFn(config.imgUrl +'/'+ data[0].url)
        }
    }
    // 监听onchange方法
    editor.config.onchange = (newHtml:any) => {
        callback?.(newHtml)
    };

    editor.create()

    return editor
}

// 将图片url 转为$base_url
export const replaceData = (html:string) => {
    return html.replaceAll(String(config.imgUrl),"$base_url")
}

// 将$base_url转为 url
export const replaceDataBack = (html:string) => {
    return html.replaceAll("$base_url",String(config.imgUrl))
}