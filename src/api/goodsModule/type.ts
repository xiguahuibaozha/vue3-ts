import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 列表
export const goodsTypeList = (params?:Params):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/type",{
        params
    })
}

// 分页
export const goodsTypePage = (params?:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/type/page",{
        params
    })
}

// 新增
export const goodsTypeAdd = (data?:Params):Promise<AxiosResponse<PageResult>> => {
    return reuqest.post("/manage/type",data)
}

// 删除
export const goodsTypeDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/type",{
        data: ids
    })
}

// 详情
export const goodsTypeDetail = (id:number):Promise<AxiosResponse> => {
    return reuqest.get("/manage/type/"+id)
}

// 修改
export const goodsTypeUpdate = (data?:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/type",data)
}