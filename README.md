# 克隆项目
git clone git@124.70.134.70:youya/treasure-house

# 安装依赖
npm install

node版本推荐v14 其他版本node-sass会出现各种bug，安装不上去

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
```
## 启动
npm run serve

## 发布  需要配置 gulpfile.js
npm run build:public

## 打包
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix