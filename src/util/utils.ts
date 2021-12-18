// 从其他对象里面取值赋值
export const setObjValuesFromOtherObj = (obj:Obj,otherObj:Obj) => {
    Object.keys(obj).forEach(item => {
        obj[item] = otherObj[item]
    })
}

// 重写一份JSON.parse 当数据不为json时返回空对象
export const JSONParse = (str: string) => {
    try{
        return JSON.parse(str)
    }catch(e){
        return {}
    }
}