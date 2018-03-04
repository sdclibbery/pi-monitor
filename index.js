const express = require('express')
const localtunnel = require('localtunnel')
const os =  require('os')

const port = 8000
const tunnelName =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
const localtunnelSubdomain = `sdclibbery${tunnelName}`
console.log(localtunnelSubdomain)
const app = express()

app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
    console.log('localtunnel: ', err || (tunnel && tunnel.url))
  })
})

app.get('/', (req, res) => {
  res.send(`
    <h1>${tunnelName} pi monitor </h1>
    <p>System Memory: ${os.freemem()/1024/1024}Mb free out of ${os.totalmem()/1024/1024}Mb</p>
    <p>Heap Memory: ${JSON.stringify(process.memoryUsage())}</p>
    <p>System CPU load: ${os.loadavg()}</p>
    <p>Process CPU: ${JSON.stringify(process.cpuUsage())}</p>
    <p>System Uptime: ${os.uptime()}s</p>
    <p>Process Uptime: ${process.uptime()}s</p>
  `)
})
