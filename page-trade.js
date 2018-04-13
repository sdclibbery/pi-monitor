const frame =  require('./frame').apply
const os =  require('os')
const GdaxExchange = require('../tradr/gdax-exchange');

exports.render = async (req, res, next) => {
  const data = await fetchData()
  res.send(frame(`
    <h1>${os.hostname()} GDAX status</h1>
    <h3>Accounts</h3>
    ${formatAccounts(data.accounts)}
    <p>Equivalent totals: ${dp(data.totalValueInEur, 2)} EUR, ${dp(data.totalValueInBtc, 4)} BTC</p>
    <h3>Orders</h3>
    ${formatOrders(data.orders)}
    <h3>Trade</h3>
    <h4>Limit Sell</h4>
      <form style="display:inline" action="/trade/limit/sell" method="post">
        <p>
          <input type="text" name="product" value="BTC-EUR">
          <input type="text" name="amountOfBase" value="0.01">
        </p>
        <p>
          <input type="text" name="price" value="${exchange.roundQuote(data.btcEurPrice + 0.01)}">
          <input type="submit" value="Place order">
        </p>
      </form>
    <h4>Limit Buy</h4>
      <form style="display:inline" action="/trade/limit/buy" method="post">
        <p>
          <input type="text" name="product" value="BTC-EUR">
          <input type="text" name="amountOfBase" value="0.01">
        </p>
        <p>
          <input type="text" name="price" value="${exchange.roundQuote(data.btcEurPrice - 0.01)}">
          <input type="submit" value="Place order">
        </p>
      </form>
  `))
}
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
      return `<tr>
                <td>${stopReport}${o.type} ${o.side} ${dp4(o.amount)} ${baseCurrency} at ${dp2(o.price)} ${quoteCurrency}</td>
                <td>created at ${o.created}</td>
                <td><form action="/trade/cancel/${o.id}" method="post"><input type="submit" value="&#x1f5d1;"></td>
              </tr>`
    })
    .join('\n')
    return '<table>'+rows+'</table>'
}

const exchange = GdaxExchange.createExchange({}, {
  debug: () => {},
  error: console.log,
})

const fetchData = async () => {
  const result = {}
  const accounts = await exchange.accounts()
  const accountsWithValuesInEur = await decorateWithValue(accounts)
  result.accounts = accountsWithValuesInEur

  result.totalValueInEur = accountsWithValuesInEur.reduce((s, a) => s + a.valueInEur, 0)
  result.btcEurPrice = await exchange.latestPriceOf('BTC-EUR')
  result.totalValueInBtc = result.totalValueInEur / result.btcEurPrice

  result.orders = await exchange.orders()
  return result
}

const decorateWithValue = async (accounts) => {
  return (await Promise.all(
    accounts.map(async (account) => {
      const price = await getPriceAgainstEur(account.currency)
      account.valueInEur = account.balance * price
      return account
    })
  ))
}

const getPriceAgainstEur = async (currency) => {
  if (currency == 'GBP') { return await 1.14 }
  if (currency == 'EUR') { return await 1 }
  return await exchange.latestPriceOf(`${currency}-EUR`)
}

const dp = (x, dp) => Number.parseFloat(x).toFixed(dp)
const dp2 = (x) => dp(x, 4)
const dp4 = (x) => dp(x, 4)
const td = (str) => `<td>${str}</td>`

exports.cancel = async (req, res, next) => {
  await exchange.cancelOrder(req.params.id)
  res.redirect(`/status`)
}

exports.limitOrder = async (req, res, next) => {
  await exchange.order(req.params.side, req.body.amountOfBase, req.body.price, req.body.product)
  res.redirect(`/status`)
}