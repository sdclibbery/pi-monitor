const frame =  require('./frame').apply
const GdaxExchange = require('../tradr/gdax-exchange');

exports.render = async (req, res, next) => {
  const product = req.params.product
  const baseCurrency = product.split('-')[0]
  const quoteCurrency = product.split('-')[1]
  const exchange = GdaxExchange.createExchange({product: product}, { debug: () => {}, error: console.log, })
  const orders = await exchange.orders()
  const formattedOrders = orders
    .filter(o => o.product == product)
    .map(o => {
      const stopReport = o.stop ? `stop ${o.stop} at ${dp2(o.stopPrice)} ${quoteCurrency}: ` : ''
      return `${stopReport}${o.type} ${o.side} ${exchange.formatBase(o.amount)} at ${exchange.formatQuote(o.price)}  created at ${o.created}<br/>`
    })
    .join('\n')

  res.send(frame(`
    ${formattedOrders}
    <button onclick="document.location.reload()">&#x1f5d8;</button><br/>
  `))
}
