let fs = require('fs')

// 实用场景：当目录不存在，先创建一个目录

fs.stat('api/upload', (err, stats) => {
  if (err) {
    console.log('没有upload目录', err)
    fs.mkdir('api/upload', err => {
      if (err) {
        console.log('有upload目录', err)
      } else {
        console.log('创建upload成功')
      }
    })
    return false
  }
  console.log('存在upload目录')
})


// 常用api
// 检测我们的文件
fs.stat('api/http.js', (err, stats) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('文件', stats.isFile()) // 是否是文件
  console.log('目录', stats.isDirectory()) // 是否是目录
})

// 创建目录
fs.mkdir('api/css', (err) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('创建成功')
})

// 写入文件，没文件会创建一个，有则替换
fs.writeFile('api/css/reset.css', 'hello', (err) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('写入成功')
})

// 追加内容，没有文件会创建一个
fs.appendFile('api/create.js', '这是追加的内容', (err) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('追加成功')
})

// 读取文件
fs.readFile('api/create.js', (err, data) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('读取成功', data.toString())
})

// 读取文件夹下所有的目录
fs.readdir('api/css', (err, data) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('读取成功', data)
})

// 重命名/剪切文件
fs.rename('api/create.js', 'api/create1.js', (err) => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('重命名成功')
})

// 删除目录
fs.rmdir('api/css/1.css', err => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('删除目录成功')
})

// 删除文件
fs.unlink('api/css/1.css', err => {
  if (err) {
    console.log('err', err)
    return false
  }
  console.log('删除文件成功')
})