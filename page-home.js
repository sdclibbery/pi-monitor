const os =  require('os')
const frame =  require('./frame').apply

exports.render = (req, res) => {
  res.send(frame(`
    <h1>${os.hostname()} pi monitor </h1>
    <p><a href="system">System Monitor</a></p>
  `))
}
