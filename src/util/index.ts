import settings from "@/settings"

// 从其他对象里面取值赋值
export const setObjValuesFromOtherObj = (obj: Obj, otherObj: Obj) => {
  Object.keys(obj).forEach(item => {
    obj[item] = otherObj[item]
  })
}

// 重写一份JSON.parse 当数据不为json时返回空对象
export const JSONParse = (str: string) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return {}
  }
}

// 获取图片地址
export const getUrl = (result: string): string => {
  if(!result){
    return ""
  }
  const resultObj = JSONParse(result)
  if (Object.keys(resultObj).length > 0) {
    if (/^http(|s)/.test(resultObj.url)) {
      return resultObj.url;
    } else {
      return `${settings.imgUrl}/${resultObj.url}`;
    }
  } else {
    if (/^http(|s)/.test(result)) {
      return result;
    } else {
      return `${settings.imgUrl}/${result}`;
    }
  }
};