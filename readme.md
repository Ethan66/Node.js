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

#### Node.js简介
> Node.js 是一个 Javascript 运行环境(runtime)。Nodejs 是基于 V8 引擎, V8 是 Google 发布的开源 JavaScript 引擎 ,本身就是用于 Chrome 浏览器
的 JS 解释部分。

#### Node.js超强的高并发能力
> 在 Java、PHP 或者.net 等服务器端语言
中,会为每一个客户端连接创建一个新的线程。而每个线程需要耗费大约 2MB 内存。也就是说,理论上,一个 8GB 内存的服务器可以同时连接的最大用户数为 4000 个左右。要让 Web 应用程序支持更多的用户,就需要增加服务器的数量,而 Web 应用程序的硬件成本当然就上升了。
Node.js不为每个客户连接创建一个新的线程,而仅仅使用一个线程。当有用户连接了,就触发一个内部事件,通过非阻塞 I/O、事件驱动机制,让 Node.js 程序宏观上也是并行的。使用 Node.js ,一个 8GB内存的服务器,可以同时处理超过 4 万用户的连接。

#### Node.js不仅可以实现应用，还实现了整个HTTP服务器
> 如果我们使用 PHP 来编写后端的代码时,需要 Apache 或者 Nginx 的 HTTP 服务器,来处理客户端的请求相应。但是Node.js只需要引入HTTP模块就可以了。
常见web服务器：Apache,Nginx,IIS

### Node.js模块
#### HTTP和url模块
npm run HTTP

#### FS模块
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

#### FS文件流
npm run fs2
针对文件比较大的情况，用file读取会卡

#### 创建静态web服务器
npm run web

#### Nodejs events模块处理异步
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

### mongodb
#### mongodb安装介绍
> SQL数据库有表和行的结构，NoSQL没有行和列的概念，对应的结构是集合(collection)，文档(document)，用JSON来存储数据的。

```
// 1、配置环境变量
安装mongodb -> 复制安装地址(mongoDB/bin) -> 高级系统设置 -> 高级 -> 环境变量 -> 双击path -> 新建粘贴地址 -> 校验($ mongo)

// 2、新建文件夹存储数据(c:/data)

// 3、开启mongodb服务端
$ mongod --dbpath=c:/data

// 4、开启mongodb客服端连接服务端
$ mongo 127.0.0.1:2701 // 连上远程服务端，连本地直接mongo回车就行

// 5、查看是否连接
$ show dbs // 展示数据库
$ cls // 清空命令行

// 其他命令
// 数据库，表的操作
$ use demo // 切换到demo数据库，即使demo数据库不存在
$ db.user.insert({"name":"Ethan"}) // 给当前库插入数据，没有demo数据库的话就会创建一个库demo和user的collection
$ show collection // 展示当前数据库的表
$ db.user.drop() // 删除user表
$ db.dropDatabase() // 删除demo数据库
$ db.admin.insert({"name":"Ethan"}) // 给当前库创建表
$ db // 查看当前使用的数据库

// 查询
$ db.user.find() // 查找user表所有数据
$ db.user.find({"name":"Ethan"}) // 查找匹配数据
$ db.user.findOne({"name":"Ethan"}) // 查找一条数据
$ db.user.find({"name":"Ethan"}, {age: 1}) // 查询name等于Ethan的数据后，只获取age字段，其他字段不要

// 模糊查询
$ db.user.find({"title":/文章/}) // 查找title里包含文章的数据
$ db.user.find({"title":/^文章/}) // 查找title里包含文章开头的数据

// 批量查询
$ db.user.find({"age":{$gt:20}}) // 查找age大于20，$lt：小于，$gte：大于等于，$lte: 小于等于

// 排序，分页
$ db.user.find({"name":"Ethan"}).sort({"age":1}) // 按age升序排序，-1表示降序
$ db.user.find({"name":"Ethan"}).limit(2) // 分页：只获取前2条数据
$ db.user.find({"name":"Ethan"}).skip(2).limit(3) // 跳过前2条获取3-5条数据
$ db.user.find({age: '24', name: 'Ethan'}).count() // 查找匹配数据的条数

// 2个以上关系查询
$ db.user.find($or: [{age: '24', name: 'Ethan'}]) // 或关系
$ db.user.find({age: '24', name: 'Ethan'}) // 与关系

// 更新
db.user.update({"name": "Ethan"}, {$set:{"name": "Ethan6"}}) // 不写$set就会把整条数据替换
db.user.update({"name": "Ethan"}, {$inc:{"school": "Ethan6"}}) // 在原有数据基础上添加属性
db.user.update({"name": "Ethan"}, {$push:{"school": "Ethan6"}}) // 在原有数据的数组中添加元素

// 删除
db.user.remove({"name":"Ethan"}, {"justOne": true})
db.user.remove({"name":"Ethan"}) // 删除多条

// 索引：增加检索速度
db.user.getIndexs() // 查询表里有索引的字段
db.user.dropIndex({"name":1}) // 删除name的索引
db.user.ensureIndex({"name":1}) // 设置name索引， 1表示升序，-1表示降序
db.user.find({"name":"Ethan"}).explain("executionState") // 查询的分析，有查询时间
db.user.ensureIndex({"name":1, "age":-1}) // 复合索引，场景：同时查询name和age
db.user.ensureIndex({"userId":1}, {"unique":true}) // 表示userId的值是唯一的，重复的userId会报错
```

### Koa
课堂笔记：Koa2+Nodejs+MongoDb打造企业级CMS前后端全栈项目实战视频教程

#### Koa安装
```
const Koa = require('koa')
const app = new Koa()

// 应用级中间件
app.use('/index', async (ctx, next) => { // 第一个参数表示匹配某个路由，不写表示匹配所有路由
  ctx.body = '相应内容'
  await next() // 当前路由匹配完成后，继续向下匹配
})

app.listen(3000, () => {
  console.log('starting at port 3000')
}) // 设置端口
```

#### Koa路由
```
const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()

// 路由中间件
router.get('/news', async (ctx, next) => {
  console.log(ctx) // ctx保存请求响应所有数据，上下文context
  console.log(ctx.query, ctx.request.query) // 获取的是参数对象
  console.log(ctx.querystring, ctx.request.querystring) // 获取的是参数字符串
  console.log(ctx.url, ctx.request.url) // 获取url地址
  ctx.body = '这是首页' // 设置响应内容，不然就会报404
  await next()
})

app.use(router.routes()) // 启动路由。理解：根据路由保存到一个对象中，当http.createServer()函数里，根据请求的路由执行对象里的方法，这样就触发了async的回调函数
app.use(router.allowedMethods()) // 官网文档推荐,如果自己没有设置响应头，默认给你响应头

app.listen(3000, () => {
  console.log('starting at port 3000')
})

// 动态路由：从路由上获取参数，比如爱词霸，只要输入相应单词，就会翻译此单词
router.get('/newscontent/:a/:b', async ctx => {
  console.log(ctx.params) // 在浏览器上输入localhost:3000/newscontent/123/456，打印的是{a: 123, b: 456}
})
```

#### 中间件
> 中间件：中间件就是匹配路由之前或者匹配路由完成做的一系列的操作（比如：执行任何代码、修改请求和响应对象、终结请求-响应循环、调用堆栈中的下一个中间件。）
> 中间件可以做什么？比如后台管理系统，需要在每个接口之前判断当前用户是否有登录，只需要在所有路由之前使用应用级中间件即可
> 执行顺序：不管书写顺序，先执行应用级中间件，再执行路由级中间件

```
// 错误处理中间件
app.use(async (ctx, next) => {
  await next()
  if (ctx.status === 404) { // 用到了洋葱圈执行顺序
    ctx.status = 404
    ctx.body = '这是一个404页面'
  }
})

// 中间件执行顺序：洋葱圈
app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(5)
})

app.use(async (ctx, next) => {
  console.log(2)
  await next()
  console.log(4)
})

router.get('/new', async (ctx, next) => {
  console.log(3)
})
// 执行结果：1 -> 2 -> 3 -> 4 -> 5
```

#### Koa的post
```
// post请求要用koa-bodyparser中间件：因为post请求获取参数是异步操作，所以要用封装的
// 原生node写法
router.post('./add', async ctx => {
  let fn = function (ctx) {
    return new Promise((resolve, reject) => {
      try{
        let str = ''
        ctx.req.on('data', (chunk) => {
          str += chunk
        })
        ctx.req.on('end', (chunk) => {
          resolve(str)
        })
      }catch (err) {
        reject(err)
      }
    })
  }
  let data = await fn()
  ctx.body = data
})

// koa-bodyparser中间件post请求
const bodyParser = require('koa-bodyparser') // post请求获取请求参数

app.use(bodyParser())

router.post('/news', async (ctx, next) => {
  console.log(ctx.request.body) // 获取请求数据
  ctx.body = '新闻页面'
  await next()
})
```

#### cookie
```
// 设置cookie
router.get('/setCookie', async (ctx, next) => {
  ctx.cookies.set('userInfo', 'Ethan', {
    maxAge: 60*1000,
    expires: '2020-10-1', // 表示过期的具体时间
    domain: '.baidu.com', // a.baidu.com, b.baidu.com都可以访问
    secure: true, // 表示http不能访问了
    path: '/getCookie', // 配置可访问的路由，默认是所有路由都可以拿到：当客户端只有在路由为/getCookie里可以通过document.cookie获取
    httpOnly: false // true为只有服务端可以访问，false表示服务器和客户端都可以访问：为true时客户端执行document.cookie，拿不到任何值
  })
  let fullName = new Buffer('庄成').toString('base64') // cookie不能设置中文，要转为base64
  ctx.cookies.set('fullName', fullName, {
    maxAge: 60*1000
  })
  ctx.body = '设置cookie'
  await next()
})

// 获取cookie
router.get('/getCookie', async (ctx, next) => {
  let userInfo = ctx.cookies.get('userInfo')
  let fullName = ctx.cookies.get('fullName')
  // let fullName1 = new Buffer(fullName, 'base64').toString()
  // ctx.body = `userInfo: ${userInfo}；fullName: ${fullName1}`
  ctx.body = fullName
})
```

#### session
> session：不同于cookie，是保存在服务器中的
> 当浏览器访问服务器并发送第一次请求时，服务器端会创建一个 session 对象，生成一个类似于 key,value 的键值对
> 然后将 key(cookie)返回到浏览器(客户)端，浏览器下次再访问时，携带 key(cookie)，找到对应的 session(value)。 客户的信息都保存在 session 中

```
// 设置session
npm install koa-session // 安装koa-session
const session = require('koa-session'); // 引入koa-session
 
app.keys = ['some secret hurr']; // cookie的签名
 
 // 配置参数
const CONFIG = {
  maxAge: 30000, // 设置过期时间，当过了30秒后session过期了,获取的就是undefined
  autoCommit: true, // 自动提交到响应头,后面所有接口request headers里都有Cookie属性
  overwrite: true, // 是否允许重写
  httpOnly: true, // 只有服务器端可以获取cookie
  signed: true, // 默认签名
  rolling: false, // 每次访问重新设置过期时间，比如过期时间是30秒，过了20秒后又获取，所以又重新设置了session时间
  renew: true, // 过期时间30秒，快要过期了重新设置了session时间
};

// 启动
app.use(session(CONFIG, app));
router.get('/setSession', (ctx, next) => { // 先访问这个路由
  ctx.session.userInfo = '张三'
  ctx.body = '设置session成功'
  await next()
})
router.get('/getSession', (ctx, next) => { // 然后访问这个路由，在30秒内请求，都不会过期
  ctx.body = ctx.session.userInfo
  await next()
})
```

#### 连接Mongodb
```
const mongoose = require('mongoose')
mongoose.connect(mongodb.db, { useNewUrlParser:true }, (err) => {
  if (err) {
    console.error('Failed to connect to database')
  } else {
    console.log('Connecting database successfully')
  }
})
```