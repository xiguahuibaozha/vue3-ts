import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页
export const warehousePage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/warehousing/page",{
        params
    })
}

// 新增
export const warehouseAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/warehousing",data)
}

// 查看
export const warehouseDetail = (id:number):Promise<AxiosResponse> => {
    return reuqest.get("/manage/warehousing/"+id)
}

// 修改
export const warehouseUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/warehousing",data)
}

// 删除
export const warehouseDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/warehousing",{
        data: ids
    })
}