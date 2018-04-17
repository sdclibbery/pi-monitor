drawCandles = (canvas, candles) => {
  var ctx = canvas.getContext('2d')
  const min = candles.reduce((m, c) => Math.min(m, c.low), Infinity)
  const max = candles.reduce((m, c) => Math.max(m, c.high), -Infinity)
  const barW = canvas.width/300
  const toY = (p) => canvas.height - (p-min)*canvas.height/(max-min)
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  candles.map((c, i) => {
    const x = canvas.width-i*barW
    ctx.fillStyle = (c.close >= c.open) ? 'green' : 'red'
    ctx.fillRect(x+barW/2, Math.min(toY(c.low), toY(c.high)), 1, Math.max(Math.abs(toY(c.low)-toY(c.high)), 1))
    ctx.fillRect(x, Math.min(toY(c.open), toY(c.close)), barW, Math.abs(toY(c.open)-toY(c.close)))
  })
  ctx.fillStyle = 'black'
  ctx.font = '20px sans'
  ctx.fillText(min, 0, toY(min))
  ctx.fillText(max, 0, toY(max)+20)
  ctx.fillText(candles[0].time, canvas.width-180, canvas.height)
  ctx.fillText(candles[candles.length-1].time, 60, canvas.height)
}
