import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 查看用户分页
export const userPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/user",{
        params
    })
}

// 查看用户列表
export const userList = (params:Params):Promise<AxiosResponse> => {
    return reuqest.get("/manage/user/list",{
        params
    })
}

// 修改用户
export const userUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/user",data)
}

// 删除用户/manage/user
export const userDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/user",{
        data: ids
    })
}