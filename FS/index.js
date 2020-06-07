// fs.stat // 检测文件是目录还是对象
// fs.mkdir // 创建目录
// fs.writeFile // 覆盖内容，文件不存在先创建再写入
// fs.appendFile // 追加内容
// fs.readdir // 读取目录下的所有一级目录(包括文件)
// fs.readFile // 读取文件内容
// fs.rename // 重命名, 剪切文件
// fs.rmdir // 删除目录
// fs.unlink // 删除文件


const fs = require('fs')

// fs.stat
fs.stat('FS', (err, file) => {
  if (err) {
    console.log('error: FS/index.js', err)
    return false
  }
  console.log('FS是目录: ', file.isDirectory())
  console.log('FS是文件: ', file.isFile())
})

// fs.mkdir
fs.mkdirSync('./FS/aaa', err => {
  if (err) {
    console.log('err: ', 'fs.mkdir error', err)
    return false
  }
})

// fs.writeFile
fs.writeFileSync('./FS/aaa/b.js', '你好,', err => {
  if (err) {
    console.log('err: ', err)
    return false
  }
})

// fs.appendFile
fs.appendFileSync('./FS/aaa/b.js', '你好帅', err => {
  if (err) {
    console.log('err: ', err)
    return false
  }
})

// fs.readdir
fs.readdirSync('./FS', (err, data) => {
  if (err) {
    console.log('err: ', err)
    return false
  }
  console.log('FS的目录文件：', data)
})

// fs.readFile
fs.readFileSync('./FS/aaa/b.js', (err, data) => {
  if (err) {
    console.log('err: ', err)
    return false
  }
  console.log('b文件的内容：', data.toString())
})

// fs.rename
fs.renameSync('./FS/aaa/b.js', './FS/c.js', err => {
  if (err) {
    console.log('err: ', err)
    return false
  }
})

// fs.rmdir
fs.rmdirSync('./FS/aaa', err => {
  if (err) {
    console.log('err: ', err)
    return false
  }
})

// fs.unlink
fs.unlinkSync('./FS/c.js', err => {
  if (err) {
    console.log('err: ', err)
    return false
  }
})