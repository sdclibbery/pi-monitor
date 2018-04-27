const localtunnel = require('localtunnel')
const os =  require('os')

exports.expose = (name, port) => {
  const host =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
  const localtunnelSubdomain = `sdclibbery-${host}-${name}`
  const launch = () => {
    console.log(`${new Date()} Launching ${name} tunnel`)
    localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
      if (err) {
        console.log(`${new Date()} ${name} tunnel launch failed; retrying in 30s: `, err)
        setTimeout(launch, 30000)
      } else if (tunnel) {
        console.log(`${new Date()} ${name} tunnel at: `, tunnel.url)
        tunnel.on('error', (e) => {
          console.error(`${new Date()} ${name} tunnel error; closing to relaunch: `, e)
          tunnel.close()
        })
        tunnel.on('close', () => {
          console.error(`${new Date()} ${name} tunnel closed; relaunching in 30s`)
          setTimeout(launch, 30000)
        })
        if (!tunnel.url.includes(localtunnelSubdomain)) {
          console.error(`${new Date()} ${name} tunnel subdomain wrong; closing to relaunch`)
          tunnel.close()
        }
      }
    })
  }
  launch()
}
