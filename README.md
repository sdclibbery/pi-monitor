
# ToDo
* Run tradr server and restart if necessary, also logging
* Proxy tradin pages to tradr server
* Trading pages
 x Route for page with product
 x List account info into iframe
 x List orders into an iframe
 x Better default values on ETH page
 x Trading options
  x Buy sell above/below for when price is fluctuating
  x Buy then sell button for price rise. Runs a Bot. Tries to buy at up to the specified sell price, then places sell order.
     Has good tracking reason etc. Launch from button on trade product page
 * Candle granularities
  x Zoom in and allow swiping left/right if possible
  * Fetch and process candles client-side
  * Buttons to switch granularities
 * Tradr: order tracking in sqlite
 * order page will need pagination/sorting/filtering
 * Show price and candles on a log plot
  x Basic drawing
  x Make sure its not waiting for the iframes before rendering!
  * refactor and clean
  * plot proper x axis using time (dont assume it from the index) - also think we're losing the most recent candle at the moment!!
  * log plot
  * plot scale lines etc
 * Price and candles auto update
 * EMAs
 * Show live depth chart
* Mechanism for rationalising old orders
 * Eg find old orders that can cancel with each other given their 'createdAt' prices?
* ? Need something (restartable) in monitor that can track candles and trigger bots automatically...
* localtunnel: Always start from correct, but retry with additions if it fails, this way any adjustment should be temporary
* Show TA indicators: RSI, NVT
!? Setup a shutdown button: https://github.com/dhunink/RaspberryPiSafeShutdown/blob/master/safeShudown.py
 ? Or just a button on the webpage to shutdown...
* Can clear logs
* Bot log pages live update
* Can set arguments when starting a bot
 ! Fix forms...
* Page that lists running bots with status and progress
* Handle missing log files more gracefully

Need bots to be restartable - ie able to restart without losing state - for this:
* Active bot list
 * persisted
* Run an active bot if its not running
* UI for adding/removing active bots
