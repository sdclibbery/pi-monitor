const express = require('express')
const os =  require('os')
const localtunnel = require('localtunnel')
const basicAuth = require('express-basic-auth')
const bcrypt = require('bcrypt')

const port = 8000
const tunnelName =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
const localtunnelSubdomain = `sdclibbery${tunnelName}`
console.log(localtunnelSubdomain)
const app = express()

app.use(basicAuth({
    authorizer: (username, password) => {
      return username == 'steve' && bcrypt.compareSync(password, '$2a$10$SqywWBhDP76FSYQN/cqcw.aGdYKByNKPbI.XRsdbu.crXb7kuXhJi')
    },
    challenge: true,
    realm: '7ygTF9DFgTh',
}))

app.get('/', require('./page-home').render)
app.get('/system', require('./page-system-monitor').render)
app.get('/bot', require('./page-bot').render)
app.get('/bot/log/:logFile', require('./page-bot').renderLog)
app.post('/bot/start/:bot', require('./page-bot').start)
app.post('/bot/stop/:bot', require('./page-bot').stop)

app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
    console.log('localtunnel: ', err || (tunnel && tunnel.url))
  })
})
