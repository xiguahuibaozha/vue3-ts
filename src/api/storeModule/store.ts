import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 门店列表 /manage/store/page
export const storePage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/store/page",{
        params
    })
}

// 查看门店详情/manage/store/{id}
export const storeDetail = (id:number):Promise<AxiosResponse> => {
    return reuqest.get("/manage/store/"+id)
}

// 新增门店
export const storeAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/store",data)
}

// 修改门店
export const storeUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/store",data)
}

// 删除
export const storeDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/store",{
        data: ids
    })
}