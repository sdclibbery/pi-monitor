const ngrok = require('ngrok')
const os =  require('os')
const credentials =  require('./ngrok-credentials').key

exports.expose = (name, port) => {
  const host =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
  const tunnelSubdomain = `sdclibbery-${host}-${name}`

  ngrok.connect({
    addr: port,
    subdomain: tunnelSubdomain,
    authtoken: credentials,
    region: 'eu',
  }).then(url => {
    console.log(`${new Date()} ngrok tunnel launched at ${url}`)
  }).catch(err => {
    console.error(`${new Date()} ngrok launch error `, err)
  })

  return () => {
    ngrok.disconnect()
    console.log(`${new Date()} ngrok disconnect`)
  }
}
