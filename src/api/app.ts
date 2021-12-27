import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

export const login = (params:{username:string,password:string}):Promise<AxiosResponse<any>> => {
    return reuqest.get("/manage/sysUser/login",{
        params
    })
}

export const loginOut = ():Promise<AxiosResponse<any>> => {
    return reuqest.get("/manage/sysUser/logout")
}

// 修改密码
export const passwordUpdate = (params:Params):Promise<AxiosResponse> => {
    return reuqest.put(`/manage/sysUser/updateCurrentSysUserPassword?newPassword=${params.newPassword}&oldPassword=${params.oldPassword}`)
}