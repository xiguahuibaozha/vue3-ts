import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 订单分页
export const orderPage = (params:PageParams):Promise<AxiosResponse<PageResult>> => {
    return reuqest.get("/manage/orders/page",{
        params
    })
}