import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 列表
export const goodsPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/goods/page",{
        params
    })
}

// 详情
export const goodsDetail = (id:number):Promise<AxiosResponse> => {
    return reuqest.get("/manage/goods/"+id)
}

// 新增
export const goodsAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/goods",data)
}

// 修改
export const goodsUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/goods",data)
}

// 删除
export const goodsDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/goods",{
        data: ids
    })
}

// 上架 or 下架
export const goodsState = (id:string | number, state:number| number) => {
    return reuqest.put(`/manage/goods/${id}/${state}`)
}