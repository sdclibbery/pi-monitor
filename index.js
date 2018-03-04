const express = require('express')
const localtunnel = require('localtunnel')

const port = 8000
const app = express()
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: 'sdclibberytradrpi' }, (err, tunnel) => {
    console.log(err)
    console.log(tunnel.url)
  })
})
