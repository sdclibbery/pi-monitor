const frame =  require('./frame').apply
const fs = require('fs')
const util = require('util')

exports.render = async (req, res, next) => {
  const log = (await util.promisify(fs.readFile)(`../tradr/${req.params.logFile}`)).toString()
  res.send(frame(`
    <style>
      pre { background-color:#fcfcfc }
      pre.debug { display:none; color:#888888; }
      pre.info { color:#00529B; }
      pre.warn { color:#9F6000; }
      pre.error { color:#D8000C; }
    </style>
    <script>
      window.onload = function () { window.scrollTo(0, document.body.scrollHeight); };
    </script>
    <h1>${req.params.logFile}</h1>
    <div id="log-content">
      ${format(log)}
    </div>
  `))
}

const format = (log) => {
  const lines = log.split(/\r?\n/)
  let level = ''
  let block = ''
  let formatted = ''
  const addBlock = (block, level) => { formatted = `${formatted}${preBlock(block, level)}\n` }
  for (const line of lines) {
    if (levelOfLine(line)) {
      if (level) { addBlock(block, level) }
      level = levelOfLine(line)
      block = ''
    }
    block = `${block}${line}\n`
  }
  addBlock(block, level)
  return formatted
}

const levelOfLine = (line) => {
  if (line.startsWith('debug')) { return 'debug' }
  if (line.startsWith('info')) { return 'info' }
  if (line.startsWith('warn')) { return 'warn' }
  if (line.startsWith('error')) { return 'error' }
}

const preBlock = (block, level) => `<pre class="${level}">${block}</pre>`

assert = (actual, expected) => { if (expected !== actual) { throw `test failed!\nexpected:\n${expected}\nactual:\n${actual}` } }
assert(format("error blah"), '<pre class="error">error blah\n</pre>\n')
assert(format("info blah"), '<pre class="info">info blah\n</pre>\n')
assert(format("info blah\nrhubarb"), '<pre class="info">info blah\nrhubarb\n</pre>\n')
assert(format("debug blah\nwarn rhubarb"), '<pre class="debug">debug blah\n</pre>\n<pre class="warn">warn rhubarb\n</pre>\n')
assert(format("info blah\nrhubarb\nerror foobar"), '<pre class="info">info blah\nrhubarb\n</pre>\n<pre class="error">error foobar\n</pre>\n')
