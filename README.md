# ToDo
x install https://github.com/localtunnel/localtunnel and run from inside THIS app...
 x Use machine hostname for subdomain (with 'sdclibbery' prefix)
x Simple page that gets the pi CPU load, memory stats, heap status, disk space etc
x Authentication
x Extract pages out to their own files
* See logs of running bots
 ! tradr dir not working on pi...
  ? Can we set the cwd for the cron job?

* Can run bot from a page
const { spawn } = require('child_process');
const subprocess = spawn(process.argv[0], ['child_program.js'], {
  detached: true,
  stdio: 'ignore'
});
subprocess.unref();

* Page that lists running bots with status and progress

Need bots to be reentrant - ie able to restart without losing state - for this:
* Active bot list
 * persisted
* Run an active bot if its not running
* UI for adding/removing active bots
