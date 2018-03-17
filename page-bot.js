const frame =  require('./frame').apply

exports.render = (req, res) => {
  res.send(frame(`
    <h1>Bots</h1>
  `))
}
