const frame =  require('./frame').apply
const os =  require('os')
const fetchData =  require('../tradr/accounts-and-orders').fetch

exports.render = async (req, res, next) => {
  const data = await fetchData()
  res.send(frame(`
    <h1>${os.hostname()} GDAX status</h1>
    <h3>Accounts</h3>
    ${formatAccounts(data.accounts)}
    <p>Equivalent totals: ${dp(data.totalValueInEur, 2)} EUR, ${dp(data.totalValueInBtc, 4)} BTC</p>
    <h3>Orders</h3>
    ${formatOrders(data.orders)}
  `))
}

const dp = (x, dp) => Number.parseFloat(x).toFixed(dp)
const dp2 = (x) => dp(x, 4)
const dp4 = (x) => dp(x, 4)
const td = (str) => `<td>${str}</td>`

const formatAccounts = (accounts) => {
  const rows = accounts
    .map(a => `<tr>${td(dp4(a.balance) + a.currency)} ${td(dp4(a.available) + a.currency)} ${td(dp2(a.valueInEur) + ' EUR')} </tr>`)
    .join('\n')
  return '<table><tr><th>Balance</th><th>Available</th><th>Value</th></tr>\n'+rows+'</table>'
}

const formatOrders = (orders) => {
  const rows = orders
    .map(o => {
      const baseCurrency = o.product.split('-')[0]
      const quoteCurrency = o.product.split('-')[1]
      const stopReport = o.stop ? `stop ${o.stop} at ${dp2(o.stopPrice)} ${quoteCurrency}: ` : ''
      return `<tr><td>${stopReport}${o.type} ${o.side} ${dp4(o.amount)} ${baseCurrency} at ${dp2(o.price)} ${quoteCurrency}</td><td>created at ${o.created}</td></tr>`
    })
    .join('\n')
    return '<table>'+rows+'</table>'
}
