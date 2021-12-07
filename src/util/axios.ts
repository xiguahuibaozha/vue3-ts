import axios from "axios"
import * as storage from "./storage"
import { ElMessage } from 'element-plus'

const env = process.env

const jwt = storage.getLocalStorage("jwt")

const instance = axios.create({
    baseURL: env.VUE_APP_BASE_API,
    timeout: 5000 //超时时间
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Do something before request is sent

    if(jwt){
        config.headers['jwt'] = jwt
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data

    const code = response.data.code

    if(code === 200){
        return response.data;
    }else{
        ElMessage({
            type: "error",
            message: response.data.msg || "请求超时"
        })
        return Promise.reject(response);
    }
}, function (error) {
    // Do something with response error
    ElMessage({
        type: "error",
        message: "请求超时"
    })
    return Promise.reject(error);
});

export default instance