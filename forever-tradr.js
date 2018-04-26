const forever = require('forever-monitor').Monitor

let foreverTradr = new forever('../tradr/index.js', {
  silent: true,
  cwd: '../tradr',
  outFile: '../tradr/tradr.log',
  errFile: '../tradr/tradr.log',
})
foreverTradr.on('watch:start', () => {
    console.log(`${new Date()} Forever starting tradr`);
})
foreverTradr.on('watch:restart', (info) => {
    console.error(`${new Date()} Forever restarting tradr because ${info.file} changed`);
})
foreverTradr.on('restart', () => {
    console.error(`${new Date()} Forever restarting tradr for ${foreverTradr.times} time`);
})
foreverTradr.on('exit:code', (code) => {
    console.error(`${new Date()} Forever detected tradr exited with code ${code}`);
})
foreverTradr.start()

exports.restart = () => foreverTradr.restart()
