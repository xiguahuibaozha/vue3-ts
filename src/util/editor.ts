import settings from "@/settings"
import {
    createEditor,
    createToolbar,
    IEditorConfig,
} from "@wangeditor/editor";
import { ElMessage } from "element-plus";

const actionUrl = settings.baseUrl + `/other/fdfs`;

const imgUrl = settings.imgUrl;

export const editorConfig: Partial<IEditorConfig> = {
    placeholder: "请输入内容",
    MENU_CONF: {
        uploadImage: {
            server: actionUrl,
            fieldName: "files",
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 20 * 1024 * 1024, // 20M
            // 自定义插入图片
            customInsert(response: any, insertFn: InsertFnType) {
                // res 即服务端的返回结果
                // 从 res 中找到 url alt href ，然后插图图片
                if (response.code == 200 && response.data.length > 0) {
                    insertFn(
                        `${imgUrl}/${response.data[0].url}`,
                        response.data[0].old,
                        ""
                    );
                } else {
                    ElMessage({
                        message: "图片上传出错了",
                        type: "error",
                    });
                }
            },
        },
    },
};

// 初始化富文本
export const initEditor = (createEditorSelector:string, createToolbarSelector:string, content:any) => {
    if(!(content instanceof Array)){
        content = []
    }
    // 创建编辑器
    const editor = createEditor({
        selector: createEditorSelector,
        config: editorConfig,
        content, // 默认内容，下文有解释
        mode: "default", // 或者 'simple'
    });

    // 创建工具栏
    createToolbar({
        editor,
        selector: createToolbarSelector,
        mode: "default", // 或者 'simple'
    });
};