import { AxiosResponse } from "axios"
import { ElMessage } from 'element-plus'

// 将需要提示的接口名储存起来，比如说修改，删除提示修改成功删除成功，操作提示操作成功
// 如果提示为 "response" 则按照返回msg提示
export const MessagePath: RequestSuccessMessage = {
    default: {
        "/manage/store": {},
        "/manage/goods": {},
        "/manage/type": {}
    }, // 这里面的接口请求成功会根据请求类型 PUT=>编辑成功 DELETE=>删除成功 POST=>新增成功
    other: {
        "/manage/user": {
            delete: "删除成功",
            put: "操作成功"
        }
    } // 这里面的接口请求成功会默认提示 操作成功
}

export type RequestSuccessMessage = {
    [name: string]: {
        [name: string]: {
            [name: string]: string
        }
    }
}

const message: { [name: string]: string } = {
    put: "保存成功",
    delete: "删除成功",
    post: "新增成功",
    other: "操作成功"
}

// 如果都配置了 优先提示other
export const getMessage = (path: string, method: string) => {
    method = method.toLowerCase()
    if (MessagePath.other[path]) {
        return MessagePath.other[path][method] ?? false
    } else if (MessagePath.default[path]) {
        return MessagePath.default[path][method] ?? message[method]
    } else {
        return false
    }
}

// 根据response 显示提示
export const ResponseMessage = (response: AxiosResponse) => {
    if (response.config.url && response.config.method) {
        const resultMessage = getMessage(response.config.url, response.config.method)
        if (resultMessage) {
            ElMessage.closeAll()
            ElMessage({
                message: resultMessage == "response" ? response.data.msg : resultMessage,
                type: 'success',
            })
        }
    }
}