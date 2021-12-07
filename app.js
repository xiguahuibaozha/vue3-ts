const express = require("express")
const path = require("path")
const app = express()

const argv = process.argv

// 获取pm2传过来的参数
const port = argv[argv.length-1]

app.use(express.static(path.join(__dirname,"./dist")))

app.listen(port,() => {
    console.log(`启动成功 ip:${port}`)
})
