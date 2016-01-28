import path from 'path'
import fs from 'fs'
import http2 from 'http2'

// import { System } from 'es6-module-loader'
// System.transpiler = 'babel'
// System.trace = true
// System.execute = false
// console.log(Loader, System)
// System
//   .import(path.join(__dirname, 'foo.js'))
//   .import('./foo.js')
//   .then(function () {
//     console.log('done loading foo.js')
//     console.log(System.loads['./foo.js'])
//   })

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

const server = http2.createServer(options, (request, response) => {
  console.log('got incoming', request.url)
  if (response.push) {
    console.log('supports push')
    var push = response.push('/stuff.txt')
    var stream = fs.createReadStream(path.join(__dirname, '/stuff.txt'))
    push.writeHead(200)
    console.log('pushing stuff.txt')
    stream.pipe(push)
  } else {
    console.log('no push support')
  }
  response.end('Hello world!')
  // setTimeout(() => response.end('Hello world!'), 5000)
})
server.listen(8080)

console.log('listening')
