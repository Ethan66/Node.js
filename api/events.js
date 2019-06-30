let fs = require('fs')
let events = require('events')
let EventEmitter = new events.EventEmitter() // 实例化事件对象
// 广播和接收广播

function getMime() {
  fs.readFile('api/input.txt', function(err, data) {
    // 广播
    EventEmitter.emit('data', data.toString())
  })
}

getMime()

// 监听data的广播
EventEmitter.on('data', function(mime){
  console.log('接收到了广播事件')
  console.log(mime)
})