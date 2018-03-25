const frame =  require('./frame').apply
const fs = require('fs')
const util = require('util')

exports.render = async (req, res, next) => {
  const log = await util.promisify(fs.readFile)(`../tradr/${req.params.logFile}`)
  res.send(frame(`
    <h1>${req.params.logFile}</h1>
    <pre>${format(log)}</pre>
  `))
}

const format = (log) => {
  return log
}
