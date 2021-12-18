export const setSessionStorage = (key:string,value:any) => {
    sessionStorage.setItem(key,JSON.stringify(value))
}

export const removeSessionStorage = (key:string) => {
    sessionStorage.removeItem(key)
}

export const getSessionStorage = (key:string):string|null => {
    const session = sessionStorage.getItem(key)
    if(session !== null){
        return JSON.parse(<string>session)
    }else{
        return null
    }
}

export const setLocalStorage = (key:string,value:any) => {
    localStorage.setItem(key,JSON.stringify(value))
}

export const removeLocalStorage = (key:string) => {
    localStorage.removeItem(key)
}

export const getLocalStorage = (key:string):string|null => {
    const local = localStorage.getItem(key)
    if(local !== null){
        return JSON.parse(<string>local)
    }else{
        return null
    }
}