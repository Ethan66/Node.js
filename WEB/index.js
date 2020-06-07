const path = require('path')
const http = require('http')
const fs = require('fs')
const url = require('url')

const staticPath = path.resolve(__dirname, 'static')

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    res.end()
    return false
  }
  const currentUrl = url.parse(req.url, true)
  let filename = currentUrl.pathname.slice(1)
  !filename.includes('.') && (filename += '.html')
  res.writeHead(200, { "Content-Type": `${getMine(filename)};charset='utf-8'` })
  fs.readFile(path.resolve(staticPath, filename), (err, data) => {
    if (err) {
      // 不存在文件判断是否是html文件，html文件直接转404
      if (filename.includes('.html')) {
        fs.readFile(path.resolve(staticPath, '404.html'), (err, data) => {
          if (err) {
            console.log('err: ', '404文件不存在')
            return false
          }
          res.end(data.toString())
          return false
        })
      }
      console.log(err)
      return false
    } else {
      res.end(data.toString())
    }
  })
}).listen(8001, '127.0.0.1')
  

function getMine (filename) {
  const extname = filename.split('.').slice(-1)[0]
  switch (extname) {
    case 'css':
      return 'text/css'
    case 'js':
      return 'text/javascript'
    default:
      return 'text/html'
  }
}