import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 获取字典列表 字典键
export const getRictionariesList = (params:Params):Promise<AxiosResponse> => {
    return reuqest.get("/manage/dictionaries/queryList", {
        params
    })
}