const express = require('express')
const os =  require('os')
const localtunnel = require('localtunnel')
const basicAuth = require('express-basic-auth')
const bcrypt = require('bcrypt')
const foreverTradr = require('./forever-tradr')

const port = 8000
const tunnelName =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
const localtunnelSubdomain = `sdclibbery-${tunnelName}-monitor`
console.log(localtunnelSubdomain)
let localtunnelInstance

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
app.post('/shutdown/app', (req, res) => {
  process.exit()
})
app.post('/shutdown/pi', (req, res) => {
  require('child_process').exec("/sbin/shutdown -h now", () => {
    res.send("Pi shutdown: done")
  })
})

const expressServer = app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
    localtunnelInstance = tunnel
    console.log('localtunnel: ', err || (tunnel && tunnel.url))
  })
})
