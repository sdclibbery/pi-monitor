const GdaxExchange = require('../tradr/gdax-exchange');

exports.cancel = async (req, res, next) => {
  const exchange = GdaxExchange.createExchange({}, { debug: () => {}, error: console.log, })
  return await exchange.cancelOrder(req.params.id)
  res.redirect(`/status`)
}

exports.limitOrder = async (req, res, next) => {
  const exchange = GdaxExchange.createExchange({}, { debug: () => {}, error: console.log, })
  await exchange.order(req.params.side, req.body.amountOfBase, req.body.price, req.body.product)
  res.redirect(`/status`)
}
