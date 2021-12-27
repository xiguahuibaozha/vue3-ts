import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页
export const commentPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/comment/queryByDynamicId",{
        params
    })
}

// 删除评论
export const commentDelete = (ids:string | string[]):Promise<AxiosResponse<PageResult>> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/comment",{
        data: ids
    })
}