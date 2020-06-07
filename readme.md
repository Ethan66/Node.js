### 课堂笔记
Node.js入门实战视频教程（39讲-IT营大地）- 2017.6

### Node.js小技巧
```
$node
let a = 1
let b = 2
console.log(a+b) // 3 就跟控制台是一样的

热更新问题
npm i -g supervisor
执行 supervisor http.js

commonJs问题
// CommonJs使Node.js的代码进行模块化分类。
// 抛出：module.exports = obj, 引入：let obj = require('obj'); console.log(obj)
node_modules引入可以直接用文件名

node_modules多层嵌套怎么直接用文件名？
// - node_modules
// -- nav
// ---- navTop.js
// 怎么直接require('navTop')？


答：正常引入方式，require('nav/navTop'); 其他引入方式：进入nav目录，直接npm init -y，生成package.json，会直接读取里面的入口文件执行相对应得文件。

package.jsonr版本号问题
^表示第一位版本号不变，后面两位最新
~表示前两位不变，最后一位取最新
*表示全部取最新

"prefs": "node FS/clear.js", // 因为加了pre，所以执行npm run fs的时候先执行prefs
"fs": "node FS"

npm list // 查看当前目录安装包list
npm view vue versions // 查看vue所有安装版本
```

### Node.js开篇

##### Node.js简介
> Node.js 是一个 Javascript 运行环境(runtime)。Nodejs 是基于 V8 引擎, V8 是 Google 发布的开源 JavaScript 引擎 ,本身就是用于 Chrome 浏览器
的 JS 解释部分。

##### Node.js超强的高并发能力
> 在 Java、PHP 或者.net 等服务器端语言
中,会为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约 2MB 内存。也就是说,理论上,一个 8GB 内存的服务器可以同时连接的最大用户数为 4000 个左右。要让 Web 应用程序支持更多的用户,就需要增加服务器的数量,而 Web 应用程序的硬件成本当然就上升了。
Node.js不为每个客户连接创建一个新的线程,而仅仅使用一个线程。当有用户连接了,就触发一个内部事件,通过非阻塞 I/O、事件驱动机制,让 Node.js 程序宏观上也是并行的。使用 Node.js ,一个 8GB内存的服务器,可以同时处理超过 4 万用户的连接。

##### Node.js不仅可以实现应用，还实现了整个HTTP服务器
> 如果我们使用 PHP 来编写后端的代码时,需要 Apache 或者 Nginx 的 HTTP 服务器,来处理客户端的请求相应。但是Node.js只需要引入HTTP模块就可以了。
常见web服务器：Apache,Nginx,IIS

### Node.js模块
##### HTTP和url模块
npm run HTTP

##### FS模块
npm run fs
```
const fs = require('fs')
const fs1 = require('fs-extra') // fs的扩展，比如清空文件夹

// 记忆点：1、读取内容，读取文件，检测文件有data，其他都没有。
2、dir不需要驼峰

// fs.stat // 检测文件是目录还是对象
// fs.mkdir // 创建目录
// fs.writeFile // 覆盖内容，文件不存在先创建再写入
// fs.appendFile // 追加内容
// fs.readdir // 读取目录下的所有一级目录(包括文件)
// fs.readFile // 读取文件内容
// fs.rename // 重命名, 剪切文件
// fs.rmdir // 删除目录
// fs.unlink // 删除文件
```

##### FS文件流
npm run fs2
针对文件比较大的情况，用file读取会卡

##### 创建静态web服务器
npm run web

##### Nodejs events模块处理异步
> node.js有很多异步操作，如何拿到异步的数据
```
let events = require('events')
let EventEmitter = new events.EventEmitter() // 实例化事件对象
// 广播和接收广播

// 监听to_parent的广播
EventEmitter.on('to_parent', function(data){
  console.log('接收到了广播事件')
  console.log(data)
})

setTimeout(function(){
  console.log('开始广播')
  // 广播
  EventEmitter.emit('to_parent', '发送的数据')
}, 2000)
```