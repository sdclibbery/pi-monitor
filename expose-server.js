const localtunnel = require('localtunnel')
const os =  require('os')

exports.expose = (name, port) => {
  const host =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
  const localtunnelSubdomain = `sdclibbery-${host}-${name}`
  let closing = false
  let tunnelToClose = null
  const launch = () => {
    if (closing) { return }
    if (tunnelToClose) {
      console.log(`${new Date()} Not launching ${name} tunnel as theres already a tunnel to close`)
      tunnelToClose.close()
      return
    }
    console.log(`${new Date()} Launching ${name} tunnel`)
    localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
      if (err) {
        console.log(`${new Date()} ${name} tunnel launch failed`, err)
        if (tunnel) { tunnel.close() }
        if (tunnelToClose) { tunnelToClose.close() }
      } else if (tunnel) {
        console.log(`${new Date()} ${name} tunnel at: `, tunnel.url)
        tunnelToClose = tunnel
        tunnel.on('error', (e) => {
          console.error(`${new Date()} ${name} tunnel error; closing to relaunch: `, e)
          tunnel.close()
        })
        tunnel.on('close', () => {
          console.error(`${new Date()} ${name} tunnel closed; relaunching in 30s`)
          setTimeout(() => {
            tunnelToClose = null
            launch()
          }, 30000)
        })
        if (!tunnel.url.includes(localtunnelSubdomain)) {
          console.error(`${new Date()} ${name} tunnel subdomain wrong; closing to relaunch`)
          tunnel.close()
        }
      }
    })
  }
  launch()
  return () => {
    closing = true
    if (tunnelToClose) { tunnelToClose.close() }
  }
}
