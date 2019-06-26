// 注意异步情况

// 判断api目录下的所有文件，并打印出
var fs = require('fs')

let arr = []
fs.readdir('api', (err,data) => {
  if (err) {
    console.log('err', err)
    return false
  }
  data.forEach((item, i) => {
    fs.stat(`api/${item}`, (err, stats) => { // 注意，这里是异步的，不能用for循环
      if (err) {
        return false
      }
      if (stats.isFile()) arr.push(item)
      if (data.length - 1 === i) {
        console.log(arr)
      }
    })
  })
})

// 读取文件流(文件比较大的时候读取)
let readStream = fs.createReadStream('api/input.txt')
let str = ''
let count = 0
// 读取数据
readStream.on('data', (chunk) => {
  str +=chunk
  count++
})
// 读取完成
readStream.on('end', (chunk) => {
  console.log(str)
  console.log(count)
})
// 错误
readStream.on('error', (chunk) => {
  console.log(str)
  console.log(count)
})

// 文件小的时候读取
fs.readFile('api/input.txt', (err, data) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('读取成功', data.toString())
})

// 写入文件流
let data = '收到的好多号发的规划法规和法国'
// 创建一个可以写入的流，写入到文件output.txt中，没有文件会新建一个
let writeSream = fs.createWriteStream('api/output.txt')
// 写入开始
writeSream.write(data, 'utf-8')
// 写入完成
writeSream.on('finish', () => {
  console.log('写入完成')
})
// 写入结束
writeSream.end()
// 失败
writeSream.on('error', () => {
  console.log('写入失败')
})