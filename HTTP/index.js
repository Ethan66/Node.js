const http = require('http') // node内置模块
const url = require('url') // node内置模块

http.createServer((req, res) => { // 创建HTTP服务器: req:获取url信息 res浏览器响应信息

  // 设置响应的HTTP头，状态码为200，文件类型是html,字符集是utf-8
  res.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"})

  if (req.url !== '/favicon.ico') {
    const currentUrl = url.parse(req.url, true) // 解析当前url获取get参数
    const baidu = url.parse('https://www.baidu.com/index?name=ethan&age=20', true)

    res.write('https://www.baidu.com/index?name=ethan&age=20的url解析: ')
    res.write(`<ul>
    <li><span style="color: #666;">url.protocol: </span><span>${baidu.protocol}</span></li>
    <li><span style="color: #666;">url.host: </span><span>${baidu.host}</span></li>
    <li><span style="color: #666;">url.hostname: </span><span>${baidu.hostname}</span></li>
    <li><span style="color: #666;">url.query: </span><span>${JSON.stringify(baidu.query)}</span></li>
    <li><span style="color: #666;">url.path: </span><span>${baidu.path}</span></li>
    <li><span style="color: #666;">url.pathname: </span><span>${baidu.pathname}</span></li>
    <li><span style="color: #666;">url.href: </span><span>${baidu.href}</span></li>
  </ul>`)

    res.write('当前的url解析: ')
    res.write(`<ul>
    <li><span style="color: #666;">url.protocol: </span><span>${currentUrl.protocol}</span></li>
    <li><span style="color: #666;">url.host: </span><span>${currentUrl.host}</span></li>
    <li><span style="color: #666;">url.hostname: </span><span>${currentUrl.hostname}</span></li>
    <li><span style="color: #666;">url.query: </span><span>${JSON.stringify(currentUrl.query)}</span></li>
    <li><span style="color: #666;">url.path: </span><span>${currentUrl.path}</span></li>
    <li><span style="color: #666;">url.pathname: </span><span>${currentUrl.pathname}</span></li>
    <li><span style="color: #666;">url.href: </span><span>${currentUrl.href}</span></li>
  </ul>`)
  }
  
  // 结束响应
  res.end()
}).listen(8001, '127.0.0.1')