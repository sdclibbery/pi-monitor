
# ToDo
x Launch tradr server and restart if necessary
x Logging for tradr server
x Proxy trading pages to tradr server
 x Separate localtunnel for tradr if possible
* Sort out controls
 * Relaunch tradr node server
 * Shutdown monitor for Relaunch
 * Shutdown Pi
* Graceful shutdown...
 https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
 * Trap SIGs
 * Close localtunnels, forever tradr, node server
