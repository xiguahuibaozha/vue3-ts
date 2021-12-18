declare type PageParams = {
    currentPage: number,
    pageSize: number,
    [name: string]: any
}

declare type PageResult = {
    currentPage: number,
    data: {[name:string]:any}[],
    pageSize: number,
    total: number,
    totalPage: number
}

declare type Params = {
    [name:string]: any
}

declare type MyResponse = {
    code: number,
    data: any,
    msg: string
}