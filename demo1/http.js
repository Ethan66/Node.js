let http = require('http')
let fs = require('fs')
let path = require('path')

http.createServer((req, res) => {
  res.writeHead(200, {"content-Type": "text/html;charset='utf-8'"})
  let pathname = req.url
  if (pathname === '/') {
    pathname = '/index.html'
  }
  let extname = path.extname(pathname) // 拿到文件的后缀名
  if (pathname !== '/favicon.icon') {
    console.log(pathname)
    fs.readFile(`demo1/${pathname}`, (err, data) => {
      if (err) {
        fs.readFile('demo1/404.html', (err, data) => {
          res.write(data)
          res.end
        })
      } else {
        res.write(data)
        res.end()
      }
    })
  }
}).listen(8001)