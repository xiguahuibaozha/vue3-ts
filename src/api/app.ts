import request from '@/util/axios'
import { AxiosResponse } from "axios"

export const login = (params:{username:string,password:string}):Promise<AxiosResponse<any>> => {
    return request.get("/manage/user/login",{
        params
    })
}

export const loginOut = ():Promise<AxiosResponse<any>> => {
    return request.get("/manage/user/logout")
}