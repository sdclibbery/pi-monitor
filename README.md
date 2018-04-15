# ToDo
x install https://github.com/localtunnel/localtunnel and run from inside THIS app...
 x Use machine hostname for subdomain (with 'sdclibbery' prefix)
x Simple page that gets the pi CPU load, memory stats, heap status, disk space etc
x Authentication
x Extract pages out to their own files
x See logs of bots
x Can start a bot
x Can stop a bot
x Format log blocks based on level
x Dont cache any pages
x Bot log pages show latest entries on opening
x Can switch which log levels are hidden on log page
x Local tunnel subdomains not working? Turned out they had to be shorter suddenly
x Trade page
 x Rename page to trade; split up and tidy
 - Use js instead of form submission for trade actions; rest endpoints return json including errors
  :-( would need to change from basic auth to support REST :-/
 x Have 'are you sure' alert on cancelling orders
 x ?Why doesn't the response from creating an order work properly?
  x Because exhange.order is waiting for the fill
 x Error reporting for failed GDAX requests - pass msg back via redirect??
* Trading pages
 x Route for page with product
 x List account info into iframe
 * List orders into an iframe
  ! Formatting
 * Show live price and candles on a log plot
 * Trading options
  * Buy/sell with Exit for when price is rising/falling
  * Buy sell above/below for when price is fluctuating
 * EMAs
 * Show live depth chart
* ? Need something (restartable) in monitor that can track candles and trigger bots automatically...
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
