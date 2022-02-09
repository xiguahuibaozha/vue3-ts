import axios from "axios"
import * as storage from "./storage"
import { ElMessage, ElLoading, ILoadingInstance } from 'element-plus'
import router from '@/router'
import { ResponseMessage } from "@/api/index"

// const token = storage.getLocalStorage("token")

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    // headers: {
    //     "content-type": "application/json"
    // },
    timeout: 5000 //超时时间
});

// 正在执行的请求
let loadingRequest:string[] = []
// 请求接口时展示全屏的遮罩层
let elLoading:ILoadingInstance|null = null

// Add a request interceptor
instance.interceptors.request.use((config) => {
    if(elLoading == null){
        elLoading = ElLoading.service({
            lock: false,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
    }

    if(config.url){
        loadingRequest.push(config.url)
    }
    // Do something before request is sent
    // 设置token
    config.headers['token'] = storage.getLocalStorage("token")

    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // 移除完成的请求
    loadingRequest = loadingRequest.filter(item => {
        return !(item === response.config.url)
    })
    // 请求全部完成后关闭遮罩层
    if(loadingRequest.length === 0){
        elLoading?.close()
        elLoading = null
    }

    // blob格式跳出下面判断
    if(response.data instanceof Blob){
        return response;
    }

    // 静态文件跳过判断code环节
    if(response.headers['content-type'] == 'text/html'){
        return response;
    }

    // Do something with response data
    const code = response.data.code
    if(code === 200){
        ResponseMessage(response)
        return response.data;
    }else if(code === 401){
        router.push("/login")
    }else if(code === 400){
        router.push("/login")
    }
    ElMessage.closeAll()
    ElMessage({
        showClose: true,
        type: "error",
        message: response.data.msg || "服务器错误"
    })
    return Promise.reject(response);
}, (error) => {
    // 清空所有请求
    loadingRequest = []
    // 请求报错时隐藏遮罩层
    elLoading?.close()
    // Do something with response error
    ElMessage.closeAll()
    ElMessage({
        showClose: true,
        type: "error",
        message: "服务器错误"
    })
    return Promise.reject(error);
});

export default instance