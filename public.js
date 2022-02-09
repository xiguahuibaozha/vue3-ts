const { Client } = require('ssh2');
const glob = require("glob")
const path = require("path")
const conn = new Client();

const remoteDirPath = "/usr/local/nginx/html/jnb_manage"

const doExec = (cmd) => {
    return new Promise(resolve => {
        const data = null
        conn.exec(cmd, (err, stream) => {
            if (err) throw err;
            stream.on('close', (code, signal) => {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal + ', cmd: ' + cmd);
                resolve()
            }).on('data', (data) => {
                console.log('STDOUT: ' + data);
                resolve(data)
            }).stderr.on('data', (data) => {
                console.log('STDERR: ' + data);
            });
        });
    })
}

conn.on('ready', async () => {
    // 首先创建文件夹
    glob("dist/**/", (err, files) => {
        // files.forEach(async file => {
        //     await doExec(`mkdir ${remoteDirPath}/${file}`)
        // });

        // 将文件上传至文件夹
        conn.sftp((err, sftp) => {
            if (err) throw err;
            glob("dist/**/*.*", (err, files) => {
                Promise.all(files.map(file => {
                    return new Promise((resolve, reject) => {
                        sftp.fastPut(path.resolve(__dirname, file), remoteDirPath + "/" + file, (err) => {
                            if (err) {
                                console.log(`${file} 上传失败，${err}`);
                                reject(err)
                            };
                            resolve()
                        })
                    })
                })).finally(() => {
                    conn.end()
                })
            })
        })
    })
}).connect({
    host: '',
    port: 22,
    username: '',
    password: ''
});            