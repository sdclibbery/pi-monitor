const os =  require('os')

exports.apply = (content) => `
<html>
  <head>
    <title>${os.hostname()} pi monitor </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      body{font-family:helvetica,sans-serif;}
      a{margin:3px;padding:3px;border:1px solid #aaa;background-color:#eee;color:#111;border-radius:3px;text-decoration:none;} a:hover{background-color:#ddd;}
    </style>
  </head>
  <body>
    ${content}
  </body>
</html>
`
