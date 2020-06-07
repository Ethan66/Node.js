const fs = require('fs-extra') // 因为fs没有清空文件夹的api
const ignoreFile = ['index.js', 'clear.js']
const path = require('path')

// 判断FS下的一级目录是否是ignoreFile文件，否的话都给删除
fs.readdir('FS', (err, data) => {
  if (err) {
    console.log('err: ', 'clear.js读取文件失败', err)
    return false
  }
  data.forEach(file => {
    if (!ignoreFile.includes(file)) {
      fs.stat(path.resolve(__dirname, file), (err, newFile) => {
        if (err) {
          console.log('err: ', 'clear.js检测文件失败', err)
          return false
        }
        if (newFile.isDirectory()) {
          fs.emptyDirSync(path.resolve(__dirname, file)) // 清空目录下的内容，但是不会删除目录
          fs.rmdir(path.resolve(__dirname, file), err => {
            if (err) {
              console.log('err: ', 'clear.js删除目录失败', err)
              return false
            }
          })
        } else {
          fs.unlink(path.resolve(__dirname, file), (err) => {
            if (err) {
              console.log('err', 'clear.js清除文件失败', err)
              return false
            }
          })
        }
      })
    }
  })
})