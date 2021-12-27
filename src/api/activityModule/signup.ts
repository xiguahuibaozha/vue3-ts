import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 分页列表
export const signupPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/activitySignup/registrationList",{
        params
    })
}
