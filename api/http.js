var http = require('http') // 引入模块

var url = require('url') // 引入url模块，拿到url相应的内容
// req:获取url信息
// res浏览器响应信息
http.createServer(function(req, res){ // 创建HTTP服务器

  if (req.url!=='/favicon.ico') { // 因为当前有2个请求，其中一个是/favicon.ico
    console.log('url', req.url) // 获取当前页面的url（除去host）信息
    var query = url.parse(req.url, true) // 解析当前url获取get参数
    console.log('query', query, query.query.aid)
  }

  // 设置响应的HTTP头，状态码为200，文件类型是html,字符集是utf-8
  res.writeHead(200, {"content-Type": "text/html;charset='utf-8'"})

  res.write('hello') // 书写到页面中，跟document.write()差不多

  res.end() // 结束响应
}).listen(8001) // 用listen设置端口号

let obj = require('./common.js')

console.log(obj)