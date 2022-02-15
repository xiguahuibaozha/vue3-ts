import request from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页
export const page = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return request.get("/manage/orderInfo",{
        params
    })
}

// 新增
export const addOrder = (data:Params):Promise<AxiosResponse> => {
    return request.post("/manage/orderInfo", data)
}

// 删除
export const deleteOrder = (ids:number | number[]):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)){
        ids = [ids]
    }
    return request.delete("/manage/orderInfo", {
        data: ids
    })
}