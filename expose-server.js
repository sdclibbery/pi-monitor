const localtunnel = require('localtunnel')
const os =  require('os')

exports.expose = (name, port) => {
  const host =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
  const localtunnelSubdomain = `sdclibbery-${host}-${name}`
  const launch = () => {
    console.log(`Launching ${name} tunnel`)
    localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
      if (err) {
        console.log(`${name} tunnel launch failed: `, err)
      }
      if (tunnel) {
        console.log(`${name} tunnel at: `, tunnel.url)
        tunnel.on('error', (e) => {
          console.error(`${name} tunnel error: `, e)
        })
        tunnel.on('close', () => {
          console.error(`${name} tunnel closed; relaunching`)
          launch()
        })
      }
    })
  }
  launch()
}
