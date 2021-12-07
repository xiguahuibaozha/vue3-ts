const { task,series } = require("gulp")
const { Client } = require('ssh2');
const glob = require("glob")
const path = require("path")

const config = {
    ssh: {
        host: "",
        port: 22,
        username: "administrator",
        password: ""
    },
    remotePath: "C:/Users/Administrator/Desktop/test"
}

//创建文件夹，一般第一次上传项目需要用到
task("mkdir",done => {
    const conn = new Client()

    conn.on("ready",() => {
        console.log('Client :: ready');

        conn.sftp((err,sftp) => {
            if(err) throw err;

            //先找出上传目录的所有文件夹
            //在远程服务器指定的上传目录中创建文件夹
            glob("dist/**/",(err, files) => {
                if(err) throw err;

                Promise.all(files.map(file => {
                    console.log(`开始创建文件：${file}`)
                    return new Promise((resolve) => {
                        sftp.mkdir(path.join(config.remotePath,file),(err) => {
                            if(err){
                                resolve({msg:`${file} 创建失败，可能已经存在该文件夹`,err})
                            }
                            resolve(`${file} 创建成功`)
                        })
                    })
                })).then((info) => {
                    console.log(info)
                    conn.destroy()
                })
        
            })
        }).on("close",() => {
            done()
            console.log('Client :: close');
        })
    }).connect(config.ssh)
})


//上传文件
task("upfile",done => {
    const conn = new Client()

    conn.on("ready",() => {
        console.log('Client :: ready');

        conn.sftp((err,sftp) => {
            if(err) throw err;

            glob("dist/**/*.*",(err, files) => {
                if(err) throw err;

                console.log("upFile start")

                return Promise.all(files.map(file => {
                    return new Promise((resolve) => {
                        sftp.fastPut(path.resolve(__dirname,file),path.join(config.remotePath,file),(err) => {
                            if(err) {
                                resolve({msg:`${file} 上传失败`,err})
                            }
                            resolve(`${file} 上传成功`)
                        })
                    }) 
                })).then((info) => {
                    console.log(info)
                    console.log("upFile over")
                    conn.destroy()
                })
            })

        }).on("close",() => {
            done()
            console.log('Client :: close');
        })

    }).connect(config.ssh)
})

// 重启PM2
task("restart",done => {
    const conn = new Client()

    conn.on("ready",() => {
        console.log('Client :: ready');

        conn.exec(`cd ${config.remotePath} && pm2 start`, err => {
            if(err) throw err;
            conn.destroy()
        }).on("close",() => {
            done()
            console.log('Client :: close');
        })

    }).connect(config.ssh)
})

// 关闭服务器
task("stop",done => {
    const conn = new Client()

    conn.on("ready",() => {
        console.log('Client :: ready');

        conn.exec(`pm2 delete all`, err => {
            if(err) throw err;
            conn.destroy()
        }).on("close",() => {
            done()
            console.log('Client :: close');
        })

    }).connect(config.ssh)
})