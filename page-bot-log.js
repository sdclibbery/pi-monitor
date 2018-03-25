const frame =  require('./frame').apply
const fs = require('fs')

exports.render = (req, res) => {
  res.send(frame(`
    <h1>${req.params.logFile}</h1>
    <pre>${fs.readFileSync(`../tradr/${req.params.logFile}`)}</pre>
  `))
}
