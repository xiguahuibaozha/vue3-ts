import request from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页
export const page = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return request.get("/manage/order/page",{
        params
    })
}

// 修改状态/manage/order/updateStatus
export const updateStatus = (data:Params):Promise<AxiosResponse> => {
    return request.put("/manage/order/updateStatus",data)
}

// 分页
export const report = (params:PageParams):Promise<AxiosResponse> => {
    return request.get("/manage/order/report",{
        params,
        responseType: "blob"
    })
}