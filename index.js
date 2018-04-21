const express = require('express')
const os =  require('os')
const localtunnel = require('localtunnel')
const basicAuth = require('express-basic-auth')
const bcrypt = require('bcrypt')

const port = 8000
const tunnelName =  os.hostname().toLowerCase().replace(/[^a-z0-9]/g, '')
const localtunnelSubdomain = `sdclibbery-${tunnelName}`
console.log(localtunnelSubdomain)
const app = express()

app.use(basicAuth({
    authorizer: (username, password) => {
      return username == 'steve' && bcrypt.compareSync(password, '$2a$10$SqywWBhDP76FSYQN/cqcw.aGdYKByNKPbI.XRsdbu.crXb7kuXhJi')
    },
    challenge: true,
    realm: '7ygTF9DFgTh',
}))
app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});
app.use((req, res, next) => {
  console.log(new Date(), req.url, req.method)
  next();
});
app.use(express.urlencoded({extended:false}));
app.use(express.static('client'))

app.get('/', require('./page-home').render)
app.get('/system', require('./page-system-monitor').render)
app.get('/trade', require('./page-trade').render)
app.get('/trade/:product', require('./page-trade-product').render)
app.get('/account/:product', require('./page-account-product').render)
app.get('/orders', require('./page-orders').render)
app.get('/orders/:product', require('./page-orders-product').render)
app.post('/trade/cancel/:id', require('./rest-trade').cancel)
app.post('/trade/limit/buysell', require('./rest-trade').buySellLimitOrder)
app.post('/trade/sellThenBuy', require('./rest-trade').sellThenBuy)
app.post('/trade/buyThenSell', require('./rest-trade').buyThenSell)
app.post('/trade/limit/:side', require('./rest-trade').limitOrder)
app.get('/bot', require('./page-bot').render)
app.post('/bot/start/:bot', require('./page-bot').start)
app.post('/bot/stop/:bot', require('./page-bot').stop)
app.get('/bot/log/:logFile', require('./page-bot-log').render)

app.listen(port, () => {
  console.log('pi-monitor listening on port '+port)
  localtunnel(port, { subdomain: localtunnelSubdomain }, (err, tunnel) => {
    console.log('localtunnel: ', err || (tunnel && tunnel.url))
    if (!(tunnel ? tunnel.url : '').includes(localtunnelSubdomain)) {
      localtunnel(port, { subdomain: localtunnelSubdomain+'1' }, (err, tunnel) => {
        console.log('localtunnel: ', err || (tunnel && tunnel.url))
        if (!(tunnel ? tunnel.url : '').includes(localtunnelSubdomain)) {
          localtunnel(port, { subdomain: localtunnelSubdomain+'2' }, (err, tunnel) => {
            console.log('localtunnel: ', err || (tunnel && tunnel.url))
            if (!(tunnel ? tunnel.url : '').includes(localtunnelSubdomain)) {
              console.log('Bad localtunnel subdomain, quitting')
              process.exit()
            }
          })
        }
      })
    }
  })
})
