'use strict'
const path = require('path')

const title = "VUE3+TS"

const port = 8080

// 配置都能在这里找到 https://cli.vuejs.org/zh/config/#pages
module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'static',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)
    indexPath: 'index.html',
    // eslint boolean | 'warning' | 'default' | 'error' 是否在每次保存时lint代码
    lintOnSave: 'warning',
    productionSourceMap: false,
    devServer: {
        // 端口
        port: port,
        // 服务器启动自动打开浏览器
        open: true,
        // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
        overlay: {
            // 只显示错误
            errors: true,
            warnings: false,
        },
        proxy: {
            "lbt":{
                target: "http://127.0.0.1:3000/mock/11",
                changeOrigin: true,
                // pathRewrite: {
                //     '^seovx': ''
                // }
            }
        }
    },
    // 全局引入
    css:{
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/variables.scss";`
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        }
    },
    chainWebpack(config){
        // 设置项目title
        config.plugin('html').tap(args => {
            args.forEach(item => {
                item.title = title
            })
            return args
        })
    }
}