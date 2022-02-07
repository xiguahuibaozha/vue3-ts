import request from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页
export const page = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return request.get("/manage/goods/page",{
        params
    })
}

// 详情 
export const goodsDetail = (id:number):Promise<AxiosResponse> => {
    return request.get("/manage/goods/info",{
        params: {
            id
        }
    })
}

// 新增
export const goodsAdd = (data:Params):Promise<AxiosResponse> => {
    return request.post("/manage/goods",data)
}

// 修改
export const goodsUpdate = (data:Params):Promise<AxiosResponse> => {
    return request.put("/manage/goods",data)
}

// 删除
export const deleteGoods = (id:number | number[]):Promise<AxiosResponse> => {
    if(!(id instanceof Array)){
        id = [id]
    }
    return request.delete("/manage/goods",{
        data: id
    })
}