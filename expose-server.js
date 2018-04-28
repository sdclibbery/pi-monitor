const localtunnel = require('localtunnel')
const os =  require('os')

exports.expose = (name, port) => {
  const host =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
  const localtunnelSubdomain = `sdclibbery-${host}-${name}`
  let closing = false
  let launching = true
  let tunnelToClose = null
  const launch = () => {
    if (!launching) { return }
    launching = false
    if (closing) { return }
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
          if (!launching) {
            console.error(`${new Date()} ${name} tunnel closed; relaunching in 60s`)
            launching = true
            setTimeout(() => {
              tunnelToClose = null
              launch()
            }, 60000)
          }
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
