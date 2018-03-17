const express = require('express')
const localtunnel = require('localtunnel')
const os =  require('os')
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

app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
    console.log('localtunnel: ', err || (tunnel && tunnel.url))
  })
})

app.get('/bots', (req, res) => {
  res.send(`placeholder`)
})

app.get('/', (req, res) => {
  res.send(`
    <h1>${tunnelName} pi monitor </h1>
    <p>System Memory: ${os.freemem()/1024/1024}Mb free out of ${os.totalmem()/1024/1024}Mb (${(100*os.freemem()/os.totalmem()).toFixed(1)}%)</p>
    <p>Heap Memory: ${JSON.stringify(process.memoryUsage())}</p>
    <p>System CPU load: ${os.loadavg()}</p>
    <p>Process CPU: ${JSON.stringify(process.cpuUsage())}</p>
    <p>System Uptime: ${secondsToHms(os.uptime())}</p>
    <p>Process Uptime: ${secondsToHms(process.uptime())}</p>
  `)
})

const secondsToHms = (seconds) => {
  const days = Math.floor(seconds/24/60/60)
  var hhmmss = new Date(null);
  hhmmss.setSeconds(seconds);
  return `${days}d ${hhmmss.toISOString().substr(11, 8)}`
}
