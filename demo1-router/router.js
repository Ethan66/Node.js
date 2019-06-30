exports.router = function(req, res) {
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
}