const frame =  require('./frame').apply

exports.render = async (req, res, next) => {
  const orders = await require('../tradr/order-tracker').getOrders()
  res.send(frame(`
    <h1>Orders</h1>
    <table>
    ${formatOrders(orders)}
    </table>
  `))
}

const formatOrders = (orders) => {
  return orders
    .map(o => {
      return `<tr>
      <td>${o.exchange} ${o.product}</td>
      <td>${o.status} ${o.side}</td>
      <td>${o.amount} ${o.orderPrice} ${o.product}</td>
      <td>created at ${o.created} at ${o.priceAtCreation}</td>
      <td>${o.creator} for ${o.reason}</td>
      </tr>`
    }).join('\n')
}
