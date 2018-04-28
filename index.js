const express = require('express')
const basicAuth = require('express-basic-auth')
const bcrypt = require('bcrypt')
const foreverTradr = require('./forever-tradr')
const expose = require('./expose-server').expose

const monitorPort = 8000
const tradrPort = 8001

const app = express()
app.use(basicAuth({
    authorizer: (username, password) => {
      return username == 'steve' && bcrypt.compareSync(password, '$2a$10$SqywWBhDP76FSYQN/cqcw.aGdYKByNKPbI.XRsdbu.crXb7kuXhJi')
    },
    challenge: true,
    realm: '7ygTF9DFgTh',
}))
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
app.use((req, res, next) => {
  console.log(new Date(), req.url, req.method)
  next();
});
app.use(express.urlencoded({extended:false}))
app.use(express.static('client'))

app.get('/', require('./page-home').render)
app.get('/system', require('./page-system-monitor').render)
app.post('/shutdown/monitor', (req, res) => {
  process.exit()
  res.send("Monitor shutdown: done")
})
app.post('/shutdown/pi', (req, res) => {
  require('child_process').exec("/sbin/shutdown -h now", () => {
    res.send("Pi shutdown: done")
  })
})
app.post('/restart/tradr', (req, res) => {
  foreverTradr.restart()
  res.send("Tradr restart: done")
})

const server = app.listen(monitorPort, () => {
  console.log(`${new Date()} pi-monitor listening on port ${monitorPort}`)
})

//const closeMonitorTunnel = expose('monitor', monitorPort)
const closeTradrTunnel = expose('tradr', tradrPort)

require('node-cleanup')((exitCode, signal) => {
//  closeMonitorTunnel()
  closeTradrTunnel()
  server.close()
  foreverTradr.stop()
  console.log(`${new Date()} pi-monitor closing with code ${exitCode} because ${signal}`)
})
