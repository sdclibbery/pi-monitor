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
* Status page
 * Rename page to trade; split up and tidy
 * Use js instead of form submission for cancel/make order
 * Have 'are you sure' alert on cancelling orders
 * Why do you have to stop+refresh after submitting an order?
 * Error reporting for failed orders
 * ? Leave price blank when ordering to pick next closest price automatically
!? Setup a shutdown button: https://github.com/dhunink/RaspberryPiSafeShutdown/blob/master/safeShudown.py
* Page to show live candles (getProductHistoricRates - call from client)
* ? Need something (restartable) in monitor that can track candles and trigger bots automatically...
* Show TA indicators: RSI, NVT
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
