import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页
export const dynamicPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.put("/manage/userDynamic/page",{
        params
    })
}

// 查看
export const dynamicDetail = (id:string):Promise<AxiosResponse> => {
    return reuqest.get("/manage/userDynamic/queryById",{
        params: {
            id
        }
    })
}


// 删除
export const dynamicDelete = (ids:string[] | string):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/userDynamic/delete",{
        data: {
            ids
        }
    })
}