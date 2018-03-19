const frame =  require('./frame').apply
const fs = require('fs')

exports.render = (req, res) => {
  res.send(frame(`
    <h1>Bots</h1>
    <h3>Logs</h3>
    ${logList()}
  `))
}

const logList = () => {
  return fs.readdirSync('../tradr')
    .filter(f => f.endsWith('.log'))
    .reduce((u, f) => `${u}\n<p><a href="bot/log/${f}">${f}</a></p>`, '')
}

exports.renderLog = (req, res) => {
  res.send(frame(`
    <h1>${req.params.logFile}</h1>
    <pre>${fs.readFileSync(`../tradr/${req.params.logFile}`)}</pre>
  `))
}
