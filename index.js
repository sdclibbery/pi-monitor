const express = require('express')
const localtunnel = require('localtunnel')
const os =  require('os')

const port = 8000
const tunnelName =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
const localtunnelSubdomain = `sdclibbery${tunnelName}`
console.log(localtunnelSubdomain)
const app = express()
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
    console.log('localtunnel: ', err || (tunnel && tunnel.url))
  })
})
