/* let http = require('http')
let fs = require('fs')
let path = require('path')
let url = require('url')

http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname
  if (pathname === '/') {
    pathname = '/index.html'
  }
  let extname = path.extname(pathname) // 拿到文件的后缀名
  let mime = getMime(extname)
  res.writeHead(200, {"content-Type":  mime + ";charset='utf-8'"})
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

function getMime (extname) {
  switch (extname) {
    case '.html': 
      return 'text/html'
    case '.css':
      return 'text/css'
    case '.js':
      return 'text/javascript'
    default:
      return 'text/html'
  }
} */

const url = require('url')
const http = require('http')
const path = require('path')
const fs = require('fs')

http.createServer((req, res) => {
  let pathname = url.parse(req.url, true).pathname
  if (pathname === '/') {
    pathname = '/index.html'
  }
  let extname = path.extname(pathname)
  let type = ''
  switch(extname) {
    case '.html':
      type = 'text/html'
      break
    case '.css':
      type = 'text/css'
      break
    case '.js':
      type = 'text/javascript'
      break
  }
  res.writeHead(200, { "content-Type":  type + ";charset='utf-8'" })
  if (pathname === '/favicon.ico') {
    res.end()
    return false
  }
  fs.readFile(`./demo1/${pathname}`, (err, data) => {
    if (err) {
      fs.readFile('./demo1/404.html', (err, data) => {
        if (err) {
          console.log(err)
          return false
        }
        res.write(data)
        res.end()
      })
      return false
    }
    res.write(data)
    res.end()
  })
}).listen(8001)