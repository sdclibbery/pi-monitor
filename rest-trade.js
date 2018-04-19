const GdaxExchange = require('../tradr/gdax-exchange');

exports.cancel = async (req, res, next) => {
  const exchange = GdaxExchange.createExchange({}, { debug: () => {}, error: console.log, })
  try {
    await exchange.cancelOrder(req.params.id)
    res.redirect(req.query.next || `/trade`)
  } catch (e) {
    res.status(500).send(`GDAX error: ${e}`)
  }
}

exports.limitOrder = async (req, res, next) => {
  const exchange = GdaxExchange.createExchange({}, { debug: () => {}, error: console.log, })
  try {
    await exchange.order(req.params.side, req.body.amountOfBase, req.body.price, req.body.product)
    res.redirect(req.query.next || `/trade`)
  } catch (e) {
    res.status(500).send(`GDAX error: ${e}`)
  }
}
