const frame =  require('./frame').apply

exports.render = async (req, res, next) => {
  const product = req.params.product
  const baseCurrency = product.split('-')[0]
  const quoteCurrency = product.split('-')[1]

  res.send(frame(`
    <h1>Trade ${product}</h1>
    <h3>Candles</h3>
    <h3>Account</h3>
    <h3>Orders</h3>
    <h3>Trade</h3>
    <h3>Depth</h3>
  `))
}
