const frame =  require('./frame').apply
const GdaxExchange = require('../tradr/gdax-exchange');

exports.render = async (req, res, next) => {
  const product = req.params.product
  const baseCurrency = product.split('-')[0]
  const quoteCurrency = product.split('-')[1]
  const exchange = GdaxExchange.createExchange({product: product}, { debug: () => {}, error: console.log, })
  const price = await exchange.latestPrice()
  const candles = await exchange.candles({})

  res.send(frame(`
    <h1>Trade ${product}</h1>
    <h3>Price/Candles</h3>
    <canvas id="candles" width="1800" height="600" style="width:900px; height:300px;"></canvas>
    <p><span id="price">${price}</span> ${quoteCurrency}</p>
    <h3>Account</h3>
    <iframe src="/account/${product}" style="width: 100%; height: 80px;"></iframe>
    <h3>Trade</h3>
    <h3>Orders</h3>
    <iframe src="/orders/${product}" style="width: 100%; height: 160px;"></iframe>
    <h3>Depth</h3>
    <script src="/draw-candles.js"></script>
    <script>
      var candles = ${JSON.stringify(candles)};
      drawCandles(document.getElementById('candles'), candles);
    </script>
  `))
}
