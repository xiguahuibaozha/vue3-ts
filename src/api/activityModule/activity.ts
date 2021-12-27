import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页列表
export const activityPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/activity/search",{
        params
    })
}

// 列表
export const activityList = (params:Params):Promise<AxiosResponse> => {
    return reuqest.get("/manage/activity/list",{
        params
    })
}


// 修改
export const activityUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/activity",data)
}

// 新增
export const activityAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/activity",data)
}

// 详情
export const activityDetail = (id:number):Promise<AxiosResponse> => {
    return reuqest.get("/manage/activity/"+id)
}

// 删除
export const activityDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/activity",{
        data: ids
    })
}