'use strict'
const path = require('path')

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
        port: 8080,
        // 服务器启动自动打开浏览器
        open: true,
        // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
        overlay: {
            // 只显示错误
            errors: true,
            warnings: false,
        },
        proxy: {
            '/test': {
                target: 'http://192.168.1.197:20000',
                changeOrigin: true, // 开启代理
                pathRewrite: {
                    '^/up':''
                }
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
    chainWebpack: config => {
        const dir = path.resolve(__dirname, 'src/icons/svgs')  //确定icon所在的目录
        config.module  //config是vue把webpack的API封装暴露给我们的一个对象，让我们使用
          .rule('svg-sprite')  //添加一个规则
          .test(/\.svg$/)  //文件匹配正则就用上面的规则
          .include.add(dir).end() //规则只包含icons目录
          .use('svg-sprite-loader'/*使用svg-sprite-loader*/).loader('svg-sprite-loader').options({ extract: false }/*不要解析出文件*/).end()
        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin')), [{ pluginSprite: true }]//配置插件
        config.module.rule('svg').exclude.add(dir)//其他svg loader排除 icons目录
    }
}