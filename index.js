import fs from 'fs'
import http2 from 'http2'

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}

const server = http2.createServer(options, (request, response) => {
  console.log('got incoming')
  response.end('Hello world!')
})
server.listen(8080)

console.log('listening')
