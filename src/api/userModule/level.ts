import reuqest from '@/util/axios'
import { AxiosResponse } from "axios"

// 新增等级 /manage/userLevel
export const levelAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/userLevel",data)
}

// 修改等级
export const levelUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/userLevel",data)
}

// 查询等级列表
export const levelList = ():Promise<AxiosResponse> => {
    return reuqest.post("/manage/userLevel/queryList",{})
}

// 删除等级
export const levelDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/userLevel",{
        data: ids
    })
}

// 新增经验规则
export const levelRuleAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/experienceRule",data)
}

// 修改经验规则
export const levelRuleUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/experienceRule",data)
}

// 经验规则列表
export const levelRuleList = ():Promise<AxiosResponse> => {
    return reuqest.get("/manage/experienceRule/list",{
        params: {}
    })
}

// 查询头衔列表
export const titleList = ():Promise<AxiosResponse> => {
    return reuqest.post("/manage/userTitle/queryList",{})
}

// 修改头衔
export const titleUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/userTitle",data)
}

// 添加头衔
export const titleAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/userTitle",data)
}

// 删除头衔
export const titleDelete = (ids:number[] | number):Promise<AxiosResponse> => {
    if(!(ids instanceof Array)) {
        ids = [ids]
    }
    return reuqest.delete("/manage/userTitle",{
        data: ids
    })
}

// 新增积分规则
export const titleRuleAdd = (data:Params):Promise<AxiosResponse> => {
    return reuqest.post("/manage/integralRule",data)
}

// 修改积分规则
export const titleRuleUpdate = (data:Params):Promise<AxiosResponse> => {
    return reuqest.put("/manage/integralRule",data)
}

// 经验积分列表
export const titleRuleList = ():Promise<AxiosResponse> => {
    return reuqest.get("/manage/integralRule/list",{
        params: {}
    })
}