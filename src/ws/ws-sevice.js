const os = require('os')
const express = require('express')
const expressWs = require('express-ws')
// const host = getLocalIP()
const host = 'localhost'
const port = 8888
const router = express.Router()
const app = express()
expressWs(app)


function getLocalIP() {
  const network = os.networkInterfaces()
  for (const key in network) {
    let net = network[key]
    for (let i = 0; i < net.length; i++) {
      let face = net[i]
      if (
        face.family === 'IPv4'
        && face.address !== '127.0.0.1'
        && !face.internal
      ) {
        return face.address;
      }
    }
  }
  return 'localhost'
}

let wsClients = {}

let widCount = 0
let count = 0


const uniqueWsId = () => {
  const maxOrder = 9999999
  const now = Date.now()
  const random = Math.random().toString().slice(-6)
  const order = (++widCount > maxOrder ? 0 : widCount).toString().padStart(maxOrder.toString().length, '0')
  return ['WS', now, random, order].join('')
}

const wsPostMessage = (id, data) => {
  const ws = wsClients[id]
  ws.send(JSON.stringify({
    status: 1,
    message: 'success',
    data
  }))
}

setTimeout(() => {
  count = 0
  Object.keys(wsClients).forEach(key => {
    wsPostMessage(key, count)
  })
}, 1000 * 10)

router.ws('/ws/:wid', (ws, req) => {
  const wid = req.params.wid
  if (!wsClients[wid]) {
    wsClients[wid] = ws
  }
  console.log('wid: ', wid)
  ws.on('close', () => {
    if (wsClients[wid]) {
      delete wsClients[wid]
    }
  })
  wsPostMessage(wid, 'ok')
})

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "wsid");
  next()
})

router.get('/wsid', (req, res) => {
  res.json({
    code: 1,
    message: 'success',
    data: uniqueWsId()
  })
})

router.post('/count/add', (req, res) => {
  const wsid = req.headers.wsid
  count++
  wsPostMessage(wsid, count)
  res.json({
    code: 1,
    message: 'success',
    data: 'ok'
  })
})

router.post('/count/jian', (req, res) => {
  const wsid = req.headers.wsid
  count = --count < 0 ? 0 : count
  wsPostMessage(wsid, count)
  res.json({
    code: 1,
    message: 'success',
    data: 'ok'
  })
})

app.use('/api', router)
app.listen(port, host, () => {
  console.log(`Server listen on http://${host}:${port}`)
})
