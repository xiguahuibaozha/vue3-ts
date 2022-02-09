declare module '*.json'
declare module '*.png'
declare module '*.svg'
declare module 'parallax-js'
declare module 'qrcode'

declare type Obj = {
    [name: string]: any,
    [name: number]: any
}

declare type Icon = {
    [name: string]: Component
}

declare var AMapUI:{
    PoiPicker:{
        new(params:any):any
    }
}

declare type InsertFnType = (url: string, alt: string, href: string) => void