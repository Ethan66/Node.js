const fs = require('fs')

// 创建一个可读流
const readStream = fs.createReadStream('./FS2/index.txt')

let result = ''
let count = 0

// 监听文件流读取情况：文件内容太大会分次读取
readStream.on('data', (data) => {
  result += data
  count++
})

// 文件流读取完成执行回调
readStream.on('end', () => {
  console.log(count)
})

// 文件流读取失败
readStream.on('error', err => {
  console.log(err)
})


// 创建一个可写流
const writeStream = fs.createWriteStream('./FS2/index.txt')

const data = '我是写入的内容'

// 写入内容
writeStream.write(data, 'utf-8')

// 通知执行finish函数
writeStream.end()

// 写入完成
writeStream.on('finish', () => {
  console.log('写入完成')
})

// 文件写入失败
writeStream.on('error', (err) => {
  console.log(err)
})